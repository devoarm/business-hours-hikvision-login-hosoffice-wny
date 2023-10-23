import Image from "next/image";
import { Inter } from "next/font/google";
import React, { ChangeEvent, useEffect, useState } from "react";

import locale from "antd/es/date-picker/locale/th_TH";

import "dayjs/locale/th";

import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import axios from "axios";
import { DatePicker, DatePickerProps, Input, Select } from "antd";
import DataNomalCustom from "@/components/table-business-hours.component";
import { DepartmentType } from "@/types/department.type";
import AButton from "@/@core/components/AButton";
import * as XLSX from "xlsx";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [businessHours, setBusinessHours] = useState([]);
  const [fullname, setFullname] = useState("");
  const [selectMount, setSelectMount] = useState(dayjs().format("YYYY-MM"));
  const [departments, setDepartments] = useState<any>([]);
  const [selectDepart, setSelectDepart] = useState("0");
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setSelectMount(dateString);
    fetchData(dateString, fullname, selectDepart);
  };
  const fetchData = async (
    month: string,
    fullname: string,
    department: string
  ) => {
    setBusinessHours([]);
    const res = await axios.post(`/api/all`, {
      month: month,
      fullname: fullname,
      department: department,
    });
    if (res.data.status == 200) {
      setBusinessHours(res.data.results);
    }
  };
  const fetchDepart = async () => {
    const arrayDepart = [{ value: "0", label: "ทั้งหมด" }];
    const res = await axios.get(`/api/department`);
    if (res.data.status == 200) {
      const mapRes = res.data.results.map((item: DepartmentType) => {
        return {
          value: item.HR_DEPARTMENT_ID,
          label: item.HR_DEPARTMENT_NAME,
        };
      });
      arrayDepart.push(...mapRes);
      setDepartments(arrayDepart);
    }
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFullname(newValue);
    fetchData(selectMount, newValue, selectDepart);
  };
  useEffect(() => {
    fetchData(selectMount, fullname, selectDepart);
    fetchDepart();
  }, []);

  const onChangeDepartMent = (value: string) => {
    fetchData(selectMount, fullname, value);
    setSelectDepart(value);
  };

  const handleExport = () => {
    const arrayRow1 = ["ชื่อ-นามสกุล", "กลุ่มงาน"];
    const arrayRow2 = ["", ""];

    const date = `${Number(dayjs(selectMount).format("YYYY"))}-${dayjs(
      selectMount
    ).format("MM")}-01`;
    const lastDayOfCurrentMonth = dayjs(date).endOf("month");
    const momentDate = Number(lastDayOfCurrentMonth.format("D"));
    for (let index = 0; index < momentDate; index++) {
      arrayRow1.push(`${index + 1}`);
      arrayRow1.push(``);
      arrayRow2.push(`เช้า`);
      arrayRow2.push(`บ่าย`);
    }

    const mapData = businessHours.map((item: any) => {
      const arrayData = [];
      for (let index = 0; index < momentDate; index++) {
        arrayData.push(item?.[`ds${index + 1}`]);
        arrayData.push(item?.[`de${index + 1}`]);
      }
      return [item.fullname, item.HR_DEPARTMENT_NAME, ...arrayData];
    });
    console.log(mapData);
    // return;
    const data = [
      arrayRow1,
      arrayRow2,
      ...mapData
    ];

    // Create a worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Merge columns
    ws["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } }, // Merge columns C and D for the first two rows
      { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } }, // Merge cells in the second column (B) for the first and second rows (1 and 2)
    ];

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, "exportedDataWithMultipleMergedColumns.xlsx");
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <div className="p-3 bg-blue-100 min-h-screen pt-20">
      <div className="flex justify-center mb-5 ">
        <Input
          placeholder="ค้นหาชื่อ"
          className="mx-5"
          onChange={handleInputChange}
        />

        <DatePicker
          onChange={onChange}
          defaultValue={dayjs()}
          picker="month"
          // locale={locale}
          style={{ width: 300 }}
        />
      </div>
      <div className="flex justify-center mb-5 ">
        <Select
          showSearch
          value={selectDepart}
          className="w-screen"
          placeholder="เลือกกลุ่มงาน"
          optionFilterProp="children"
          onChange={onChangeDepartMent}
          filterOption={filterOption}
          options={departments}
        />
        <AButton className="ml-3" onClick={handleExport}>
          Export
        </AButton>
      </div>
      <DataNomalCustom item={businessHours} selectDate={selectMount}/>
    </div>
  );
}


