import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const schoolFacultiesScheme = new mongoose.Schema(
  {
    schoolId: { type: String, required: true },
    facultyId: { type: String, required: true },
    facultyName: { type: String },
    facultyCode: { type: String },
    facultyDescription: { type: String },
    deanOfFaculty: String,
  },
  { timestamps: true }
);

if (mongoose.models.SChoolFaculties) {
  delete mongoose.models.SChoolFaculties;
}

const SChoolFaculties = mongoose.model(
  'SChoolFaculties',
  schoolFacultiesScheme
);
export default SChoolFaculties;
