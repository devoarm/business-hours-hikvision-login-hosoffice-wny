// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbApp } from "@/config/dbApp";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "POST":
      try {
        const query = await dbApp("working_time").insert(req.body);
        res.json({ status: 200, results: query[0] });
      } catch (error: any) {
        res.json({ status: 500, results: error.message });
      }
    case "GET":
      try {
        const query = await dbApp("working_time");
        
        res.json({ status: 200, results: query });
      } catch (error: any) {
        res.json({ status: 500, results: error.message });
      }
    

    default:
      break;
  }
}
