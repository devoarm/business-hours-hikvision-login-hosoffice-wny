import React, { useEffect } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useTranslation } from "react-i18next";
import { colors } from "@/config/theme/color";
import ButtonMenu from "@/components/button/button-menu";
import { useRouter } from "next/router";

const { Header, Content, Footer } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};
const AssureLineLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { t } = useTranslation();
  const router = useRouter();
  const { i18n } = useTranslation();
  const handleLangItemClick = (lang: "en" | "fr" | "th") => {
    window.localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
  };
  useEffect(() => {
    i18n.changeLanguage(window.localStorage.getItem("lang") || "en");
  }, []);

  const items: MenuProps["items"] = [
    {
      label: "ไทย",
      key: "0",
      icon: <img src="/images/language/thailand.png" width={20} />,
      onClick: () => handleLangItemClick("th"),
    },
    {
      label: "English",
      key: "1",
      icon: <img src="/images/language/united-kingdom.png" width={20} />,
      onClick: () => handleLangItemClick("en"),
    },
    {
      label: "France",
      key: "2",
      icon: <img src="/images/language/france.png" width={20} />,
      onClick: () => handleLangItemClick("fr"),
    },
  ];
  return (
    <Layout className="layout">
      <div className="flex justify-between items-center px-5 shadow-md h-14">
        <div>
          <ButtonMenu
            active={router.pathname == "/assure/line-liff" ? true : false}
            handleClick={() => router.push("/assure/line-liff")}
          >
            {t("Home")}
          </ButtonMenu>
          <ButtonMenu
            active={
              router.pathname == "/assure/line-liff/list-assure-me"
                ? true
                : false
            }
            handleClick={() => router.push("/assure/line-liff/list-assure-me")}
          >
            {t("My Assure list")}
          </ButtonMenu>
        </div>
        <div>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              {i18n.language == "th" ? (
                <div className="flex">
                  <img src="/images/language/thailand.png" width={20} />
                  <button className="ml-1">ไทย</button>
                </div>
              ) : i18n.language == "en" ? (
                <div className="flex">
                  <img src="/images/language/united-kingdom.png" width={20} />
                  <button className="ml-1">English</button>
                </div>
              ) : i18n.language == "fr" ? (
                <div className="flex">
                  <img src="/images/language/france.png" width={20} />
                  <button className="ml-1">France</button>
                </div>
              ) : null}
            </a>
          </Dropdown>
        </div>
      </div>

      <Content style={{ padding: "0 50px" }}>
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default AssureLineLayout;
