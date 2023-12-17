import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { message } from "antd";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
type Props = {
  open: boolean;
  handleClose: () => void;
  currentHr: any;
  handleSubmited: Function;
};
function ModalWorkingTime({
  handleClose,
  open,
  currentHr,
  handleSubmited,
}: Props) {
  const [selectTemplate, setSelectTemplate] = useState<
    string | undefined | null
  >("");
  const [workingTime, setWorkingTime] = useState([]);
  const { data: session, status } = useSession();
  const handleChange = (event: SelectChangeEvent) => {
    setSelectTemplate(`${event.target.value}`);
  };

  const handleSubmit = async () => {
    const res = await axios.post("/api/working-time/hr-working-time", {
      hr_id: currentHr.ID,
      working_time_id: selectTemplate,
    });
    if (res.data.status == 200) {
      handleSubmited();
      handleClose();
    }
  };
  const fetchWorkingTime = async () => {
    const res = await axios.get(`/api/working-time`);
    if (res.data.status == 200) {
      setWorkingTime(res.data.results);
    }
  };
  const fetchWorkingTimeByPerson = async () => {
    const res = await axios.get(
      `/api/working-time/by-id-person/${session?.ID}`
    );
    if (res.data.status == 200) {
      setSelectTemplate(res.data.results.working_time_id);
    }
  };
  useEffect(() => {
    fetchWorkingTime();
  }, []);
  useEffect(() => {
    fetchWorkingTimeByPerson();
  }, [session?.ID]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        เลือกรูปแบบเวลาปฏิบัติงาน คุณ {currentHr?.HR_FNAME}{" "}
        {currentHr?.HR_LNAME}
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>เลือกรูปแบบเวลาปฏิบัติงาน</InputLabel>
          <Select
            value={selectTemplate!}
            label="เลือกรูปแบบเวลาปฏิบัติงาน"
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
  );
}

export default ModalWorkingTime;
