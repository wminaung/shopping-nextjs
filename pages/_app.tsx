import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import ShopperContextProvider from "@/src/context/ShopperContextProvider";
import { Provider } from "react-redux";
import { store } from "@/src/store";
import { Session } from "next-auth";
import { useEffect } from "react";
import { fetchAdminData } from "@/src/store/slices/adminSlice";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/src/utils/theme";
import { CssBaseline } from "@mui/material";

type CustomeAppProps = AppProps & { session: Session };

export default function App({
  Component,
  pageProps,
  session,
}: CustomeAppProps) {
  useEffect(() => {
    store.dispatch(fetchAdminData());
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}
/*
     <ShopperContextProvider>
            <Component {...pageProps} />
          </ShopperContextProvider>
*/
