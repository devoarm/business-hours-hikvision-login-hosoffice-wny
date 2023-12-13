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
import React, { useState } from "react";
type Props = {
  open: boolean;
  handleClose: () => void;
  currentHr: any;
  handleSubmited: Function;
};
function ModalHilingTime({
  handleClose,
  open,
  currentHr,
  handleSubmited,
}: Props) {
  const [selectTemplate, setSelectTemplate] = useState<
    string | undefined | null
  >("");
  
  const handleChange = (event: SelectChangeEvent) => {
    setSelectTemplate(`${event.target.value}`);
  };
  const handleSubmit = async () => {
    const res = await axios.post("/api/add-person-hiling-time", {
      HR_PERSON_ID: currentHr.ID,
      TEMPLATE_ID: selectTemplate,
    });
    if (res.data.status == 200) {     
      handleSubmited();
      handleClose();
    }
  };
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
        เลือกรูปแบบเวร คุณ {currentHr?.HR_FNAME} {currentHr?.HR_LNAME}
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
  );
}

export default ModalHilingTime;
