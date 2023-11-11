// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import { dbApp } from "@/config/dbApp";
import { sqlLeaveAndRecord } from "@/helper/api/sql/LeaveAndRecord";
import { MapFingle } from "@/helper/api/MapFingle";
import { CountScanOffMount } from "@/helper/api/CountScanOffMount";
import { isValidTimeFormat } from "@/helper/api/isValidDateFormat";
import { loopDateAuth } from "@/helper/api/sql/SqlAuthScan";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "POST":
      try {
        const data = req.body;
        const sql = `SELECT 
        hp.ID,
        CONCAT(hp.HR_FNAME," ",hp.HR_LNAME) as fullname,
        hd.HR_DEPARTMENT_NAME,
        ds.* ,
        de.*
      FROM hr_person hp
      LEFT JOIN (SELECT 
        ${loopDateAuth("morning", data.month)}
        p.FINGLE_ID
      FROM hr_person p
      LEFT JOIN hikvision hik ON p.FINGLE_ID = hik.employeeID AND hik.authTime <= '11:59'
      GROUP BY p.FINGLE_ID, p.HR_FNAME, hik.employeeID) ds ON ds.FINGLE_ID = hp.FINGLE_ID

      LEFT JOIN (SELECT 	
        ${loopDateAuth("afternoon", data.month)}
        p.FINGLE_ID       
      FROM hr_person p
      LEFT JOIN hikvision hik ON p.FINGLE_ID = hik.employeeID AND hik.authTime >= '12:00'
      GROUP BY p.FINGLE_ID, p.HR_FNAME, hik.employeeID) de ON de.FINGLE_ID = hp.FINGLE_ID
      
      LEFT JOIN hr_department hd ON hp.HR_DEPARTMENT_ID = hd.HR_DEPARTMENT_ID
      WHERE
        CONCAT(hp.HR_FNAME," ",hp.HR_LNAME) LIKE '%${data.fullname}%'
        ${
          data.department == "0"
            ? ``
            : `AND hp.HR_DEPARTMENT_ID = ${data.department}`
        }`;

        const record = await dbApp.raw(`SELECT 
        ri.HR_ID,
        ri.DATE_GO,
        ri.DATE_BACK
      FROM record_index ri 
      WHERE 
        YEAR(ri.DATE_GO) = "${dayjs(data.month).format("YYYY")}"
        AND MONTH(ri.DATE_GO) = "${dayjs(data.month).format("MM")}"
        AND (ri.CANCEL_STATUS <> 'True' OR ri.CANCEL_STATUS IS NULL OR ri.CANCEL_STATUS = "") 
        
        `);
        const leave = await dbApp.raw(`SELECT 
        l.LEAVE_PERSON_ID,
        lt.LEAVE_TYPE_NAME,
        l.LEAVE_DATE_BEGIN,
        l.LEAVE_DATE_END
      FROM leave_register l 
      LEFT JOIN leave_type lt ON lt.LEAVE_TYPE_ID = l.LEAVE_TYPE_CODE
      WHERE 
        YEAR(l.LEAVE_DATE_BEGIN) = "${dayjs(data.month).format("YYYY")}"
        AND MONTH(l.LEAVE_DATE_BEGIN) = "${dayjs(data.month).format("MM")}"
        AND l.LEAVE_CANCEL_STATUS != 'True'`);
        const query = await dbApp.raw(sql);

        const finalData = MapFingle(
          record[0],
          leave[0],
          query[0],
          data.month
        ).map((item: any) => {
          var countStart = 0;
          const dayMonth = dayjs(data.month).daysInMonth();
          for (let index = 1; index <= dayMonth; index++) {
            if (isValidTimeFormat(item?.[`ds${index}`])) {
              countStart++;
            }
          }

          var countEnd = 0;
          for (let index = 1; index <= dayMonth; index++) {
            if (isValidTimeFormat(item?.[`de${index}`])) {
              countEnd++;
            }
          }
          return { ...item, countStart: countStart, countEnd: countEnd };
        });
        res.json({
          status: 200,
          results: finalData,
          msg: sql,
        });
      } catch (error: any) {
        res.json({ status: 500, results: error.message });
      }
    default:
      break;
  }
}
