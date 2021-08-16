import { useEffect, useState } from "react"
import {
  completeTransferETH,
  completeTransferNFT,
  connectWallet,
  getCurrentWalletConnected,
  initiateTransferETH,
  listenToLog,
  mintNFT,
  pullTransferETH,
  pullTransferNFT,
  transferNFTToContract,
} from "./util/interact.js"

const Interactor = props => {
  const [walletAddress, setWallet] = useState("")
  const [status, setStatus] = useState("")
  const [addr, setAddr] = useState("")
  const [amount, setAmount] = useState("")
  const [secret, setSecret] = useState("")
  const [tokenID, setTokenID] = useState("")

  useEffect(() => {
    async function doit() {
      const { address, status } = await getCurrentWalletConnected()

      setWallet(address)
      setStatus(status)

      addWalletListener()

      listenToLog()
    }
    doit()
  }, [])

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accounts => {
        if (accounts.length > 0) {
          setWallet(accounts[0])
          setStatus("👆🏽 Write a message in the text-field above.")
        } else {
          setWallet("")
          setStatus("🦊 Connect to Metamask using the top right button.")
        }
      })
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      )
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet()
    setStatus(walletResponse.status)
    setWallet(walletResponse.address)
  }
  const onInitiateTransferETHPressed = async () => {
    const { success, status } = await initiateTransferETH(addr, amount, secret)
    setStatus(status)
  }
  const onPullTransferETHPressed = async () => {
    const { success, status } = await pullTransferETH(addr)
    setStatus(status)
  }
  const onCompleteTransferETHPressed = async () => {
    const { success, status } = await completeTransferETH(addr, secret)
    setStatus(status)
  }
  const onMintNFTPressed = async () => {
    const { success, status } = await mintNFT(tokenID)
    setStatus(status)
  }
  const onSendNFTPressed = async () => {
    const { success, status } = await transferNFTToContract(
      addr,
      tokenID,
      secret
    )
    setStatus(status)
  }
  const onPullTransferNFTPressed = async () => {
    const { success, status } = await pullTransferNFT(addr)
    setStatus(status)
  }
  const onCompleteTransferNFTPressed = async () => {
    const { success, status } = await completeTransferNFT(addr, secret)
    setStatus(status)
  }

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">Transferrer</h1>
      <p>Yippeee</p>
      <form>
        <h2>Send To: </h2>
        <input
          type="text"
          placeholder="e.g. 0xl29ijso92jals92aAls92..."
          onChange={event => setAddr(event.target.value)}
        />
        <h2>Amount of ETH: </h2>
        <input
          type="text"
          placeholder="e.g. 0.2"
          onChange={event => setAmount(event.target.value)}
        />
        <h2>Secret: (number) </h2>
        <input
          type="text"
          placeholder="e.g. 102938"
          onChange={event => setSecret(event.target.value)}
        />
        <h2>TokenID: (number) </h2>
        <input
          type="text"
          placeholder="e.g. 1"
          onChange={event => setTokenID(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onInitiateTransferETHPressed}>
        Initiate ETH Transfer
      </button>
      <button id="mintButton" onClick={onPullTransferETHPressed}>
        Pull ETH Transfer
      </button>
      <button id="mintButton" onClick={onCompleteTransferETHPressed}>
        Complete ETH Transfer
      </button>
      <button id="mintButton" onClick={onMintNFTPressed}>
        Mint NFT
      </button>
      <button id="mintButton" onClick={onSendNFTPressed}>
        Send NFT To Contract
      </button>
      <button id="mintButton" onClick={onPullTransferNFTPressed}>
        Pull NFT Transfer
      </button>
      <button id="mintButton" onClick={onCompleteTransferNFTPressed}>
        Complete NFT Transfer
      </button>
      <p id="status" style={{ color: "red" }}>
        {status}
      </p>
    </div>
  )
}

export default Interactor
