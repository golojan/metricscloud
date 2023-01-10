import {
  Gender,
  LecturerLevel,
  LecturerType,
  ResponseFunctions,
  AccountTypes
} from '@metricsai/metrics-interfaces';

import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      res
        .status(200)
        .json({ status: false, err: 'Only GET Method is allowed' });
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {

      const { schoolId } = req.query;
      const { Lecturers } = await dbCon();

      const count = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
      }).catch(catcher);

      const countLocal = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        lecturerType: LecturerType.LOCAL,
      }).catch(catcher);

      const countIntl = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        lecturerType: LecturerType.INTERNATIONAL,
      }).catch(catcher);

      const countMale = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        gender: Gender.MALE,
      }).catch(catcher);

      const countFemale = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        gender: Gender.FEMALE,
      }).catch(catcher);

      const countLocalFemale = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        gender: Gender.FEMALE,
        lecturerType: LecturerType.LOCAL,
      }).catch(catcher);

      const countLocalMale = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        gender: Gender.MALE,
        lecturerType: LecturerType.LOCAL,
      }).catch(catcher);

      const countIntlFemale = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        gender: Gender.FEMALE,
        lecturerType: LecturerType.INTERNATIONAL,
      }).catch(catcher);

      const countIntlMale = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        gender: Gender.MALE,
        lecturerType: LecturerType.INTERNATIONAL,
      }).catch(catcher);

      const countProfessors = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        'professor.isProfessor': true,
      }).catch(catcher);

      const countProfessorsMale = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        gender: Gender.MALE,
        'professor.isProfessor': true,
      }).catch(catcher);

      const countProfessorsFemale = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        gender: Gender.FEMALE,
        'professor.isProfessor': true,
      }).catch(catcher);

      const countIntlProfessors = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        'professor.isProfessor': true,
        lecturerType: LecturerType.INTERNATIONAL,
      }).catch(catcher);

      const countFullProfessors = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        'professor.isProfessor': true,
        'professor.isFullProfessor': true,
      }).catch(catcher);

      const countFullProfessorsMale = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        gender: Gender.MALE,
        'professor.isProfessor': true,
        'professor.isFullProfessor': true,
      }).catch(catcher);

      const countFullProfessorsFemale = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        gender: Gender.FEMALE,
        'professor.isProfessor': true,
        'professor.isFullProfessor': true,
      }).catch(catcher);

      const countAdjunct = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        adjunct: true,
      }).catch(catcher);

      const countAdjunctMale = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        gender: Gender.MALE,
        adjunct: true,
      }).catch(catcher);

      const countAdjunctFemale = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        gender: Gender.FEMALE,
        adjunct: true,
      }).catch(catcher);

      const countAdjunctProfessorsMale = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        gender: Gender.MALE,
        adjunct: true,
        'professor.isProfessor': true,
        'professor.isFullProfessor': true,
      }).catch(catcher);

      const countAdjunctProfessorsFemale = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        gender: Gender.FEMALE,
        adjunct: true,
        'professor.isProfessor': true,
        'professor.isFullProfessor': true,
      }).catch(catcher);

      const countAdjunctProfessors = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        adjunct: true,
        'professor.isProfessor': true,
      }).catch(catcher);

      const countPHDLecturers = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        withPhd: true,
      }).catch(catcher);

      const countSeniorLecturers = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        level: LecturerLevel.SENIOR,
      }).catch(catcher);

      const countJuniorLecturers = await Lecturers.count({
        schoolId: schoolId,
        accountType: AccountTypes.LECTURER,
        level: LecturerLevel.SENIOR,
      }).catch(catcher);

      res.status(200).json({
        status: true,
        count: count,
        countLocal: countLocal,
        countIntl: countIntl,
        countMale: countMale,
        countFemale: countFemale,
        countLocalFemale: countLocalFemale,
        countLocalMale: countLocalMale,
        countIntlFemale: countIntlFemale,
        countIntlMale: countIntlMale,
        countProfessors: countProfessors,
        countProfessorsMale: countProfessorsMale,
        countProfessorsFemale: countProfessorsFemale,
        countIntlProfessors: countIntlProfessors,
        countFullProfessors: countFullProfessors,
        countFullProfessorsMale: countFullProfessorsMale,
        countFullProfessorsFemale: countFullProfessorsFemale,
        countAdjunct: countAdjunct,
        countAdjunctFemale: countAdjunctFemale,
        countAdjunctMale: countAdjunctMale,
        countAdjunctProfessors: countAdjunctProfessors,
        countAdjunctProfessorsMale: countAdjunctProfessorsMale,
        countAdjunctProfessorsFemale: countAdjunctProfessorsFemale,
        countPHDLecturers: countPHDLecturers,
        countSeniorLecturers: countSeniorLecturers,
        countJuniorLecturers: countJuniorLecturers,
      });
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
