// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbApp } from "@/config/dbApp";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const query = await dbApp.raw(`SELECT 
    h.ID,
    CONCAT(h.HR_FNAME,' ',h.HR_LNAME) as fullname
  FROM hr_person h
  WHERE 
    h.ID NOT IN(
    SELECT hph.HR_PERSON_ID FROM hr_person_hiling_time hph
  )`);
    res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    res.json({ status: 500, results: error.message });
  }
}
