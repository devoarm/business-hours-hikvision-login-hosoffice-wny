import AButton from "@/@core/components/AButton";

import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { DatePicker, Input, Modal, Table, TimePicker, Typography } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { ColumnsType } from "antd/es/table";
import React, { ChangeEvent, useEffect, useState } from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios from "axios";
import TableFilter from "@/components/table/data-grid/TableFilter";
import { GridRenderCellParams, GridRowParams } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import AdminLayout from "@/@core/layout/AdminDashboard/layout";
dayjs.extend(customParseFormat);
type FormType = {
  id?: number;
  title: string;
  startTime: any;
  startTimeLate: any;
  endTime: any;
};
function ManageWorkingTime() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workingTime, setWorkingTime] = useState<FormType[]>([]);
  const [currentId, setCurrentId] = useState("");
  const [typeModal, setTypeModal] = useState<"create" | "update">("create");
  const [form, setForm] = useState<FormType>({
    title: "",
    startTime: dayjs("00:00:00", "HH:mm:ss"),
    startTimeLate: dayjs("00:00:00", "HH:mm:ss"),
    endTime: dayjs("00:00:00", "HH:mm:ss"),
  });
  const showModal = () => {
    setTypeModal("create");
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const res = await axios.post(`/api/working-time`, { ...form });
    if (res.data.status == 200) {
      setIsModalOpen(false);
      setCurrentId("");
      setForm({
        title: "",
        startTime: dayjs("00:00:00", "HH:mm:ss"),
        startTimeLate: dayjs("00:00:00", "HH:mm:ss"),
        endTime: dayjs("00:00:00", "HH:mm:ss"),
      });
      fetchWorkingTime();
    }
  };
  const handleUpdate = async () => {
    const res = await axios.put(`/api/working-time/by-id/${currentId}`, {
      ...form,
    });
    if (res.data.status == 200) {
      setCurrentId("");
      setIsModalOpen(false);
      setForm({
        title: "",
        startTime: dayjs("00:00:00", "HH:mm:ss"),
        startTimeLate: dayjs("00:00:00", "HH:mm:ss"),
        endTime: dayjs("00:00:00", "HH:mm:ss"),
      });
      fetchWorkingTime();
    }
  };
  const handleDel = async (id: string) => {
    Swal.fire({
      title: "คุณต้องการลบจริงหรือไม่?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then(async (result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await axios.delete(`/api/working-time/by-id/${id}`);
        if (res.data.status == 200) {
          setIsModalOpen(false);
          setCurrentId("");
          setForm({
            title: "",
            startTime: dayjs("00:00:00", "HH:mm:ss"),
            startTimeLate: dayjs("00:00:00", "HH:mm:ss"),
            endTime: dayjs("00:00:00", "HH:mm:ss"),
          });
          fetchWorkingTime();
        }
      }
    });
  };

  const fetchWorkingTime = async () => {
    const res = await axios.get(`/api/working-time`);
    if (res.data.status == 200) {
      setWorkingTime(res.data.results);
    }
  };
  useEffect(() => {
    fetchWorkingTime();
  }, []);

  const columns: ColumnsType<FormType> = [
    {
      title: "ชื่อประเภท",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "เวลาเข้างาน",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "เวลาเข้างานสาย",
      dataIndex: "startTimeLate",
      key: "startTimeLate",
    },
    {
      title: "เวลาออกงาน",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "action",
      key: "action",
      dataIndex: "action",
      render: (_, record) => (
        <div>
          <AButton
            onClick={() => {
              setTypeModal("update");
              setCurrentId(`${record.id}`);
              setIsModalOpen(true);
              setForm(record);
            }}
          >
            แก้ไข
          </AButton>
          <AButton
            className="ml-1 "
            color="warning"
            onClick={() => {
              handleDel(`${record.id}`);
              setCurrentId(`${record.id}`);
            }}
          >
            ลบ
          </AButton>
        </div>
      ),
    },
  ];

  const handleCancel = () => {
    setForm({
      title: "",
      startTime: dayjs("00:00:00", "HH:mm:ss"),
      startTimeLate: dayjs("00:00:00", "HH:mm:ss"),
      endTime: dayjs("00:00:00", "HH:mm:ss"),
    });
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="pt-5">
        <Card className="">
          <CardContent>
            <AButton onClick={showModal}>เพิ่มประเภทเวลา</AButton>
            <Box sx={{ mx: 5, mt: 3 }}>
              <Table columns={columns} dataSource={workingTime} />
            </Box>
          </CardContent>
        </Card>
      </div>
      <Modal
        title="เพิ่มประเภทเวลา"
        open={isModalOpen}
        onOk={typeModal == "create" ? handleOk : handleUpdate}
        onCancel={handleCancel}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>ชื่อประเภท</Typography>
            <Input
              value={form.title}
              placeholder="ชื่อประเภท"
              style={{ width: "100%" }}
              onChange={(e: any) => setForm({ ...form, title: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>เวลาเข้างาน</Typography>
            <TimePicker
              value={dayjs(form.startTime, "HH:mm:ss")}
              style={{ width: "100%" }}
              onChange={(time: Dayjs | null, timeString: string) => {
                setForm({ ...form, startTime: timeString });
              }}
              defaultValue={dayjs()}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography>เวลาเข้างานสาย</Typography>
            <TimePicker
              value={dayjs(form.startTimeLate, "HH:mm:ss")}
              style={{ width: "100%" }}
              onChange={(time: Dayjs | null, timeString: string) => {
                setForm({ ...form, startTimeLate: timeString });
              }}
              defaultValue={dayjs()}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>เวลาออกงาน</Typography>
            <TimePicker
              value={dayjs(form.endTime, "HH:mm:ss")}
              style={{ width: "100%" }}
              onChange={(time: Dayjs | null, timeString: string) => {
                setForm({ ...form, endTime: timeString });
              }}
              defaultValue={dayjs()}
            />
          </Grid>
        </Grid>
      </Modal>
    </AdminLayout>
  );
}

export default ManageWorkingTime;
