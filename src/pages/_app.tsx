/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import AOS from "aos";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Layout from "layout";

import "aos/dist/aos.css"; // You can also use <link> for styles
import "lib/styles/globals.css";
import customTheme from "lib/styles/customTheme";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page: ReactNode) => <Layout>{page}</Layout>);

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
      {getLayout(
        <>
          <Component {...pageProps} />
          <Analytics />
          <SpeedInsights route={router.pathname} />
        </>
      )}
    </ChakraProvider>
  );
};

export default appWithTranslation(MyApp);
