// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbApp } from "@/config/dbApp";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const data = req.body;
    const find = await dbApp("hr_person_hiling_time").where(
      "HR_PERSON_ID",
      data.HR_PERSON_ID
    );
    if (find.length > 0) {
      const query = await dbApp("hr_person_hiling_time")
        .where("HR_PERSON_ID", data.HR_PERSON_ID)
        .update({ TEMPLATE_ID: data.TEMPLATE_ID });
      res.json({ status: 200, results: query });
    } else {
      const query = await dbApp("hr_person_hiling_time").insert({ ...data });
      res.json({ status: 200, results: query });
    }
  } catch (error: any) {
    res.json({ status: 500, results: error.message });
  }
}
