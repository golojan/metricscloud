import mongoose from 'mongoose';
import { AccountTypes, Gender } from '@metricsai/metrics-interfaces';

mongoose.Promise = global.Promise;

const accountsScheme = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    schoolId: {
      type: String,
    },
    role: {
      type: String,
    },
    departmentId: {
      type: String,
    },
    accountType: {
      type: String,
      enum: Object.values(AccountTypes),
      required: true,
    },
    picture: {
      type: String,
      default: '/images/avatar/user.png',
    },
    firstname: { type: String },
    middlename: { type: String },
    lastname: { type: String },
    aboutMe: { type: String, default: '' },
    email: {
      type: String,
      unique: true,
    },
    mobile: { type: String },
    gender: {
      type: String,
      enum: Object.values(Gender),
    },
    birthday: { type: String },
    addresses: {
      contact: {
        street: String,
        city: String,
        lga: String,
        state: String,
        zip: String,
        country: { type: String, default: 'Nigeria' },
      },
    },
    otp: {
      enabled: { type: Boolean, default: true },
      code: String,
    },
    passwordKey: { type: String },
    password: { type: String },
    enabled: {
      type: Boolean,
      default: false,
    },
    smsNotification: { type: Boolean, default: false },
    emailNotification: { type: Boolean, default: false },
    schoolCode: { type: String },
    googleScholarId: { type: String },
    scopusId: { type: String },
    orcidId: { type: String },
    googlePresence: { type: Number, default: 0 },
    citations: { type: Number, default: 0 },
    hindex: { type: Number, default: 0 },
    i10hindex: { type: Number, default: 0 },
    totalPublications: { type: Number, default: 0 },
    firstPublicationYear: { type: Number },
    lastPublicationYear: { type: Number },
    publications: [{}],
  },

  { timestamps: true }
);

if (mongoose.models.Accounts) {
  delete mongoose.models.Accounts;
}

const Accounts = mongoose.model('Accounts', accountsScheme);
export default Accounts;
