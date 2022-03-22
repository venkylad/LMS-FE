import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../context";

const User = () => {
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const [hidden, setHidden] = useState(true);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      console.log(data);
      setHidden(false);
    } catch (error) {
      console.log(error);
      setHidden(true);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {!hidden && (
        <div className="w-100 h-[200px] bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center items-center">
          <h2 className="text-6xl text-white">User</h2>
        </div>
      )}
    </div>
  );
};

export default User;
