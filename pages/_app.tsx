import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="flex justify-center p-8 bg-red-500 w-full">
        <p className="text-3xl font-bold text-green-500 text-center">
          Reid Blind Tasting
        </p>
      </div>
      <div className="p-4">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
