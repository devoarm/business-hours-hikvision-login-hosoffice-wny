import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { Icon } from "@iconify/react";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";

import convertMenu from "@/helper/theme/JsonToMenuAntd";
import findPathToParentByKey from "@/helper/theme/FindParenMenuKey";
import { menu } from "@/navigator/assure/vertical";
import { useRouter } from "next/router";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

// const items: MenuItem[] = [
//   getItem("หน้าแรก", "1", <Icon icon="tabler:brand-google-home" />),
//   getItem("รายชื่อผู้ทำประกัน", "2", <Icon icon="tabler:clipboard-list" />),
//   getItem("Option 3", "3", <ContainerOutlined />),
//   getItem("Navigation One", "sub1", <MailOutlined />, [
//     getItem("Option 5", "5"),
//     getItem("Option 6", "6"),
//     getItem("Option 7", "7"),
//     getItem("Option 8", "8"),
//   ]),
//   getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
//     getItem("Option 9", "9"),
//     getItem("Option 10", "10"),

//     getItem("Submenu", "sub3", null, [
//       getItem("Option 11", "11"),
//       getItem("Option 12", "12"),
//     ]),
//   ]),
// ];

const AssureLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectKey, setSelectKey] = useState<Array<string>>([]);
  const [openKeys, setOpenKeys] = useState<Array<string>>([]);
  const [items, setItem] = useState<ItemType<MenuItemType>[] | undefined>([]);
  const router = useRouter();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    const convertedMenu = convertMenu(menu, router.pathname, router);
    setSelectKey(convertedMenu.selectKey);
    setItem(convertedMenu.menu);
    const parentKey = findPathToParentByKey(
      convertedMenu.menu,
      convertedMenu.selectKey[0],
      "key"
    );
    const parentLabel = findPathToParentByKey(
      convertedMenu.menu,
      convertedMenu.selectKey[0],
      "label"
    );

    setOpenKeys(parentKey);
  }, []);

  return (
    <div className="flex bg-slate-200 w-screen">
      <div className="h-screen bg-[#001529]">
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      <div className="w-screen">
        <div className="flex bg-white justify-between items-center h-14 px-5">
          <Button type="primary" onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Button>ออกจากระบบ</Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AssureLayout;
