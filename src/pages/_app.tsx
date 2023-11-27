import { ThemeProvider } from "styled-components";
import "/src/styles/globals.css";
import type { AppProps } from "next/app";
import { theme } from "/src/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
