import { signOut, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import React, { ChangeEvent, useEffect, useState } from "react";
import "dayjs/locale/th";
import dayjs from "dayjs";
import axios from "axios";
import { DatePicker, DatePickerProps, Input, Spin, Table } from "antd";
import DataNomalCustom from "@/components/table-business-hours-nomal.component";
import { DepartmentType } from "@/types/department.type";
import AButton from "@/@core/components/AButton";
import * as XLSX from "xlsx";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { GridRowParams } from "@mui/x-data-grid";
import TableFilter from "@/components/table/data-grid/TableFilter";
import NotRolePage from "@/components/not-role-page";

import AdminLayout from "@/@core/layout/AdminDashboard/layout";

export default function Home() {
  const [currentHr, setCurrentHr] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const [hrPerson, setHrPerson] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [workingTime, setWorkingTime] = useState([]);
  const [noRole, setNoRole] = useState(false);
  const [selectTemplate, setSelectTemplate] = useState<
    string | undefined | null
  >("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectTemplate(`${event.target.value}`);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fetchHr = async () => {
    const res = await axios.get(`/api/working-time/hr-working-time`);
    if (res.data.status) {
      setHrPerson(res.data.results);
    }
  };
  useEffect(() => {
    fetchWorkingTime();
    fetchHr();
  }, []);

  useEffect(() => {
    if (
      session?.role.filter((item: any) => item == "DRCOMP_FINGER").length! > 0
    ) {
      setNoRole(false);
    } else {
      setNoRole(true);
    }
  }, [session?.ID]);
  const fetchWorkingTime = async () => {
    const res = await axios.get(`/api/working-time`);
    if (res.data.status == 200) {
      setWorkingTime(res.data.results);
    }
  };
  const handleLogout = () => {
    signOut();
  };
  const handleSubmit = async () => {
    const res = await axios.post("/api/working-time/hr-working-time", {
      hr_id: currentHr.ID,
      working_time_id: selectTemplate,
    });
    if (res.data.status == 200) {
      setCurrentHr(null);
      handleClose();
      fetchHr();
    }
  };
  const columns = [
    {
      flex: 1,
      field: "fullname",
      headerName: "ชื่อ-นามสกุล",
    },
    {
      flex: 1,
      field: "title",
      headerName: "ประเภทเวลาปฏิบัติงาน",
    },
  ];
  if (noRole) {
    return <NotRolePage />;
  }
  return (
    <AdminLayout>
      <Box sx={{ mx: 5, mt: 3, backgroundColor: "white" }}>
        <TableFilter
          columns={columns}
          item={hrPerson}
          rowId="ID"
          onClickRow={(e: GridRowParams) => {
            setCurrentHr(e.row);
            setSelectTemplate(e.row.working_time_id);
            handleClickOpen();
          }}
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          เลือกรูปแบบเวลาเข้าเวร คุณ {currentHr?.fullname!}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>เลือกรูปแบบเวร</InputLabel>
            <Select
              value={selectTemplate!}
              label="เลือกรูปแบบเวร"
              onChange={handleChange}
            >
              {workingTime.map((item: any) => (
                <MenuItem value={item.id}>{item.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ปิด</Button>
          <Button onClick={handleSubmit} autoFocus>
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
