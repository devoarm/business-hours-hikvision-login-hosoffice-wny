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
import TableFilter from "@/components/table/data-grid/TableFilter";
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

export default function Home() {
  const [currentHr, setCurrentHr] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const [hrPerson, setHrPerson] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectTemplate, setSelectTemplate] = useState<
    string | undefined | null
  >("");
  const router = useRouter();
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
    const res = await axios.get(`/api/list-person-hiling-time`);
    if (res.data.status) {
      setHrPerson(res.data.results);
    }
  };
  useEffect(() => {
    fetchHr();
  }, []);

  const handleLogout = () => {
    signOut();
  };
  const handleSubmit = async () => {
    const res = await axios.post("/api/add-person-hiling-time", {
      HR_PERSON_ID: currentHr.ID,
      TEMPLATE_ID: selectTemplate,
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
      field: "HILING_TIME_NAME",
      headerName: "ประเภทเวร",
    },
  ];
  return (
    <div className="p-3 bg-blue-100 min-h-screen pb-5">
      <div className="flex justify-between items-center bg-white shadow-md p-3 rounded-md">
        <div>
          <AButton color="grey1" onClick={() => router.push("/")} className="mr-5">
            หน้าแรก
          </AButton>
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
      <Box sx={{ mx: 5, mt: 3, backgroundColor: "white" }}>
        <TableFilter
          columns={columns}
          itemsProp={hrPerson}
          rowId="ID"
          onClickRow={(e: GridRowParams) => {
            setCurrentHr(e.row);
            setSelectTemplate(e.row.TEMPLATE_ID);
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
          เลือกรูปแบบเวร คุณ {currentHr?.fullname!}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>เลือกรูปแบบเวร</InputLabel>
            <Select
              value={selectTemplate!}
              label="เลือกรูปแบบเวร"
              onChange={handleChange}
            >
              <MenuItem value={"1"}>เวรปกติ</MenuItem>
              <MenuItem value={"2"}>เวร 8 ชั่วโมง</MenuItem>
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
    </div>
  );
}
