import mongoose from 'mongoose';
// import { AccreditationTypes } from '@metricsai/metrics-interfaces';
mongoose.Promise = global.Promise;

const schoolDepartmentsScheme = new mongoose.Schema(
  {
    schoolId: { type: String, required: true },
    facultyId: { type: String, required: true },
    departmentId: { type: String, required: true },
    departmentName: String,
    departmentCode: String,
    departmentDescription: String,
    headOfDepartment: String,
  },
  { timestamps: true }
);

if (mongoose.models.SchoolDepartments) {
  delete mongoose.models.SchoolDepartments;
}

const SchoolDepartments = mongoose.model(
  'SchoolDepartments',
  schoolDepartmentsScheme
);
export default SchoolDepartments;
