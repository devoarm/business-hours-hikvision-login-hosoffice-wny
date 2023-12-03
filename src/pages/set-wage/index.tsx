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

  const handleLogout = () => {
    signOut();
  };


  return (
    <div className="p-3 bg-blue-100 min-h-screen">
      <div className="flex justify-between items-center bg-white shadow-md p-3 rounded-md">
        <div>
          คุณ {session?.HR_FNAME} {session?.HR_LNAME} (
          {session?.role.filter((item: any) => item == "DRCOMP_FINGER")
            .length! > 0
            ? "ผู้ดูแลระบบ"
            : "เจ้าหน้าที่"}
          )
        </div>
        <div>
          <AButton onClick={() => handleLogout()}>ออกจากระบบ</AButton>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex justify-center mb-5 "></div>
      </div>
    </div>
  );
}
