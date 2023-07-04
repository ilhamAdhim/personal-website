/* eslint-disable react/jsx-props-no-spreading */
import AOS from "aos";
import Head from "next/head";
import defaultSEOConfig from "../../next-seo.config";
import Layout from "layout";
import customTheme from "lib/styles/customTheme";
import "aos/dist/aos.css"; // You can also use <link> for styles
import "lib/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <DefaultSeo {...defaultSEOConfig} />
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </ChakraProvider>
  );
};

export default appWithTranslation(MyApp);
