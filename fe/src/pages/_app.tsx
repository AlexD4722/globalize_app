import "../styles/global.scss";
import "react-day-picker/dist/style.css";

import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import queryClient from "@/services/react_query/QueryClient/queryClient";
import { ReactElement, ReactNode, useEffect } from "react";
import { NextPage } from "next";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div>
      <ReactNotifications />
      <div id="modal-root" className="overflow-hidden"></div>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </div>
  );
}
