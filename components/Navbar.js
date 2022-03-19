import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import React from "react";

const { Item } = Menu;

const Navbar = () => {
  return (
    <>
      <Menu mode="horizontal">
        <Item icon={<AppstoreOutlined />}>
          <Link href="/">Home</Link>
        </Item>
        <Item icon={<LoginOutlined />}>
          <Link href="login">login</Link>
        </Item>
        <Item icon={<UserAddOutlined />}>
          <Link href="/register">register</Link>
        </Item>
      </Menu>
    </>
  );
};

export default Navbar;
