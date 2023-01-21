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
      includeStudentsInMetrics: { type: Boolean, default: false },
      includeLecturersInMetrics: { type: Boolean, default: true },
      includeAlumniInMetrics: { type: Boolean, default: false },
      citationsWeight: { type: Number, default: 8 },
      hindexWeight: { type: Number, default: 8 },
      i10hindexWeight: { type: Number, default: 8 },
      googlePresenceWeight: { type: Number, default: 8 },
      studentsWeight: { type: Number, default: 8 },
      lecturersWeight: { type: Number, default: 8 },
      alumniWeight: { type: Number, default: 8 },
      internationalStaffWeight: { type: Number, default: 8 },
      internationalCollaborationWeight: { type: Number, default: 8 },
      efficiencyWeight: { type: Number, default: 8 },
      researchOutputWeight: { type: Number, default: 8 },
      researchImpactWeight: { type: Number, default: 8 },
      researchInnovationWeight: { type: Number, default: 8 },
      graduationOutputWeight: { type: Number, default: 8 },
      fullProfessorsWeight: { type: Number, default: 8 },
      phdStudentsWeight: { type: Number, default: 8 },
      phdGraduatesWeight: { type: Number, default: 8 },
      phdLecturersWeight: { type: Number, default: 8 },
      fellowshipWeight: { type: Number, default: 8 },
      accreditationWeight: { type: Number, default: 8 },
      teacherStudentRatioWeight: { type: Number, default: 8 },
      femaleStaffWeight: { type: Number, default: 8 },
      femaleStudentsWeight: { type: Number, default: 8 },
      profsReadersWeight: { type: Number, default: 8 },
      seniorLecturersWeight: { type: Number, default: 8 },
      juniorLecturersWeight: { type: Number, default: 8 },
      associateProfessorsWeight: { type: Number, default: 8 },
      assistantProfessorsWeight: { type: Number, default: 8 },
      otherLecturersWeight: { type: Number, default: 8 },
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
