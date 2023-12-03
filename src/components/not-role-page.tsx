import AButton from "@/@core/components/AButton";
import { useRouter } from "next/router";
import React from "react";

function NotRolePage() {
    const router = useRouter()
  return (
    <div className="flex justify-center items-center bg-blue-100 min-h-screen">
      <div className="flex flex-col justify-center">
        <p className="text-2xl mb-1 text-center">คุณไม่มีสิทธิเข้าใช้งานหน้านี้ !!</p>
        <p className="text-1xl mb-5 text-center">
          (หากต้องการเข้าใช้งาน กรุณาติดต่อผู้ดูแลระบบ)
        </p>
        <AButton color="secondary" onClick={()=>router.push('/home')}>กลับหน้าหลัก</AButton>
      </div>
    </div>
  );
}

export default NotRolePage;
