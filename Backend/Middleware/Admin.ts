import Express from 'express';
export default (
  req: any,
  res: Express.Response,
  next: Express.NextFunction
) => {
  if (!req.user.isAdmin) return res.status(403).send('Access Denied');
  next();
};
