import React, { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, message, theme } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ModalHilingTime from "@/views/business-hours/hilingTime/modalHilingTime";
import ModalWorkingTime from "@/views/business-hours/working-time/modalWorkingTime";
import Link from "next/link";
import AButton from "@/@core/components/AButton";

const { Header, Content, Footer, Sider } = Layout;

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalWorkingTime, setOpenModalWorkingTime] =
    useState<boolean>(false);
  const { data: session, status } = useSession();
  const [hideContent, setHideContent] = useState(false);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const items = [
    {
      key: 1,
      label: <Link href="/">หน้าแรก</Link>,
    },
    {
      key: 2,
      label: `ประเภทเวลาเข้างาน`,
      onclick: () => {},
      children: [
        {
          key: 21,
          label: (
            <div onClick={() => setOpenModalWorkingTime(true)}>
              ตั้งค่าเวลาเข้างานของคุณ
            </div>
          ),
        },
        {
          key: 22,
          label: (
            <Link href="/working-time/list-working-time">
              ตั้งค่าเวลาเข้างานของบุคลากร
            </Link>
          ),
        },
        {
          key: 23,
          label: (
            <Link href="/working-time/manage-working-time">
              จัดการเวลาทำงาน
            </Link>
          ),
        },
      ],
    },
    {
      key: 3,
      label: `ประเภทเวร`,
      onclick: () => {},
      children: [
        {
          key: 31,
          label: (
            <div onClick={() => setOpenModal(true)}>ตั้งค่าประเภทเวรของคุณ</div>
          ),
        },
        {
          key: 32,
          label: (
            <Link href="/list-no-hiling-time">ตั้งค่าประเภทเวรของบุคลากร</Link>
          ),
        },
      ],
    },
  ];

  return (
    <Layout>
      {contextHolder}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={250}
        onCollapse={(collapsed: boolean) => setHideContent(!collapsed)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex justify-between mx-2">
            <div></div>
            <div>
              <AButton onClick={() => signOut()} className="ml-2">
                ออกจากระบบ
              </AButton>
            </div>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          {!hideContent ? (
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </div>
          ) : null}
        </Content>
        {!hideContent ? (
          <Footer style={{ textAlign: "center" }}>
            ระบบสแกนนิ้วเข้าทำงาน ©2023 Created by Drcomp
          </Footer>
        ) : null}
      </Layout>
      <ModalHilingTime
        open={openModal}
        handleClose={() => setOpenModal(false)}
        handleSubmited={() => {
          messageApi.open({
            type: "success",
            content: "ตั้งค่าสำเร็จ",
          });
        }}
        currentHr={session}
      />
      <ModalWorkingTime
        open={openModalWorkingTime}
        handleClose={() => setOpenModalWorkingTime(false)}
        handleSubmited={() => {
          messageApi.open({
            type: "success",
            content: "ตั้งค่าสำเร็จ",
          });
        }}
        currentHr={session}
      />
    </Layout>
  );
};

export default AdminLayout;
