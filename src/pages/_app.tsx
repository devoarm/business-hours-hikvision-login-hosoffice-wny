import "@/styles/globals.css";
import React from "react";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
const App = ({ Component, pageProps }: AppProps) => (
  <SessionProvider session={pageProps.session}>
    <ConfigProvider>
      <Component {...pageProps} />
    </ConfigProvider>
  </SessionProvider>
);

export default App;
