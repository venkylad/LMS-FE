import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const { Item } = Menu;

const Navbar = () => {
  const [current, setCurrent] = useState();
  const router = useRouter();

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
      </Menu>
    </>
  );
};

export default Navbar;
