import { NextApiRequest, NextApiResponse } from "next";

import { dbCon } from '@metrics/metrics-models';
import { ResponseFunctions } from '@metrics/metrics-interfaces';

export interface Connection extends Document {
  fromUser: string;
  toUser: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { token } = req.query;
      const { fromUser, toUser } = req.body;
      const { Connections } = await dbCon();
      const connection = await Connections.findOne({
        $or: [
          { fromUser: fromUser, toUser: toUser },
          { fromUser: toUser, toUser: fromUser },
        ],
      }).catch(catcher);

      if (connection) {
        //Remove the connection
        const deleted = await Connections.deleteOne({
          _id: connection._id,
        }).catch(catcher);
        if (deleted) {
          res.status(200).json({ status: true });
          return;
        } else {
          res.status(200).json({ status: true });
          return;
        }
      } else {
        //Establish the connection
        const newConnection = new Connections({
          fromUser: fromUser,
          toUser: toUser,
        });
        const saved = await newConnection.save().catch(catcher);
        if (saved) {
          res.status(200).json({ status: true });
        } else {
          res.status(400).json({ status: false, error: "Connection failed" });
        }
        return;
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else
    res
      .status(400)
      .json({ status: false, error: "No Response for This Request" });
}
