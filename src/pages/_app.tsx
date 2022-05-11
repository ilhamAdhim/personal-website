/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";

import defaultSEOConfig from "../../next-seo.config";
import Layout from "layout";
import "aos/dist/aos.css"; // You can also use <link> for styles

import AOS from "aos";
import "lib/styles/globals.css";
import customTheme from "lib/styles/customTheme";
import { useEffect } from "react";

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
      </Layout>
    </ChakraProvider>
  );
};

export default MyApp;
