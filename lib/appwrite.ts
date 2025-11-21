import useAuthStore from '@/store/auth.store';
import { CreateUserParams, SignInParams } from '@/type';
import { Alert } from 'react-native';
import {Account, Avatars, Client, Databases, ID, Query, TablesDB} from 'react-native-appwrite'
export const appwriteConfig = {
    endpoint : process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    platform : "com.jsm.foodordering",
    projectId : process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId : '691d6119001c3d03f1f9',
    userCollectionId : 'user',
}

export const client = new Client();
client.setEndpoint(appwriteConfig.endpoint!)
      .setPlatform(appwriteConfig.platform)
      .setProject(appwriteConfig.projectId!)

export const account = new Account(client);
const tablesDB = new TablesDB(client);
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