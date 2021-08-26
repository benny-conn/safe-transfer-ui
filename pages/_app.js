import "../styles/globals.css"
import "react-toastify/dist/ReactToastify.css"

import StateProvider from "../interact/index"
import { ToastContainer } from "react-toastify"
import { ChakraProvider } from "@chakra-ui/react"
import { DAppProvider, ChainId } from "@usedapp/core"
import Layout from "../components/Layout"

const config = {
  readOnlyChainId:
    process.env.NEXT_PUBLIC_CHAIN == ChainId.Mainnet
      ? ChainId.Mainnet
      : ChainId.Ropsten,
  supportedChains:
    process.env.NEXT_PUBLIC_CHAIN == ChainId.Mainnet
      ? [ChainId.Mainnet]
      : [ChainId.Ropsten],
}

function App({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <StateProvider>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ChakraProvider>
      </StateProvider>
    </DAppProvider>
  )
}

export default App
