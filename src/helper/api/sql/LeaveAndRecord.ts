import dayjs from "dayjs";

export const sqlLeaveAndRecord = (date: string, personId: string) => {
  let sql = "";
  for (let index = 1; index <= dayjs(date).daysInMonth(); index++) {
    var dateIndex = `${index}`;
    if (index < 10) {
      dateIndex = `0${index}`;
    }
    sql += `IF((SELECT l.LEAVE_PERSON_ID FROM leave_register l WHERE l.LEAVE_PERSON_ID = ${personId} AND '${date}-${dateIndex}' BETWEEN l.LEAVE_DATE_BEGIN AND l.LEAVE_DATE_END AND l.LEAVE_CANCEL_STATUS = "FALSE" LIMIT 1),'ลา',if((SELECT ri.HR_ID FROM record_index ri WHERE ri.HR_ID = ${personId}	AND '${date}-${dateIndex}' BETWEEN ri.DATE_GO AND ri.DATE_BACK AND (ri.CANCEL_STATUS <> 'True' OR ri.CANCEL_STATUS IS NULL OR ri.CANCEL_STATUS = "") LIMIT 1),'ไปราชการ',ds${index})) AS ds${index},`;
    sql += `IF((SELECT l.LEAVE_PERSON_ID FROM leave_register l WHERE l.LEAVE_PERSON_ID = ${personId} AND '${date}-${dateIndex}' BETWEEN l.LEAVE_DATE_BEGIN AND l.LEAVE_DATE_END AND l.LEAVE_CANCEL_STATUS = "FALSE" LIMIT 1),'ลา',if((SELECT ri.HR_ID FROM record_index ri WHERE ri.HR_ID = ${personId}	AND '${date}-${dateIndex}' BETWEEN ri.DATE_GO AND ri.DATE_BACK AND (ri.CANCEL_STATUS <> 'True' OR ri.CANCEL_STATUS IS NULL OR ri.CANCEL_STATUS = "") LIMIT 1),'ไปราชการ',de${index})) AS de${index},`;
  }
  return sql;
};
