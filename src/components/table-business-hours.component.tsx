import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
import dayjs from "dayjs";

type Props = {
  item: Array<any>;
};
const DataNomalCustom = ({ item }: Props) => {
  const date = `${Number(2023)}-${dayjs().format("MM")}-01`;
  const lastDayOfCurrentMonth = dayjs(date).endOf("month");
  const momentDate = Number(lastDayOfCurrentMonth.format("D"));
  const [dateOfMonth, setDateOfMonth] = useState([]);
  const [screenWidth, setScreenWidth] = useState<number | undefined>();
  const sorter = (a: any, b: any) =>
    isNaN(a) && isNaN(b) ? (a || "").localeCompare(b || "") : a - b;

  useEffect(() => {
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

      {dateOfMonth.map((item: any, index: number) => (
        <ColumnGroup title={item.title} align="center" key={index}>
          <Column
            title="เข้า"
            dataIndex={`ds${item.title}`}
            key={`ds${item.title}`}
            width={100}
          />
          <Column
            title="ออก"
            dataIndex={`de${item.title}`}
            key={`de${item.title}`}
            width={100}
          />
        </ColumnGroup>
      ))}
    </Table>
  );
};

export default DataNomalCustom;