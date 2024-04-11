import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/src/store";
import { Session } from "next-auth";
import { useEffect, useMemo, useState } from "react";
import { fetchAdminData } from "@/src/store/slices/adminSlice";
import { ThemeProvider } from "@emotion/react";
import { getDesignTokens, theme } from "@/src/utils/theme";
import { Box, CssBaseline, createTheme } from "@mui/material";
import { createContext } from "react";
import { useRouter } from "next/router";
import { fetchShopperData } from "@/src/store/slices/shopperSlice";
import { config } from "@/src/config/config";
import Footer from "@/ui/components/Footer";

type CustomeAppProps = AppProps & { session: Session };
export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export default function App({
  Component,
  pageProps,
  session,
}: CustomeAppProps) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const { asPath } = useRouter();
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const isInclude = (route: string) =>
    asPath.includes(`${config.baseUrl}${route}`);

  const isAdmin = isInclude("/admin");
  const isLogin = isInclude("/login");
  const isRegister = isInclude("/register");

  useEffect(() => {
    if (isLogin || isRegister) {
      return;
    }

    if (isAdmin) {
      console.log("fetchadmin");
      store.dispatch(fetchAdminData());
    } else {
      console.log("fetchshopper");
      store.dispatch(fetchShopperData());
    }
  }, [isAdmin]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
            <Footer />
          </SessionProvider>
        </Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
/*
     <ShopperContextProvider>
            <Component {...pageProps} />
          </ShopperContextProvider>
*/
