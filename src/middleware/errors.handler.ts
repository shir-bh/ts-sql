import { Request, Response,NextFunction  } from 'express'
// import log from '@ajar/marker';
// const { White, Reset, Red } = log.constants;
const { NODE_ENV } = process.env;

export const error_handler =  (err:any, req:Request, res:Response, next:NextFunction) => {
    // log.error(err);
    throw new Error(err);
    next(err)
}
export const error_handler2 =  (err:Error, req:Request, res:Response, next:NextFunction) => {
    if(NODE_ENV !== 'production')res.status(500).json({status:err.message,stack:err.stack});
    else res.status(500).json({status:'internal server error...'});
}
export const not_found =  (req:Request, res:Response) => {
    // log.info(`url: ${White}${req.url}${Reset}${Red} not found...`);
    console.log(`url: ${req.url} not found...`);

    res.status(404).json({status:`url: ${req.url} not found...`});
}


