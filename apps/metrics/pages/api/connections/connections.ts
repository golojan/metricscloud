import { NextApiRequest, NextApiResponse } from "next";
import { dbCon } from '@metrics/metrics-models';
import { ResponseFunctions } from '@metrics/metrics-interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { token, fromUser, toUser } = req.query;

      const { Connections } = await dbCon();
      const connection = await Connections.findOne({
        $or: [
          { fromUser: fromUser, toUser: toUser },
          { fromUser: toUser, toUser: fromUser },
        ],
      }).catch(catcher);

      if (connection) {
        res.status(200).json({
          status: true,
          connection: connection,
        });
        return;
      } else {
        res.status(400).json({
          status: false,
          error: "No Connection Found",
        });
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
