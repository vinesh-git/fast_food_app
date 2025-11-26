import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";

interface UseAppwriteoptions<T, P extends Record<string,string | number>>{
    fn : (params : P)=> Promise<T>;
    params? : P;
    skip? : boolean
}

interface UseAppwriteReturn<T,P>{
    data: T|null,
    loading : boolean,
    error : string|null;
    refetch : (newParams? : P)=> Promise<void>;
}

const useAppwrite = <T,P extends Record<string,string|number>>({fn,params = {} as P, skip=false} : UseAppwriteoptions<T,P>):UseAppwriteReturn<T,P>=>{
    const [data,setData] = useState<T | null>(null);
    const [loading,setLoading] = useState(!skip);
    const [error,setError] = useState<string|null>(null);

    const fetchData = useCallback(
        async(fetchParams : P)=>{
        setLoading(true);
        setError(null);

        try {
            const result = await fn({...fetchParams});
            setData(result);
        } catch (error : any) {
            const errormsg = error.message;
            setError(errormsg);
            Alert.alert("Error",errormsg);  
        }finally{
            setLoading(false);
        }
        
    }
    ,[fn]
    )
    
    useEffect(()=>{
        if(!skip){
            fetchData(params);
        }
    },[])

    const refetch = async (newParams? : P) => await fetchData(newParams!);
     
    return {data,loading,error,refetch};
}

export default useAppwrite;