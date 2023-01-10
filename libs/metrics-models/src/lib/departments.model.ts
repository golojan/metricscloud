import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const departmentsScheme = new mongoose.Schema(
  {
    name: { type: String },
    shortname: { type: String },
    description: { type: String },
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models.Departments) {
  delete mongoose.models.Departments;
}
const Departments =
  mongoose.models.Departments ||
  mongoose.model('Departments', departmentsScheme);
export default Departments;
