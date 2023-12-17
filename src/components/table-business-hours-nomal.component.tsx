import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
// import ColumnGroup from "antd/es/table/ColumnGroup";
import "dayjs/locale/th";
const { Column, ColumnGroup } = Table;

import dayjs from "dayjs";
import { isValidTimeFormat } from "@/helper/api/isValidDateFormat";

type Props = {
  item: Array<any>;
  selectDate: string;
};
export default function DataNomalCustom({ item, selectDate }: Props) {
  const date = `${Number(dayjs(selectDate).format("YYYY"))}-${dayjs(
    selectDate
  ).format("MM")}-01`;
  const lastDayOfCurrentMonth = dayjs(date).endOf("month");
  const momentDate = Number(lastDayOfCurrentMonth.format("D"));
  const [dateOfMonth, setDateOfMonth] = useState([]);
  const [screenWidth, setScreenWidth] = useState<number | undefined>();
  const sorter = (a: any, b: any) =>
    isNaN(a) && isNaN(b) ? (a || "").localeCompare(b || "") : a - b;
  const initFun = () => {
    const arrayCol: any = [];
    for (let index = 0; index < Number(momentDate); index++) {
      arrayCol.push({
        dataIndex: `d${index + 1}`,
        key: `d${index + 1}`,
        title: `${index + 1}`,
      });
    }
    setDateOfMonth(arrayCol);
  };
  useEffect(() => {
    initFun();
  }, []);

  return (
    <Table dataSource={item} rowKey="ID" scroll={{ x: "scroll" }} bordered>
      {screenWidth! < 700 ? (
        <Column
          title="ชื่อ-นามสกุล"
          dataIndex="fullname"
          key="ID"
          filterSearch={true}
        />
      ) : (
        <Column
          title="ชื่อ-นามสกุล"
          dataIndex="fullname"
          key="ID"
          fixed="left"
          width={screenWidth! < 400 ? 50 : 200}
          filterSearch={true}
          sorter={(a: any, b: any) => sorter(a.fullname, b.fullname)}
        />
      )}
      <Column
        title="กลุ่มงาน"
        dataIndex="HR_DEPARTMENT_NAME"
        key="ID"
        width={300}
        filterSearch={true}
        sorter={(a: any, b: any) =>
          sorter(a.HR_DEPARTMENT_NAME, b.HR_DEPARTMENT_NAME)
        }
      />
      <Column
        title="จำนวนวันเข้างาน"
        dataIndex="countStart"
        key="ID"
        width={200}
        filterSearch={true}
        sorter={(a: any, b: any) => sorter(a.countStart, b.countStart)}
      />
      <Column
        title="จำนวนวันออกงาน"
        dataIndex="countEnd"
        key="ID"
        width={200}
        filterSearch={true}
        sorter={(a: any, b: any) => sorter(a.countEnd, b.countEnd)}
      />
      {dateOfMonth.map((item: any, index: number) => (
        <ColumnGroup
          title={`${item.title} (${dayjs(`${selectDate}-${item.title}`)
            .locale("th")
            .format("dddd")})`}
          align="center"
          key={index}
        >
          <Column
            title="เข้า"
            dataIndex={`ds${item.title}`}
            key={`ds${item.title}`}
            width={120}
            render={(value: string, record: any) => (
              <>
                <Tag
                  color={
                    !isValidTimeFormat(value)
                      ? ""
                      : value > record.startTime &&
                        value <= record.startTimeLate &&
                        record.working_time_id
                      ? "orange"
                      : value > record.startTime && record.working_time_id
                      ? "red"
                      : record.working_time_id
                      ? "green"
                      : ""
                  }
                  key={record.ID}
                >
                  {value}
                </Tag>
              </>
            )}
          />
          <Column
            title="ออก"
            dataIndex={`de${item.title}`}
            key={`de${item.title}`}
            width={120}
            render={(value: string, record: any) => (
              <>
                <Tag
                  color={
                    !isValidTimeFormat(value)
                      ? ""
                      : value < record.endTime && record.working_time_id
                      ? "red"
                      : record.working_time_id
                      ? "green"
                      : ""
                  }
                  key={record.ID}
                >
                  {value}
                </Tag>
              </>
            )}
          />
        </ColumnGroup>
      ))}
    </Table>
  );
}
