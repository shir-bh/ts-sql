export const getEnv=(name:string):string=>{
    const val=process.env[name];
    if(!val){
        throw new Error("env returned undefined");
    }
    return val;
}