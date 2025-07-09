import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import { SearchProvider } from "../context/SearchContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <Head>
        <title>Pokemon Explorer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/pokeball copy.svg" />
        {/* You can also use .png: <link rel="icon" type="image/png" href="/favicon.png" /> */}
      </Head>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </SearchProvider>
  );
}
