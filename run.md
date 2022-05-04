# Quick Run

Module not found: Can't resolve 'magic-sdk'
```
yarn add magic-sdk@7.0.0 @walletconnect/web3-provider @web3auth/web3auth
yarn add magic-sdk@7.0.0 @web3auth/web3auth
```

ReactMoralisError: Provide a "appId" provided to <MoralisProvider>

Need to update correct serverUrl and appId values
```
    serverUrl = "https://prylzpawi05g.usemoralis.com:2053/server"
    appId = "flqVyfiGHp0ZnP98praWONi2AStnRLDX1jOlLNc3"
```

```
cat << EOF > pages/_app.js
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
EOF
```

"\"clientId\" not provided, please provide clientId"

Get clientId from  [Web3Auth Client ID](https://dashboard.web3auth.io/home/web3auth)

```
      clientId: "BItvnWxTZwRz3mjWxeNZ4VUutQjNkSWUdIqUoYq8fq-hKjEQmIxfTPfz16zvVCbTPutq3OlhYr3UcKQm83xK91Q"
```