// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import { dbApp } from "@/config/dbApp";
import { sqlLeaveAndRecord } from "@/helper/api/sql/LeaveAndRecord";
import { MapFingle } from "@/helper/api/MapFingle";
import { CountScanOffMount } from "@/helper/api/CountScanOffMount";
import { isValidTimeFormat } from "@/helper/api/isValidDateFormat";
import { loopDateAuth8 } from "@/helper/api/sql/SqlAuthScan8";
import { MapFingle8 } from "@/helper/api/MapFingle8";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "POST":
      try {
        const data = req.body;
        const sql = `SELECT 
        hp.ID AS hrId,
        CONCAT(hp.HR_FNAME," ",hp.HR_LNAME) as fullname,
        hd.HR_DEPARTMENT_NAME,
        mIn.* ,
        mOut.*,
        aIn.*,
        aOut.*,
        nIn.*,
        nOut.*
      FROM hr_person hp
      LEFT JOIN (SELECT 
        ${loopDateAuth8("mIn", data.month)}
        p.ID
      FROM hr_person p
      LEFT JOIN hikvision hik ON p.ID = hik.employeeID AND hik.AccessTime BETWEEN '05:00' AND '11:59'      
      GROUP BY p.ID, p.HR_FNAME, hik.employeeID) mIn ON mIn.ID = hp.ID

      LEFT JOIN (SELECT 	
        ${loopDateAuth8("mOut", data.month)}
        p.ID       
      FROM hr_person p
      LEFT JOIN hikvision hik ON p.ID = hik.employeeID AND hik.AccessTime BETWEEN '15:00' AND '18:00'      
      GROUP BY p.ID, p.HR_FNAME, hik.employeeID) mOut ON mOut.ID = hp.ID
     
      LEFT JOIN (SELECT 
        ${loopDateAuth8("aIn", data.month)}
        p.ID
      FROM hr_person p
      LEFT JOIN hikvision hik ON p.ID = hik.employeeID AND hik.AccessTime BETWEEN '15:00' AND '20:59'      
      GROUP BY p.ID, p.HR_FNAME, hik.employeeID) aIn ON aIn.ID = hp.ID

      LEFT JOIN (SELECT 	
        ${loopDateAuth8("aOut", data.month)}
        p.ID       
      FROM hr_person p
      LEFT JOIN hikvision hik ON p.ID = hik.employeeID AND (hik.AccessTime BETWEEN '23:00' AND '23:59' OR hik.AccessTime BETWEEN '00:00' AND '02:59')      
      GROUP BY p.ID, p.HR_FNAME, hik.employeeID) aOut ON aOut.ID = hp.ID
     
      LEFT JOIN (SELECT 
        ${loopDateAuth8("nIn", data.month)}
        p.ID
      FROM hr_person p
      LEFT JOIN hikvision hik ON p.ID = hik.employeeID AND (hik.AccessTime BETWEEN '23:00' AND '23:59' OR hik.AccessTime BETWEEN '00:00' AND '02:59')      
      GROUP BY p.ID, p.HR_FNAME, hik.employeeID) nIn ON nIn.ID = hp.ID

      LEFT JOIN (SELECT 	
        ${loopDateAuth8("nOut", data.month)}
        p.ID       
      FROM hr_person p
      LEFT JOIN hikvision hik ON p.ID = hik.employeeID AND hik.AccessTime BETWEEN '06:00' AND '10:59'      
      GROUP BY p.ID, p.HR_FNAME, hik.employeeID) nOut ON nOut.ID = hp.ID

      LEFT JOIN hr_status hs ON hp.HR_STATUS_ID = hs.HR_STATUS_ID
      LEFT JOIN hr_department hd ON hp.HR_DEPARTMENT_ID = hd.HR_DEPARTMENT_ID
      LEFT JOIN hr_person_hiling_time hht ON hht.HR_PERSON_ID = hp.ID
      WHERE
        CONCAT(hp.HR_FNAME," ",hp.HR_LNAME) LIKE '%${data.fullname}%'
        AND hs.HR_STATUS_ID IN('01')
        ${
          data.hilingTimeType == "nomal"
            ? ` AND (hht.TEMPLATE_ID	IS NULL OR hht.TEMPLATE_ID = 1)`
            : ` AND hht.TEMPLATE_ID = 2`
        }
       
        ${data.userId !== 0 ? `AND hp.ID = ${data.userId}` : ""}
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

        const finalData = MapFingle8(
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
