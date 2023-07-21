import { useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Loading from "../components/Loading";
import "../styles/globals.css";
import { CookiesProvider } from "react-cookie";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  return (
    <CookiesProvider>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300&display=swap" rel="stylesheet"pages={true} />
      </Head>
      <ErrorBoundary>
        {loading ? (
          <Loading />
        ) : (
          <div className="container">
            <Component {...pageProps} setLoading={setLoading} />
          </div>
        )}
      </ErrorBoundary>
    </CookiesProvider>
  );
}
