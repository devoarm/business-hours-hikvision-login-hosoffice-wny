import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function index() {
  const { data: session, status } = useSession();
  const route = useRouter();
  const checkLogin = () => {
    if (status === "authenticated") {
      return route.push("/home");
    } else {
      return route.push("/auth/login");
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);

  return <div></div>;
}

export default index;
