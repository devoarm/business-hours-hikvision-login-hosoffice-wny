import { signOut, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import React, { ChangeEvent, useEffect, useState } from "react";
import "dayjs/locale/th";
import dayjs from "dayjs";
import axios from "axios";
import { Button, Tabs } from "antd";
import {
  Col,
  DatePicker,
  DatePickerProps,
  Input,
  Row,
  Select,
  Spin,
} from "antd";
import DataNomalCustom from "@/components/table-business-hours-nomal.component";
import { DepartmentType } from "@/types/department.type";
import AButton from "@/@core/components/AButton";
import * as XLSX from "xlsx";
import { useRouter } from "next/router";
import CardPersonNotHiling from "@/components/home/card-person-not-hiling";
import CardPersonHiling from "@/components/home/card-person-hiling";
import CardPersonCountAll from "@/components/home/card-person-count-all";
import Data8Custom from "@/components/table-business-hours-8.component";
import { Icon } from "@iconify/react/dist/iconify.js";
import Navbar from "@/@core/layout/navbar/business-hours";

export default function Home() {
  const [businessHours, setBusinessHours] = useState([]);
  const [hilingTimeType, setHilingTimeType] = useState<"nomal" | "8">("nomal");
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();
  const [fullname, setFullname] = useState("");
  const [selectMount, setSelectMount] = useState(dayjs().format("YYYY-MM"));
  const [departments, setDepartments] = useState<any>([]);
  const [selectDepart, setSelectDepart] = useState("0");
  const router = useRouter();
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setSelectMount(dateString);
  };
  const fetchData = async (
    month: string,
    fullname: string,
    department: string,
    hilingTimeType: string
  ) => {
    setBusinessHours([]);
    setLoading(true);
    const res = await axios.post(
      `/api/${hilingTimeType == "nomal" ? "all" : "auth-hiling-time-8"}`,
      {
        month: month,
        fullname: fullname,
        department: department,
        hilingTimeType: hilingTimeType,
        userId:
          session?.role.filter((item: any) => item == "DRCOMP_FINGER").length! >
          0
            ? 0
            : session?.ID,
      }
    );
    if (res.data.status == 200) {
      setBusinessHours(res.data.results);
      setLoading(false);
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
  };
  useEffect(() => {
    fetchDepart();
    const dayInmonth = [];
    for (let index = 0; index < dayjs().daysInMonth(); index++) {
      dayInmonth.push(dayjs(`2023-12-${index + 1}`).format("dddd"));
    }
  }, []);
  useEffect(() => {
    if (session?.ID) {
      fetchData(selectMount, fullname, selectDepart, hilingTimeType);
    }
  }, [session?.ID]);

  const onChangeDepartMent = (value: string) => {
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
      arrayRow1.push(
        `${index + 1} (${dayjs(`${selectMount}-${index + 1}`)
          .locale("th")
          .format("dddd")})`
      );
      arrayRow1.push(``);
      arrayRow2.push(`เข้า`);
      arrayRow2.push(`ออก`);
    }

    const mapData = businessHours.map((item: any) => {
      const arrayData = [];
      for (let index = 0; index < momentDate; index++) {
        arrayData.push(item?.[`ds${index + 1}`]);
        arrayData.push(item?.[`de${index + 1}`]);
      }
      return [item.fullname, item.HR_DEPARTMENT_NAME, ...arrayData];
    });
    // return;
    const data = [arrayRow1, arrayRow2, ...mapData];
    // Create a worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);
    // Merge columns
    ws["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } }, // Merge columns C and D for the first two rows
      { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } }, // Merge cells in the second column (B) for the first and second rows (1 and 2)
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // Save the workbook as an Excel file
    XLSX.writeFile(wb, "exportedDataWithMultipleMergedColumns.xlsx");
  };
  const handleExport8 = () => {
    const arrayRow1 = ["ชื่อ-นามสกุล", "กลุ่มงาน"];
    const arrayRow2 = ["", ""];
    const arrayRow3 = ["", ""];
    const date = `${Number(dayjs(selectMount).format("YYYY"))}-${dayjs(
      selectMount
    ).format("MM")}-01`;
    const lastDayOfCurrentMonth = dayjs(date).endOf("month");
    const momentDate = Number(lastDayOfCurrentMonth.format("D"));
    for (let index = 0; index < momentDate; index++) {
      arrayRow1.push(
        `${index + 1} (${dayjs(`${selectMount}-${index + 1}`)
          .locale("th")
          .format("dddd")})`
      );
      arrayRow1.push(``);
      arrayRow1.push(``);
      arrayRow1.push(``);
      arrayRow1.push(``);
      arrayRow1.push(``);
      arrayRow2.push(`เช้า`);
      arrayRow2.push(``);
      arrayRow2.push(`บ่าย`);
      arrayRow2.push(``);
      arrayRow2.push(`ดึก`);
      arrayRow2.push(``);
      arrayRow3.push(`เข้า`);
      arrayRow3.push(`ออก`);
    }
    const mapData = businessHours.map((item: any) => {
      const arrayData = [];
      for (let index = 0; index < momentDate; index++) {
        arrayData.push(item?.[`mIn${index + 1}`]);
        arrayData.push(item?.[`mOut${index + 1}`]);
        arrayData.push(item?.[`aIn${index + 1}`]);
        arrayData.push(item?.[`aOut${index + 1}`]);
        arrayData.push(item?.[`nIn${index + 1}`]);
        arrayData.push(item?.[`nOut${index + 1}`]);
      }
      return [item.fullname, item.HR_DEPARTMENT_NAME, ...arrayData];
    });
    // return;
    const data = [arrayRow1, arrayRow2, arrayRow3, ...mapData];
    // Create a worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);
    // Merge columns
    ws["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 2, c: 0 } }, // Merge columns C and D for the first two rows
      { s: { r: 0, c: 1 }, e: { r: 2, c: 1 } }, // Merge cells in the second column (B) for the first and second rows (1 and 2)
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // Save the workbook as an Excel file
    XLSX.writeFile(wb, "exportedDataWithMultipleMergedColumns.xlsx");
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <div className="p-3 bg-blue-100 min-h-screen">
      <Navbar />
      <div>
        <Row className="mb-5">
          <Col xs={8} className="p-2">
            <CardPersonNotHiling />
          </Col>
          <Col xs={8} className="p-2">
            <CardPersonHiling />
          </Col>
          <Col xs={8} className="p-2">
            <CardPersonCountAll />
          </Col>
        </Row>

        <div className="flex justify-center mb-5 ">
          <Input
            placeholder="ค้นหาชื่อ"
            disabled={
              session?.role.filter((item: any) => item == "DRCOMP_FINGER")
                .length! > 0
                ? false
                : true
            }
            onChange={handleInputChange}
          />

          <DatePicker
            onChange={onChange}
            defaultValue={dayjs()}
            picker="month"
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
            disabled={
              session?.role.filter((item: any) => item == "DRCOMP_FINGER")
                .length! > 0
                ? false
                : true
            }
          />
          <AButton
            className="ml-3"
            onClick={() => {
              fetchData(selectMount, fullname, selectDepart, hilingTimeType);
            }}
          >
            ค้นหา
          </AButton>
          <AButton
            className="ml-3"
            onClick={() => {
              hilingTimeType == "nomal" ? handleExport() : handleExport8();
            }}
            color="success"
          >
            Export
          </AButton>
        </div>
        <div className="flex justify-center mb-3">
          <AButton
            className="mx-1"
            color={hilingTimeType == "nomal" ? "secondary" : "grey1"}
            onClick={() => {
              setHilingTimeType("nomal");
              fetchData(selectMount, fullname, selectDepart, "nomal");
            }}
          >
            เวลาปฏิบัติงานปกติ
          </AButton>
          <AButton
            className="mx-1"
            color={hilingTimeType == "8" ? "secondary" : "grey1"}
            onClick={() => {
              setHilingTimeType("8");
              fetchData(selectMount, fullname, selectDepart, "8");
            }}
          >
            เวร 8 ชั่วโมง
          </AButton>
        </div>
        {loading ? (
          <div className="mt-[150px]">
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </div>
        ) : hilingTimeType == "nomal" ? (
          <DataNomalCustom item={businessHours} selectDate={selectMount} />
        ) : (
          <Data8Custom item={businessHours} selectDate={selectMount} />
        )}
      </div>
    </div>
  );
}
