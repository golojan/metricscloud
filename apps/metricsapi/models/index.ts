import mongoose from 'mongoose';

import Schools from './schools.model';
import Accounts from './accounts.model';
import Connections from './connections.model';
import Owners from './owners.model';
import Roles from './roles.model';
import Indicators from './indicators.model';
import Memberships from './memberships.model';
import Lecturers from './lecturers.model';
import Students from './students.model';
import Faculties from './faculties.model';
import Departments from './departments.model';
import SchoolFaculties from './school-faculties.model';
import SchoolDepartments from './school-departments.model';
import PostFeeds from './posts.model';
import PostFeedComments from './comments.model';
import UserReactions from './reactions.model';
import MRCs from './mrcs.model';

const { MONGOOSE_URI } = process.env;

export const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );
  res.header('Content-Type', 'application/json');
  if (req.method === 'GET' || req.method === 'POST') {
    return await fn(req, res);
  } else {
    res.status(200).end();
    return;
  }
};

export const dbCon = async () => {
  mongoose.set('strictQuery', true);
  await mongoose
    .connect(MONGOOSE_URI as string)
    .then(() => {
      console.log('Mongoose Connection Established');
    })
    .catch((err) => console.log(err));
  return {
    allowCors,
    Schools,
    Accounts,
    Connections,
    Owners,
    Roles,
    Indicators,
    Memberships,
    Lecturers,
    Students,
    Faculties,
    Departments,
    SchoolFaculties,
    SchoolDepartments,
    PostFeeds,
    PostFeedComments,
    UserReactions,
    MRCs,
  };
};
