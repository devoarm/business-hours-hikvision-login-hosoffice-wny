import AButton from "@/@core/components/AButton";
import Icon from "@/@core/components/icon";
import ModalHilingTime from "@/views/business-hours/hilingTime/modalHilingTime";
import { message } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Navbar() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleLogout = () => {
    signOut();
  };
  useEffect(() => {
    if (session?.ID) {
      session?.role.filter((item: any) => item == "DRCOMP_FINGER").length! > 0
        ? setIsAdmin(true)
        : setIsAdmin(false);
    }
  }, [session?.ID]);
  return (
    <div className="flex justify-between items-center bg-white shadow-md p-3 rounded-md">
      {contextHolder}
      <div>
        <AButton
          color="grey1"
          onClick={() => router.push("/")}
          className="mr-5"
        >
          <div className="flex items-center">
            <Icon icon="tabler:home" className="mr-1" />
            <p>หน้าแรก</p>
          </div>
        </AButton>
        คุณ {session?.HR_FNAME} {session?.HR_LNAME} (
        {session?.role.filter((item: any) => item == "DRCOMP_FINGER").length! >
        0
          ? "ผู้ดูแลระบบ"
          : "เจ้าหน้าที่"}
        )
      </div>
      <div>
        <AButton
          onClick={() => {
            setOpenModal(true);
          }}
          className="mr-3"
          color="grey1"
        >
          ตั้งค่าเวรของคุณ
        </AButton>
        {isAdmin ? (
          <AButton
            className="mr-3"
            color="secondary"
            onClick={() => {
              router.push("/list-no-hiling-time");
            }}
          >
            ตั้งค่าเวรบุคลากร
          </AButton>
        ) : null}

        <AButton onClick={() => handleLogout()}>ออกจากระบบ</AButton>
      </div>
      <ModalHilingTime
        open={openModal}
        handleClose={() => setOpenModal(false)}
        handleSubmited={() => {
          messageApi.open({
            type: "success",
            content: "ตั้งค่าสำเร็จ",
          });
        }}
        currentHr={session}
      />
    </div>
  );
}

export default Navbar;
