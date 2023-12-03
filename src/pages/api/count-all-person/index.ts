// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbApp } from "@/config/dbApp";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const query = await dbApp.raw(`SELECT 
    COUNT(h.ID) as count   
  FROM hr_person h`);
    res.json({ status: 200, results: query[0][0] });
  } catch (error: any) {
    res.json({ status: 500, results: error.message });
  }
}
