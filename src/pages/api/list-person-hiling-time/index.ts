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
    CONCAT(h.HR_FNAME,' ',h.HR_LNAME) as fullname,
		hpht.TEMPLATE_ID as TEMPLATE_ID,
		htt.HILING_TIME_NAME
  FROM hr_person h
	LEFT JOIN hr_person_hiling_time hpht ON hpht.HR_PERSON_ID = h.ID
	LEFT JOIN hiling_time_template htt ON hpht.TEMPLATE_ID = htt.ID`);
    res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    res.json({ status: 500, results: error.message });
  }
}
