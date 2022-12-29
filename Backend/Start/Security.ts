import cors from 'cors';

export default (app: any) => {
  const allowedOrigins = ['http://localhost:3000'];
  const options: cors.CorsOptions = {
    origin: '*',
  };
  app.use(cors(options));
};
