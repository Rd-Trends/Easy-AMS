import type { AppProps } from "next/app";
import ThemeProvider from "../context/themeContext";
import { useThemeContext } from "../context/themeContext";
import { SWRConfig } from "swr";
import { fetcher } from "../utils/fetcher";
import "@fontsource/nunito-sans/300.css";
import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/600.css";
import "@fontsource/nunito-sans/700.css";
import "@fontsource/nunito-sans/800.css";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </ThemeProvider>
  );
}
