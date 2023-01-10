import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const facultiesScheme = new mongoose.Schema(
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

if (mongoose.models.Faculties) {
  delete mongoose.models.Faculties;
}

const Faculties =
  mongoose.models.Faculties || mongoose.model('Faculties', facultiesScheme);
export default Faculties;
