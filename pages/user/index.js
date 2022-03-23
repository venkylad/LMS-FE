import React, { useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../routes/UserRoute";

const User = () => {
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  return (
    <UserRoute>
      <div className="w-100 h-[200px] bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center items-center">
        <h2 className="text-6xl text-white">User</h2>
      </div>
    </UserRoute>
  );
};

export default User;
