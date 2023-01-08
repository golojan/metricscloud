
import mongoose from 'mongoose';

import Schools from './schools.model';
import Accounts from './accounts.model';
import Connections from './connections.model';
import Owners from './owners.model';
import Roles from './roles.model';

const { MONGOOSE_URI } = process.env ;

export const dbCon = async () => {
  const conn = await mongoose
    .connect(MONGOOSE_URI as string)
    .then(() => {})
    .catch((err) => console.log(err));
  console.log("Mongoose Connection Established");
  return {
    conn,
    Schools,
    Accounts,
    Connections,
    Owners,
    Roles,
  };
};
