import { useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Loading from "../components/Loading";
import "../styles/globals.css";
import { CookiesProvider } from "react-cookie";

export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  return (
    <CookiesProvider>
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
