// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import { dbApp } from "@/config/dbApp";
import { sqlLeaveAndRecord } from "@/helper/api/sql/LeaveAndRecord";
import { MapFingle } from "@/helper/api/MapFingle";
import { CountScanOffMount } from "@/helper/api/CountScanOffMount";
import { isValidTimeFormat } from "@/helper/api/isValidDateFormat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "POST":
      try {
        const data = req.body;
        // sqlLeaveAndRecord(data.month, data.userId)
        const sql = `
        SELECT 
          CONCAT(h.HR_FNAME," ",h.HR_LNAME) as fullname,
          hrd.HR_DEPARTMENT_NAME,
          h.ID,
          h.FINGLE_ID,
          ss.*,
          se.*                
        FROM hr_person h
        LEFT JOIN hr_department hrd ON h.HR_DEPARTMENT_ID = hrd.HR_DEPARTMENT_ID
        LEFT JOIN (
        SELECT	
            p_start.ID as START_PERSON_ID,
            IF(DAY(h_start.authDate) = '1',h_start.authTime,null) as 'ds1',IF(DAY(h_start.authDate) = '2',h_start.authTime,null) as 'ds2',IF(DAY(h_start.authDate) = '3',h_start.authTime,null) as 'ds3',IF(DAY(h_start.authDate) = '4',h_start.authTime,null) as 'ds4',IF(DAY(h_start.authDate) = '5',h_start.authTime,null) as 'ds5',IF(DAY(h_start.authDate) = '6',h_start.authTime,null) as 'ds6',IF(DAY(h_start.authDate) = '7',h_start.authTime,null) as 'ds7',IF(DAY(h_start.authDate) = '8',h_start.authTime,null) as 'ds8',IF(DAY(h_start.authDate) = '9',h_start.authTime,null) as 'ds9',IF(DAY(h_start.authDate) = '10',h_start.authTime,null) as 'ds10',IF(DAY(h_start.authDate) = '11',h_start.authTime,null) as 'ds11',IF(DAY(h_start.authDate) = '12',h_start.authTime,null) as 'ds12',IF(DAY(h_start.authDate) = '13',h_start.authTime,null) as 'ds13',IF(DAY(h_start.authDate) = '14',h_start.authTime,null) as 'ds14',IF(DAY(h_start.authDate) = '15',h_start.authTime,null) as 'ds15',IF(DAY(h_start.authDate) = '16',h_start.authTime,null) as 'ds16',IF(DAY(h_start.authDate) = '17',h_start.authTime,null) as 'ds17',IF(DAY(h_start.authDate) = '18',h_start.authTime,null) as 'ds18',IF(DAY(h_start.authDate) = '19',h_start.authTime,null) as 'ds19',IF(DAY(h_start.authDate) = '20',h_start.authTime,null) as 'ds20',IF(DAY(h_start.authDate) = '21',h_start.authTime,null) as 'ds21',IF(DAY(h_start.authDate) = '22',h_start.authTime,null) as 'ds22',IF(DAY(h_start.authDate) = '23',h_start.authTime,null) as 'ds23',IF(DAY(h_start.authDate) = '24',h_start.authTime,null) as 'ds24',IF(DAY(h_start.authDate) = '25',h_start.authTime,null) as 'ds25',IF(DAY(h_start.authDate) = '26',h_start.authTime,null) as 'ds26',IF(DAY(h_start.authDate) = '27',h_start.authTime,null) as 'ds27',IF(DAY(h_start.authDate) = '28',h_start.authTime,null) as 'ds28',IF(DAY(h_start.authDate) = '29',h_start.authTime,null) as 'ds29',IF(DAY(h_start.authDate) = '30',h_start.authTime,null) as 'ds30',IF(DAY(h_start.authDate) = '31',h_start.authTime,null) as 'ds31'
        FROM hr_person as p_start
        LEFT JOIN hikvision h_start ON  p_start.FINGLE_ID = h_start.employeeID
        WHERE 
            YEAR(h_start.authDate) = "${dayjs(data.month).format("YYYY")}"
            AND MONTH(h_start.authDate) = "${dayjs(data.month).format("MM")}"
            AND h_start.authTime <= '12:00:00'
            
        ) ss ON ss.START_PERSON_ID = h.ID
        LEFT JOIN (
        SELECT	
            p_end.ID as END_PERSON_ID,
            IF(DAY(h_end.authDate) = '1',h_end.authTime,null) as 'de1',IF(DAY(h_end.authDate) = '2',h_end.authTime,null) as 'de2',IF(DAY(h_end.authDate) = '3',h_end.authTime,null) as 'de3',IF(DAY(h_end.authDate) = '4',h_end.authTime,null) as 'de4',IF(DAY(h_end.authDate) = '5',h_end.authTime,null) as 'de5',IF(DAY(h_end.authDate) = '6',h_end.authTime,null) as 'de6',IF(DAY(h_end.authDate) = '7',h_end.authTime,null) as 'de7',IF(DAY(h_end.authDate) = '8',h_end.authTime,null) as 'de8',IF(DAY(h_end.authDate) = '9',h_end.authTime,null) as 'de9',IF(DAY(h_end.authDate) = '10',h_end.authTime,null) as 'de10',IF(DAY(h_end.authDate) = '11',h_end.authTime,null) as 'de11',IF(DAY(h_end.authDate) = '12',h_end.authTime,null) as 'de12',IF(DAY(h_end.authDate) = '13',h_end.authTime,null) as 'de13',IF(DAY(h_end.authDate) = '14',h_end.authTime,null) as 'de14',IF(DAY(h_end.authDate) = '15',h_end.authTime,null) as 'de15',IF(DAY(h_end.authDate) = '16',h_end.authTime,null) as 'de16',IF(DAY(h_end.authDate) = '17',h_end.authTime,null) as 'de17',IF(DAY(h_end.authDate) = '18',h_end.authTime,null) as 'de18',IF(DAY(h_end.authDate) = '19',h_end.authTime,null) as 'de19',IF(DAY(h_end.authDate) = '20',h_end.authTime,null) as 'de20',IF(DAY(h_end.authDate) = '21',h_end.authTime,null) as 'de21',IF(DAY(h_end.authDate) = '22',h_end.authTime,null) as 'de22',IF(DAY(h_end.authDate) = '23',h_end.authTime,null) as 'de23',IF(DAY(h_end.authDate) = '24',h_end.authTime,null) as 'de24',IF(DAY(h_end.authDate) = '25',h_end.authTime,null) as 'de25',IF(DAY(h_end.authDate) = '26',h_end.authTime,null) as 'de26',IF(DAY(h_end.authDate) = '27',h_end.authTime,null) as 'de27',IF(DAY(h_end.authDate) = '28',h_end.authTime,null) as 'de28',IF(DAY(h_end.authDate) = '29',h_end.authTime,null) as 'de29',IF(DAY(h_end.authDate) = '30',h_end.authTime,null) as 'de30',IF(DAY(h_end.authDate) = '31',h_end.authTime,null) as 'de31'
        FROM hr_person as p_end
        LEFT JOIN hikvision h_end ON  p_end.FINGLE_ID = h_end.employeeID
        WHERE 
            YEAR(h_end.authDate) = "${dayjs(data.month).format("YYYY")}"
            AND MONTH(h_end.authDate) = "${dayjs(data.month).format("MM")}"
            AND h_end.authTime >= '12:00:00'
            
        ) se ON se.END_PERSON_ID = h.ID   
        WHERE 
          CONCAT(h.HR_FNAME," ",h.HR_LNAME) LIKE "%${data.fullname}%" 
          ${
            data.department == "0"
              ? ""
              : `AND h.HR_DEPARTMENT_ID = "${data.department}"`
          }
          ${data.userId == 0 ? `` : `AND h.ID = ${data.userId}`}          
          GROUP BY h.HR_CID`;
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
