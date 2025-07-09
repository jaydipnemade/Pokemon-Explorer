import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { SearchProvider } from '../context/SearchContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
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
