// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbApp } from "@/config/dbApp";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;
  switch (req.method) {
    case "DELETE":
      try {
        const query = await dbApp("working_time").where("id", id).delete();
        return res.json({ status: 200, results: query });
      } catch (error: any) {
        return res.json({ status: 500, results: error.message });
      }
    case "PUT":
      try {
        const query = await dbApp("working_time")
          .where("id", id)
          .update({ ...req.body });
        return res.json({ status: 200, results: query });
      } catch (error: any) {
        return res.json({ status: 500, results: error.message });
      }
    case "GET":
      try {
        const query = await dbApp("working_time").where("id", id).first();
        return res.json({ status: 200, results: query });
      } catch (error: any) {
        return res.json({ status: 500, results: error.message });
      }

    default:
      break;
  }
}
