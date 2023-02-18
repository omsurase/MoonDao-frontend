import "regenerator-runtime/runtime";
import "@/styles/globals.css";
import { HuddleClientProvider } from "@huddle01/huddle01-client";
import { huddleClient } from "@/constants/api.constants";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

export default function App({ Component, pageProps }) {
  const client = createClient({
    autoConnect: true,
    provider: getDefaultProvider(),
  });
  return (
    <HuddleClientProvider value={huddleClient}>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </HuddleClientProvider>
  );
}
