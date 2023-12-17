// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbApp } from "@/config/dbApp";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "GET":
      try {
        const query = await dbApp.raw(`SELECT 
        h.ID,
        CONCAT(h.HR_FNAME,' ',h.HR_LNAME) as fullname,
        wt.title,
        hpwt.working_time_id,
        wt.startTime,
        wt.startTimeLate,
        wt.endTime
      FROM hr_person h
        LEFT JOIN hr_person_working_time hpwt ON hpwt.hr_id = h.ID
        LEFT JOIN working_time wt ON wt.id = hpwt.working_time_id
        WHERE h.HR_STATUS_ID = "01"`);
        return res.json({ status: 200, results: query[0] });
      } catch (error: any) {
        return res.json({ status: 500, results: error.message });
      }
    case "POST":
      try {
        const data = req.body;
        const find = await dbApp("hr_person_working_time").where(
          "hr_id",
          data.hr_id
        );
        if (find.length > 0) {
          const query = await dbApp("hr_person_working_time")
            .where("hr_id", data.hr_id)
            .update({ working_time_id: data.working_time_id });
          res.json({ status: 200, results: query });
        } else {
          const query = await dbApp("hr_person_working_time").insert(data);
          res.json({ status: 200, results: query });
        }
      } catch (error: any) {
        res.json({ status: 500, results: error.message });
      }
  }
}
