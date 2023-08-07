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

type CustomeAppProps = AppProps & { session: Session };
export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export default function App({
  Component,
  pageProps,
  session,
}: CustomeAppProps) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  useEffect(() => {
    store.dispatch(fetchAdminData());
  }, []);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  console.log("pageProps", pageProps);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
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
