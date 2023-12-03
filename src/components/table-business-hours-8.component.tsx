import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { loopCol8 } from "@/helper/columnsTable8";
import dayjs from "dayjs";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  street: string;
  building: string;
  number: number;
  companyAddress: string;
  companyName: string;
  gender: string;
}

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: "John Brown",
    age: i + 1,
    street: "Lake Park",
    building: "C",
    number: 2035,
    companyAddress: "Lake Street 42",
    companyName: "SoftLake Co",
    gender: "M",
  });
}
type Props = {
  item: Array<any>;
  selectDate: string;
};
const Data8Custom = ({ item, selectDate }: Props) => {
  const [columns, setColumns] = useState<Array<any>>([]);
  useEffect(() => {
    const countDate = dayjs(selectDate).daysInMonth();
    setColumns([
      {
        title: "ชื่อ-นามสกุล",
        dataIndex: "fullname",
        key: "fullname",
        width: 100,
        fixed: "left",
      },
      {
        title: "กลุ่มงาน",
        dataIndex: "HR_DEPARTMENT_NAME",
        key: "HR_DEPARTMENT_NAME",
        width: 100,
        fixed: "left",
      },
      ...loopCol8(countDate),
    ]);
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={item}
      bordered
      size="middle"
      scroll={{ x: "calc(700px + 50%)", y: 240 }}
    />
  );
};

export default Data8Custom;
