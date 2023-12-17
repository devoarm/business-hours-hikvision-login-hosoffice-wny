import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function CardPersonNotHiling() {
  const [count, setCount] = useState(0);
  const router = useRouter();
  const fetchCount = async () => {
    const res = await axios.get(`/api/person-not-hiling`);
    if (res.data.status) {
      setCount(res.data.results.length);
    }
  };
  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div
      className="mt-5 bg-white p-5 shadow-md rounded-md"
      onClick={() => {
        router.push("/list-no-hiling-time");
      }}
    >
      <p>คนที่ยังไม่ตั้งค่าเวร</p>
      <div className="flex items-center justify-center mt-2">
        <div className="bg-red-500 p-2 rounded-md mr-4">
          <Icon icon="tabler:circle-off" fontSize={30} color="white" />
        </div>
        <p className="text-center text-3xl mt-2">{count} คน</p>
      </div>
    </div>
  );
}

export default CardPersonNotHiling;
