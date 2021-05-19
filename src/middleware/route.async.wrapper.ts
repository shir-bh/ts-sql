import { Request, Response,NextFunction } from 'express'
// const fn:Function= (req:Request, res:Response, next:NextFunction) => {
//   fn(req, res, next).catch(next);
//   // .catch((err)=> next(err))
// };
// export default fn;


export default (fn: any) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  fn(req, res, next).catch(next);
};