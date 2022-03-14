import type { AppProps } from "next/app";
import Head from "next/head";
import { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalStyles } from "twin.macro";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'

function MyApp({ Component, pageProps }: AppProps) {
  const client = useMemo(() => {
    return new QueryClient();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <Head>
          <title>User Groups</title>
          <GlobalStyles />
        </Head>
        <QueryClientProvider client={client}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </>
    </DndProvider>
  );
}

export default MyApp;
