import { MoralisProvider } from "react-moralis";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider 
       serverUrl = "https://prylzpawi05g.usemoralis.com:2053/server"
       appId = "flqVyfiGHp0ZnP98praWONi2AStnRLDX1jOlLNc3" 
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
