// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import { dbApp } from "@/config/dbApp";
import { sqlLeaveAndRecord } from "@/helper/api/sql/LeaveAndRecord";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "POST":
      try {
        const data = req.body;
        const sql = `
        SELECT 
        ${sqlLeaveAndRecord(data.month, data.userId)}
        CONCAT(h.HR_FNAME," ",h.HR_LNAME) as fullname,
        hrd.HR_DEPARTMENT_NAME,
        h.ID,
        h.FINGLE_ID        
        
        FROM hr_person h
        LEFT JOIN hr_department hrd ON h.HR_DEPARTMENT_ID = hrd.HR_DEPARTMENT_ID
        LEFT JOIN (
        SELECT	
            p_start.ID as START_PERSON_ID,
            IF(DAY(h_start.AccessDate) = '1',h_start.AccessTime,null) as 'ds1',IF(DAY(h_start.AccessDate) = '2',h_start.AccessTime,null) as 'ds2',IF(DAY(h_start.AccessDate) = '3',h_start.AccessTime,null) as 'ds3',IF(DAY(h_start.AccessDate) = '4',h_start.AccessTime,null) as 'ds4',IF(DAY(h_start.AccessDate) = '5',h_start.AccessTime,null) as 'ds5',IF(DAY(h_start.AccessDate) = '6',h_start.AccessTime,null) as 'ds6',IF(DAY(h_start.AccessDate) = '7',h_start.AccessTime,null) as 'ds7',IF(DAY(h_start.AccessDate) = '8',h_start.AccessTime,null) as 'ds8',IF(DAY(h_start.AccessDate) = '9',h_start.AccessTime,null) as 'ds9',IF(DAY(h_start.AccessDate) = '10',h_start.AccessTime,null) as 'ds10',IF(DAY(h_start.AccessDate) = '11',h_start.AccessTime,null) as 'ds11',IF(DAY(h_start.AccessDate) = '12',h_start.AccessTime,null) as 'ds12',IF(DAY(h_start.AccessDate) = '13',h_start.AccessTime,null) as 'ds13',IF(DAY(h_start.AccessDate) = '14',h_start.AccessTime,null) as 'ds14',IF(DAY(h_start.AccessDate) = '15',h_start.AccessTime,null) as 'ds15',IF(DAY(h_start.AccessDate) = '16',h_start.AccessTime,null) as 'ds16',IF(DAY(h_start.AccessDate) = '17',h_start.AccessTime,null) as 'ds17',IF(DAY(h_start.AccessDate) = '18',h_start.AccessTime,null) as 'ds18',IF(DAY(h_start.AccessDate) = '19',h_start.AccessTime,null) as 'ds19',IF(DAY(h_start.AccessDate) = '20',h_start.AccessTime,null) as 'ds20',IF(DAY(h_start.AccessDate) = '21',h_start.AccessTime,null) as 'ds21',IF(DAY(h_start.AccessDate) = '22',h_start.AccessTime,null) as 'ds22',IF(DAY(h_start.AccessDate) = '23',h_start.AccessTime,null) as 'ds23',IF(DAY(h_start.AccessDate) = '24',h_start.AccessTime,null) as 'ds24',IF(DAY(h_start.AccessDate) = '25',h_start.AccessTime,null) as 'ds25',IF(DAY(h_start.AccessDate) = '26',h_start.AccessTime,null) as 'ds26',IF(DAY(h_start.AccessDate) = '27',h_start.AccessTime,null) as 'ds27',IF(DAY(h_start.AccessDate) = '28',h_start.AccessTime,null) as 'ds28',IF(DAY(h_start.AccessDate) = '29',h_start.AccessTime,null) as 'ds29',IF(DAY(h_start.AccessDate) = '30',h_start.AccessTime,null) as 'ds30',IF(DAY(h_start.AccessDate) = '31',h_start.AccessTime,null) as 'ds31'
        FROM hr_person as p_start
        LEFT JOIN hikvision h_start ON  p_start.FINGLE_ID = h_start.employeeID
        WHERE 
            YEAR(h_start.AccessDate) = "${dayjs(data.month).format("YYYY")}"
            AND MONTH(h_start.AccessDate) = "${dayjs(data.month).format("MM")}"
            AND h_start.AccessTime <= '12:00:00'
            
        ) ss ON ss.START_PERSON_ID = h.ID
        LEFT JOIN (
        SELECT	
            p_end.ID as END_PERSON_ID,
            IF(DAY(h_end.AccessDate) = '1',h_end.AccessTime,null) as 'de1',IF(DAY(h_end.AccessDate) = '2',h_end.AccessTime,null) as 'de2',IF(DAY(h_end.AccessDate) = '3',h_end.AccessTime,null) as 'de3',IF(DAY(h_end.AccessDate) = '4',h_end.AccessTime,null) as 'de4',IF(DAY(h_end.AccessDate) = '5',h_end.AccessTime,null) as 'de5',IF(DAY(h_end.AccessDate) = '6',h_end.AccessTime,null) as 'de6',IF(DAY(h_end.AccessDate) = '7',h_end.AccessTime,null) as 'de7',IF(DAY(h_end.AccessDate) = '8',h_end.AccessTime,null) as 'de8',IF(DAY(h_end.AccessDate) = '9',h_end.AccessTime,null) as 'de9',IF(DAY(h_end.AccessDate) = '10',h_end.AccessTime,null) as 'de10',IF(DAY(h_end.AccessDate) = '11',h_end.AccessTime,null) as 'de11',IF(DAY(h_end.AccessDate) = '12',h_end.AccessTime,null) as 'de12',IF(DAY(h_end.AccessDate) = '13',h_end.AccessTime,null) as 'de13',IF(DAY(h_end.AccessDate) = '14',h_end.AccessTime,null) as 'de14',IF(DAY(h_end.AccessDate) = '15',h_end.AccessTime,null) as 'de15',IF(DAY(h_end.AccessDate) = '16',h_end.AccessTime,null) as 'de16',IF(DAY(h_end.AccessDate) = '17',h_end.AccessTime,null) as 'de17',IF(DAY(h_end.AccessDate) = '18',h_end.AccessTime,null) as 'de18',IF(DAY(h_end.AccessDate) = '19',h_end.AccessTime,null) as 'de19',IF(DAY(h_end.AccessDate) = '20',h_end.AccessTime,null) as 'de20',IF(DAY(h_end.AccessDate) = '21',h_end.AccessTime,null) as 'de21',IF(DAY(h_end.AccessDate) = '22',h_end.AccessTime,null) as 'de22',IF(DAY(h_end.AccessDate) = '23',h_end.AccessTime,null) as 'de23',IF(DAY(h_end.AccessDate) = '24',h_end.AccessTime,null) as 'de24',IF(DAY(h_end.AccessDate) = '25',h_end.AccessTime,null) as 'de25',IF(DAY(h_end.AccessDate) = '26',h_end.AccessTime,null) as 'de26',IF(DAY(h_end.AccessDate) = '27',h_end.AccessTime,null) as 'de27',IF(DAY(h_end.AccessDate) = '28',h_end.AccessTime,null) as 'de28',IF(DAY(h_end.AccessDate) = '29',h_end.AccessTime,null) as 'de29',IF(DAY(h_end.AccessDate) = '30',h_end.AccessTime,null) as 'de30',IF(DAY(h_end.AccessDate) = '31',h_end.AccessTime,null) as 'de31'
        FROM hr_person as p_end
        LEFT JOIN hikvision h_end ON  p_end.FINGLE_ID = h_end.employeeID
        WHERE 
            YEAR(h_end.AccessDate) = "${dayjs(data.month).format("YYYY")}"
            AND MONTH(h_end.AccessDate) = "${dayjs(data.month).format("MM")}"
            AND h_end.AccessTime >= '12:00:00'
            
        ) se ON se.END_PERSON_ID = h.ID   
        WHERE 
          CONCAT(h.HR_FNAME," ",h.HR_LNAME) LIKE "%${data.fullname}%" 
          ${
            data.department == "0"
              ? ""
              : `AND h.HR_DEPARTMENT_ID = "${data.department}"`
          }
          ${data.userId !== 0 ? `AND h.ID = ${data.userId}` : ""}
          #GROUP BY h.HR_CID`;

        const leave = await dbApp.raw(`
        SELECT 
          *
        FROM leave_register l
        WHERE 
          l.LEAVE_PERSON_ID = ${data.userId}	
          AND "${dayjs(data.month).format(
            "YYYY"
          )}" BETWEEN YEAR(l.LEAVE_DATE_BEGIN) AND YEAR(l.LEAVE_DATE_END)
          AND "${dayjs(data.month).format(
            "MM"
          )}" BETWEEN MONTH(l.LEAVE_DATE_BEGIN) AND MONTH(l.LEAVE_DATE_END)`);

        const record = await dbApp.raw(`
        SELECT 
          ri.HR_ID,
          DATE_FORMAT(ri.DATE_GO,'%Y-%m-%d') AS DATE_GO,
          DATE_FORMAT(ri.DATE_BACK,'%Y-%m-%d') AS DATE_BACK	
        FROM record_index ri
        WHERE 
          ri.HR_ID = ${data.userId}	
          AND "${dayjs(data.month).format(
            "YYYY"
          )}" BETWEEN YEAR(ri.DATE_GO) AND YEAR(ri.DATE_BACK)
          AND "${dayjs(data.month).format(
            "MM"
          )}" BETWEEN MONTH(ri.DATE_GO) AND MONTH(ri.DATE_BACK)`);
        const query = await dbApp.raw(sql);
        console.log(sqlLeaveAndRecord(data.month, data.userId));
        res.json({
          status: 200,
          results: query[0],
          msg: sql,
          leave: leave[0],
          record: record[0],
        });
      } catch (error: any) {
        res.json({ status: 500, results: error.message });
      }
    default:
      break;
  }
}
