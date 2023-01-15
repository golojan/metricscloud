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

const { NEXT_PUBLIC_MONGOOSE_URI } = process.env;

export const dbCon = async () => {
  const conn = await mongoose
    .connect(NEXT_PUBLIC_MONGOOSE_URI as string)
    .then(() => {})
    .catch((err) => console.log(err));
  console.log('Mongoose Connection Established');
  return {
    conn,
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
  };
};
