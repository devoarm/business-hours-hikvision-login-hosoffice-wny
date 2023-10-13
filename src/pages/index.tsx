import Image from "next/image";
import { Inter } from "next/font/google";
import React, { ChangeEvent, useEffect, useState } from "react";

import locale from "antd/es/date-picker/locale/th_TH";

import "dayjs/locale/th";

import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import axios from "axios";
import { DatePicker, DatePickerProps, Input } from "antd";
import DataNomalCustom from "@/components/table-business-hours.component";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [businessHours, setBusinessHours] = useState([]);
  const [columns, setColumns] = useState<ColumnsType>([]);
  const [fullname, setFullname] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [selectMount, setSelectMount] = useState(dayjs().format("YYYY-MM"));
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setSelectMount(dateString);
    fetchData(dateString, fullname);
  };
  const fetchData = async (month: string, fullname: string) => {
    const res = await axios.post(`/api/all`, {
      month: month,
      fullname: fullname,
    });
    if (res.data.status == 200) {
      setBusinessHours(res.data.results);
    }
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFullname(newValue);
    fetchData(selectMount, newValue);
  };
  useEffect(() => {
    fetchData(selectMount, fullname);
  }, []);
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
      <DataNomalCustom item={businessHours} />
    </div>
  );
}
