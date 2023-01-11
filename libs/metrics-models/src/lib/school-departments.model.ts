import mongoose from 'mongoose';
import {AccountTypes} from '@metricsai/metrics-interfaces'

mongoose.Promise = global.Promise;
const schoolDepartmentsScheme = new mongoose.Schema(
  {
    schoolId: String,
    facultyId: String,
    name: String,
    shortname: String,
    accredited: { type: Boolean, default: false },
    accreditation: {
      type: String,
      enum: Object.values(AccountTypes),
      required: true,
    },
    headOfDepartment: String,
  },
  { timestamps: true }
);

if (mongoose.models.SchoolDepartments) {
  delete mongoose.models.SchoolDepartments;
}

const SchoolDepartments = mongoose.model('SchoolDepartments', schoolDepartmentsScheme);
export default SchoolDepartments;
