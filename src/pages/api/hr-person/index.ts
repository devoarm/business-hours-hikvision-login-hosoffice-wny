// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbApp } from "@/config/dbApp";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const query = await dbApp.raw(`SELECT 
    hr.ID,
    hr.FINGLE_ID,
    hr.HR_CID,
    hr.HR_PREFIX_ID,
    hr.HR_FNAME,
    hr.HR_LNAME,
    hr.HR_EN_NAME,
    hr.PAY,
    hr.SEX,
    hr.HR_DEPARTMENT_ID,
    hr.HR_DEPARTMENT_SUB_ID,   
    hr.HR_USERNAME,
    hr.HR_PASSWORD,    
    hr.PERSON_TYPE,   
    hr.USER_TYPE, 
    hr.PERMIS_ID,   
    hr.NICKNAME,
    hr.HR_PERSON_TYPE_ID,
    FROM hr_person hr
    LEFT JOIN hr_status hs ON hs.HR_STATUS_ID = hr.HR_STATUS_ID
    WHERE hs.HR_STATUS_ID = "01"`);
    res.json({ status: 200, results: query[0] });
  } catch (error: any) {
    res.json({ status: 500, results: error.message });
  }
}
