import { signOut, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import React, { ChangeEvent, useEffect, useState } from "react";
import "dayjs/locale/th";
import dayjs from "dayjs";
import axios from "axios";
import { DatePicker, DatePickerProps, Input, Select, Spin } from "antd";
import DataNomalCustom from "@/components/table-business-hours-nomal.component";
import { DepartmentType } from "@/types/department.type";
import AButton from "@/@core/components/AButton";
import * as XLSX from "xlsx";
import { useRouter } from "next/router";
import Navbar from "@/@core/layout/navbar/business-hours";

export default function Home() {
  const [businessHours, setBusinessHours] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const [hrPerson, setHrPerson] = useState([]);
  const fetchPerson = async () => {
    const res = await axios.get(`/api/hr-person`);
    if (res.data.status == 200) {
      setHrPerson(res.data.results);
    }
  };

  useEffect(() => {
    fetchPerson();
  }, []);
  return (
    <div className="p-3 bg-blue-100 min-h-screen">
      <Navbar />
      <div className="pt-5">
        <div className="flex justify-center mb-5 "></div>
      </div>
    </div>
  );
}
