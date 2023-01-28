import { NextApiRequest, NextApiResponse } from "next";
import { dbCon } from '@metricsai/metrics-models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';

const bcrypt = require("bcryptjs");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const {
        username,
        accountType,
        firstname,
        lastname,
        email,
        gender,
        password,
        schoolId,
        facultyId,
        departmentId,
        birthday,
      } = req.body;
      const { Accounts } = await dbCon();

      // Encrypt Password//
      const salt = bcrypt.genSaltSync(10);
      var hashedPassword = bcrypt.hashSync(password, salt);
      // Encrypt Password//

      const created = await Accounts.create({
        username: username,
        email: email,
        firstname: firstname,
        lastname: lastname,
        accountType: accountType,
        gender: gender,
        passwordKey: password,
        password: hashedPassword,
        schoolId: schoolId,
        departmentId: departmentId,
        facultyId: facultyId,
        birthday: birthday,
      }).catch(catcher);

      if (created) {
        res.status(200).json({ status: true, token: created._id });
        return;
      } else {
        res.status(404).json({ status: false, err: "Error creating account" });
        return;
      }

    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else
    res.status(400).json({ status: 0, error: "No Response for This Request" });
}
