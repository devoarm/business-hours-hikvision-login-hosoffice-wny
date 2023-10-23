import React, { useEffect, useState } from "react";
import { Table } from "antd";
// import ColumnGroup from "antd/es/table/ColumnGroup";

const { Column, ColumnGroup } = Table;

import dayjs from "dayjs";

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
      const inputDate = `${Number(2023) - 543}-${dayjs(10, "M").format("MM")}-${
        index + 1
      }`;
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
      {dateOfMonth.map((item: any, index: number) => (
        <ColumnGroup title={item.title} align="center" key={index}>
          <Column
            title="เข้า"
            dataIndex={`ds${item.title}`}
            key={`ds${item.title}`}
            width={120}
          />
          <Column
            title="ออก"
            dataIndex={`de${item.title}`}
            key={`de${item.title}`}
            width={120}
          />
        </ColumnGroup>
      ))}
    </Table>
  );
}
