import {
  AppstoreOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "../context";
import axios from "axios";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const Navbar = () => {
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const [current, setCurrent] = useState();
  const router = useRouter();

  const logout = async () => {
    const { data } = await axios.get("/api/logout");
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    toast(data.message);
    router.push("/login");
  };

  useEffect(() => {
    setCurrent(router.pathname);
  }, [router]);

  return (
    <>
      <Menu mode="horizontal" selectedKeys={[current]}>
        <Item
          onClick={(e) => setCurrent(e.key)}
          icon={<AppstoreOutlined />}
          key="/"
        >
          <Link href="/">Home</Link>
        </Item>
        {user === null && (
          <>
            <Item
              onClick={(e) => setCurrent(e.key)}
              icon={<LoginOutlined />}
              key="/login"
            >
              <Link href="/login">login</Link>
            </Item>
            <Item
              onClick={(e) => setCurrent(e.key)}
              icon={<UserAddOutlined />}
              key="/register"
            >
              <Link href="/register">register</Link>
            </Item>
          </>
        )}

        {user !== null && (
          <SubMenu
            icon={<LogoutOutlined />}
            title={user?.name}
            className="float-right ml-auto"
          >
            <ItemGroup>
              <Item onClick={(e) => setCurrent(e.key)} key="/user">
                <Link href="/user">Dashboard</Link>
              </Item>
              <Item onClick={logout} key="/logout">
                Logout
              </Item>
            </ItemGroup>
          </SubMenu>
        )}
      </Menu>
    </>
  );
};

export default Navbar;
