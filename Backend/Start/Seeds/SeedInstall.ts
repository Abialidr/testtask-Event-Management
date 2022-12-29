import { SeedData } from './SeedData';
import { postUserFunction } from '../../Controller/User';

const seedInstall = async () => {
  SeedData.map((data) => {
    postUserFunction(data);
  });
};
export default seedInstall;
