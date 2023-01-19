import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const schoolsScheme = new mongoose.Schema(
  {
    logo: {
      type: String,
      default: '/assets/img/logo-icon.png',
    },
    domain: { type: String },
    name: { type: String },
    shortname: { type: String, unique: true },
    state: { type: String },
    location: String,
    ownedBy: { type: String },
    founded: Number,
    website: { type: String },

    googlePresenceCount: { type: Number, default: 0 },
    googlePresence: { type: Number, default: 0 },
    citations: { type: Number, default: 0 },
    hindex: { type: Number, default: 0 },
    i10hindex: { type: Number, default: 0 },

    history: [
      {
        name: String,
        lecturers: [],
        students: [],
        googlePresence: { type: Number, default: 0 },
        citations: { type: Number, default: 0 },
        hindex: { type: Number, default: 0 },
        i10hindex: { type: Number, default: 0 },
        allschools: [],
        adminId: String,
      },
      { timestamps: true },
    ],
    indicators: [
      {
        type: String,
      },
    ],
    settings: {
      includeStudentsInMetrics: {
        type: Boolean,
        default: false,
      },
      includeLecturersInMetrics: {
        type: Boolean,
        default: true,
      },
      includeAlumniInMetrics: {
        type: Boolean,
        default: false,
      },
    },
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models.Schools) {
  delete mongoose.models.Schools;
}
const Schools = mongoose.model('Schools', schoolsScheme);
export default Schools;
