import userRoutes from './user';
import documentRoutes from './document';
import documentMeta from './documentMeta';
import segmentRoutes from './segmentRoutes';

const UserRoute = (app) => {
  userRoutes(app);
  documentRoutes(app);
  documentMeta(app);
  segmentRoutes(app);
};

export default UserRoute;
