require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const sendEthContractABI = require("../contract-send-eth.json")
const sendNftContractABI = require("../contract-send-nft.json")
const nftContractABI = require("../nft-contract.json")
const sendETHContractAddress = process.env.REACT_APP_CONTRACT_SEND_ETH_ADDRESS
const sendNFTContractAddress = process.env.REACT_APP_CONTRACT_SEND_NFT_ADDRESS
const nftContractAddress = process.env.REACT_APP_NFT_CONTRACT_ADDRESS
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}

export async function initiateTransferETH(to, amount, secret) {
  if (to.trim() === "" || amount.trim() === "" || secret.trim() === "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before sending.",
    }
  }

  window.contract = new web3.eth.Contract(
    sendEthContractABI.abi,
    sendETHContractAddress
  )

  const method = window.contract.methods.initiateTransfer(to, secret)

  const amountAsWei = web3.utils.numberToHex(web3.utils.toWei(amount, "ether"))
  console.log(amountAsWei)

  const gas = await method.estimateGas({
    from: window.ethereum.selectedAddress,
    value: amountAsWei,
  })

  const gasPrice = await web3.eth.getGasPrice()

  const encodedABI = method.encodeABI()

  const transactionParameters = {
    to: sendETHContractAddress,
    from: window.ethereum.selectedAddress,
    gas: "0x" + gas.toString(16),
    gasPrice: "0x" + gasPrice.toString(16),
    data: encodedABI,
    value: amountAsWei,
  }
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}

export async function completeTransferETH(from, secret) {
  if (from.trim() === "" || secret.trim() === "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before sending.",
    }
  }

  window.contract = new web3.eth.Contract(
    sendEthContractABI.abi,
    sendETHContractAddress
  )

  const method = window.contract.methods.completeTransfer(from, secret)

  const gas = await method.estimateGas({
    from: window.ethereum.selectedAddress,
  })

  const gasPrice = await web3.eth.getGasPrice()

  const encodedABI = method.encodeABI()

  const transactionParameters = {
    to: sendETHContractAddress,
    from: window.ethereum.selectedAddress,
    gas: "0x" + gas.toString(16),
    gasPrice: "0x" + gasPrice.toString(16),
    data: encodedABI,
  }
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}

export async function pullTransferETH(to) {
  if (to.trim() === "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before sending.",
    }
  }

  window.contract = new web3.eth.Contract(
    sendEthContractABI.abi,
    sendETHContractAddress
  )

  const method = window.contract.methods.pullTransfer(to)

  const gas = await method.estimateGas({
    from: window.ethereum.selectedAddress,
  })

  const gasPrice = await web3.eth.getGasPrice()

  const encodedABI = method.encodeABI()

  const transactionParameters = {
    to: sendETHContractAddress,
    from: window.ethereum.selectedAddress,
    gas: "0x" + gas.toString(16),
    gasPrice: "0x" + gasPrice.toString(16),
    data: encodedABI,
  }
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}

export async function mintNFT(tokenID) {
  if (tokenID.trim() === "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before sending.",
    }
  }

  window.contract = new web3.eth.Contract(
    nftContractABI.abi,
    nftContractAddress
  )

  const method = window.contract.methods.mint(
    window.ethereum.selectedAddress,
    tokenID
  )

  const gas = await method.estimateGas({
    from: window.ethereum.selectedAddress,
  })

  const gasPrice = await web3.eth.getGasPrice()

  const encodedABI = method.encodeABI()

  const transactionParameters = {
    to: nftContractAddress,
    from: window.ethereum.selectedAddress,
    gas: "0x" + gas.toString(16),
    gasPrice: "0x" + gasPrice.toString(16),
    data: encodedABI,
  }
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}

export async function transferNFTToContract(to, tokenID, secret) {
  if (tokenID.trim() === "" || to.trim() === "" || secret.trim() === "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before sending.",
    }
  }

  window.contract = new web3.eth.Contract(
    nftContractABI.abi,
    nftContractAddress
  )

  const secretWithAddr = to + secret

  const method = window.contract.methods.safeTransferFrom(
    window.ethereum.selectedAddress,
    sendNFTContractAddress,
    tokenID,
    secretWithAddr
  )

  const gas = await method.estimateGas({
    from: window.ethereum.selectedAddress,
  })

  const gasPrice = await web3.eth.getGasPrice()

  const encodedABI = method.encodeABI()

  const transactionParameters = {
    to: nftContractAddress,
    from: window.ethereum.selectedAddress,
    gas: "0x" + gas.toString(16),
    gasPrice: "0x" + gasPrice.toString(16),
    data: encodedABI,
  }
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}

export async function completeTransferNFT(from, secret) {
  if (from.trim() === "" || secret.trim() === "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before sending.",
    }
  }

  window.contract = new web3.eth.Contract(
    sendNftContractABI.abi,
    sendNFTContractAddress
  )

  const method = window.contract.methods.completeTransfer(from, secret)

  const gas = await method.estimateGas({
    from: window.ethereum.selectedAddress,
  })

  const gasPrice = await web3.eth.getGasPrice()

  const encodedABI = method.encodeABI()

  const transactionParameters = {
    to: sendNFTContractAddress,
    from: window.ethereum.selectedAddress,
    gas: "0x" + gas.toString(16),
    gasPrice: "0x" + gasPrice.toString(16),
    data: encodedABI,
  }
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}

export async function pullTransferNFT(to) {
  if (to.trim() === "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before sending.",
    }
  }

  window.contract = new web3.eth.Contract(
    sendNftContractABI.abi,
    sendNFTContractAddress
  )

  const method = window.contract.methods.pullTransfer(to)

  const gas = await method.estimateGas({
    from: window.ethereum.selectedAddress,
  })

  const gasPrice = await web3.eth.getGasPrice()

  const encodedABI = method.encodeABI()

  const transactionParameters = {
    to: sendNFTContractAddress,
    from: window.ethereum.selectedAddress,
    gas: "0x" + gas.toString(16),
    gasPrice: "0x" + gasPrice.toString(16),
    data: encodedABI,
  }
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}

export async function listenToLog() {
  const contract = new web3.eth.Contract(
    sendNftContractABI.abi,
    sendNFTContractAddress
  )
  contract.events
    .LogEvent(
      {
        fromBlock: 0,
      },
      function (error, event) {
        console.log("EVENT ", event)
      }
    )
    .on("data", function (event) {
      console.log("EVENT ", event) // same results as the optional callback above
    })
    .on("changed", function (event) {
      console.log("EVENT ", event) // remove event from local database
    })
    .on("error", console.error)
}
