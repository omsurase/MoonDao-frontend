import "regenerator-runtime/runtime";
import "@/styles/globals.css";
import { HuddleClientProvider } from "@huddle01/huddle01-client";
import { huddleClient } from "@/constants/api.constants";

export default function App({ Component, pageProps }) {
  return (
    <HuddleClientProvider value={huddleClient}>
      <Component {...pageProps} />
    </HuddleClientProvider>
  );
}
