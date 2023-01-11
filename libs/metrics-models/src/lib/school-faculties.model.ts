import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const schoolFacultiesScheme = new mongoose.Schema(
  {
    schoolId: { type: String },
    name: { type: String },
    shortname: { type: String },
    deanOfFaculty: String,
  },
  { timestamps: true }
);

if (mongoose.models.SChoolFaculties) {
  delete mongoose.models.SChoolFaculties;
}

const SChoolFaculties = mongoose.model('SChoolFaculties', schoolFacultiesScheme);
export default SChoolFaculties;
