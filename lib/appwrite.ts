import useAuthStore from '@/store/auth.store';
import { CreateUserParams, GetMenuParams, SignInParams } from '@/type';
import { Alert } from 'react-native';
import {Account, Avatars, Client, Storage, ID, Query, TablesDB} from 'react-native-appwrite'
export const appwriteConfig = {
    endpoint : process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    platform : "com.jsm.foodordering",
    projectId : process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId : '691d6119001c3d03f1f9',
    bucketId : '6923ea7b0006e0dceda4',
    userCollectionId : 'user',
    categoriesCollectionId : 'categories',
    menuCollectionId : 'menu',
    customizationCollectionId : 'afeftwt43qt3yg56u',
    menuCustomizationCollectionId : 'menu_customization_wfrw3qtq34gargtw',
}

export const client = new Client();
client.setEndpoint(appwriteConfig.endpoint!)
      .setPlatform(appwriteConfig.platform)
      .setProject(appwriteConfig.projectId!)

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);
const avatar = new Avatars(client);

export const createUser = async({email,name,password} : CreateUserParams)=>{
    try {
        const newAccount = await account.create({userId : ID.unique(),email,password,name});
        const avatarUrl = avatar.getImageURL(name);
        if(!newAccount) throw Error;

        await signIn({email,password});
        return await tablesDB.createRow({
            databaseId : appwriteConfig.databaseId,
            tableId : appwriteConfig.userCollectionId,
            rowId : ID.unique(),
            data : {
                accountId : newAccount.$id,
                name,
                email,
                avatar : avatarUrl
            }
        })
    } catch (error:any) {
        console.log(error.message);
        throw new Error(error as string)
    }
}

export const signIn = async ({email,password}:SignInParams)=>{
    try {
        
        const session = await account.createEmailPasswordSession({email,password});
        console.log("Sign in session :: signInAccount",session);
        return session;
    } catch (error:any) {
        console.log("Sign in session exception :: signInAccount",error.message);
        Alert.alert("Error",error.message);
        throw new Error(error as string)
    }
}


export const getCurrentUser = async()=>{
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await tablesDB.listRows({
            databaseId : appwriteConfig.databaseId,
            tableId : appwriteConfig.userCollectionId,
            queries : [Query.equal("accountId",currentAccount.$id)]
        })

        if(!currentUser) throw Error;
        return currentUser.rows[0];
    } catch (error : any) {
        console.log(error.message);
        throw new Error(error as string)
    }
}

export async function logout(){
    try {
        const result = await account.deleteSession({sessionId : 'current'});
        console.log("delete session :: logoutAccount",result);
        return result;
    } catch (error:any) {
        console.log("logout :: logoutAccount",error);
        Alert.alert("Error",error.message);
        throw new Error(error as string);
    }
}

export const getMenu = async ({category,query,limit} : GetMenuParams) =>{
    try {
        const queries : string[] = [];
        
        if(category) queries.push(Query.equal("categories",category));
        if(query) queries.push(Query.search("name",query));

        const menus = await tablesDB.listRows({
            databaseId : appwriteConfig.databaseId,
            tableId : appwriteConfig.menuCollectionId,
            queries : queries
        })
        return menus.rows;
    } catch (error:any) {
        Alert.alert("Error",error.message);
        throw new Error(error);
    }
}

export const getCategories = async () => {
    try {
        const categories = await tablesDB.listRows({
            databaseId : appwriteConfig.databaseId,
            tableId : appwriteConfig.categoriesCollectionId
        })
        return categories.rows;
    } catch (error:any) {
        Alert.alert("Error",error.message);
        throw new Error(error);
    }
}