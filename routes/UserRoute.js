import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";

const UserRoute = ({ children }) => {
  const router = useRouter();

  const [ok, setOk] = useState(false);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      // ok response will come from api
      if (data.ok) {
        setOk(true);
      }
    } catch (error) {
      setOk(false);
      router.push("/");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {ok ? (
        children
      ) : (
        <SyncOutlined className="flex items-center justify-center text-blue-600 text-7xl" />
      )}
    </>
  );
};

export default UserRoute;
