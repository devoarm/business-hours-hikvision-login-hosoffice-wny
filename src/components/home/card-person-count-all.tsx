import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function CardPersonCountAll() {
  const [count, setCount] = useState(0);
  const router = useRouter();
  const fetchCount = async () => {
    const res = await axios.get(`/api/count-all-person`);
    if (res.data.status) {
      setCount(res.data.results.count);
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
      <p>เจ้าหน้าที่ทั้งหมด</p>
      <div className="flex items-center justify-center mt-2">
        <div className="bg-blue-500 p-2 rounded-md mr-4">
          <Icon icon="tabler:users-group" fontSize={30} color="white" />
        </div>
        <p className="text-center text-3xl mt-2">{count} คน</p>
      </div>
    </div>
  );
}

export default CardPersonCountAll;
