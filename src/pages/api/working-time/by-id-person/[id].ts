// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbApp } from "@/config/dbApp";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        const query = await dbApp("hr_person_working_time")
          .where("hr_id", id)
          .first();
        if (query) {
          return res.json({ status: 200, results: query });
        } else {
          return res.json({ status: 301, results: query });
        }
      } catch (error: any) {
        return res.json({ status: 500, results: error.message });
      }

    default:
      break;
  }
}
