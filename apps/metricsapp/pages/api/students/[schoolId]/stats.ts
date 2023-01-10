import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';
import { ResponseFunctions,Gender, StudentType, AccountTypes } from '@metricsai/metrics-interfaces';

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
      const { Accounts, Students } = await dbCon();

      const count = await Accounts.count({
        schoolId: schoolId,
        accountType: AccountTypes.STUDENT,
      }).catch(catcher);

      const countFemale = await Accounts.count({
        schoolId: schoolId,
        accountType: AccountTypes.STUDENT,
        gender: Gender.FEMALE,
      }).catch(catcher);

      const countMale = await Accounts.count({
        schoolId: schoolId,
        accountType: AccountTypes.STUDENT,
        gender: Gender.MALE,
      }).catch(catcher);

      const countLocal = await Accounts.count({
        schoolId: schoolId,
        accountType: AccountTypes.STUDENT,
        studentType: StudentType.LOCAL,
      }).catch(catcher);

      const countIntl = await Accounts.count({
        schoolId: schoolId,
        accountType: AccountTypes.STUDENT,
        studentType: StudentType.INTERNATIONAL,
      }).catch(catcher);

      const countLocalMale = await Accounts.count({
        schoolId: schoolId,
        accountType: AccountTypes.STUDENT,
        studentType: StudentType.LOCAL,
        gender: Gender.MALE,
      }).catch(catcher);

      const countLocalFemale = await Accounts.count({
        schoolId: schoolId,
        accountType: AccountTypes.STUDENT,
        studentType: StudentType.LOCAL,
        gender: Gender.FEMALE,
      }).catch(catcher);

      const countIntlMale = await Accounts.count({
        schoolId: schoolId,
        accountType: AccountTypes.STUDENT,
        studentType: StudentType.INTERNATIONAL,
        gender: Gender.MALE,
      }).catch(catcher);

      const countIntlFemale = await Accounts.count({
        schoolId: schoolId,
        accountType: AccountTypes.STUDENT,
        studentType: StudentType.INTERNATIONAL,
        gender: Gender.FEMALE,
      }).catch(catcher);

      const countChallanged = await Accounts.count({
        schoolId: schoolId,
        accountType: AccountTypes.STUDENT,
        challanged: true,
      }).catch(catcher);

      const countChallangedMale = await Accounts.count({
        schoolId: schoolId,
        accountType: AccountTypes.STUDENT,
        challanged: true,
        gender: Gender.MALE,
      }).catch(catcher);

      const countChallangedFemale = await Accounts.count({
        schoolId: schoolId,
        accountType: AccountTypes.STUDENT,
        challanged: true,
        gender: Gender.FEMALE,
      }).catch(catcher);

      res.status(200).json({
        status: true,
        count: count,
        countLocal: countLocal,
        countIntl: countIntl,
        countMale: countMale,
        countFemale: countFemale,
        countLocalMale: countLocalMale,
        countLocalFemale: countLocalFemale,
        countIntlMale: countIntlMale,
        countIntlFemale: countIntlFemale,
        countChallanged: countChallanged,
        countChallangedMale: countChallangedMale,
        countChallangedFemale: countChallangedFemale,
      });
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
