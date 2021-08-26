import { Button, Box, Text } from "@chakra-ui/react"
import { useEthers, useEtherBalance, ChainId } from "@usedapp/core"
import { formatEther } from "@ethersproject/units"
import Identicon from "./Indenticon"
import { useEffect } from "react"
import { toast } from "react-toastify"

export default function ConnectButton() {
  const { activateBrowserWallet, account, error } = useEthers()
  const etherBalance = useEtherBalance(account)

  useEffect(() => {
    if (error) {
      if (error.message.includes("Unsupported chain id")) {
        let message = "Please use Ropsten Network"
        if (process.env.NEXT_PUBLIC_CHAIN == ChainId.Mainnet) {
          message = "Please use Mainnet Network"
        }
        toast.error(message)
      } else {
        toast.error(error.message)
      }
    }
  }, [error])

  function handleConnectWallet() {
    activateBrowserWallet()
  }

  return account ? (
    <Box
      display="flex"
      alignItems="center"
      background="gray.400"
      borderRadius="xl"
      py="0">
      <Box px="3">
        <Text color="white" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
        </Text>
      </Box>
      <Button
        bgGradient="linear(to-r, pink.400,purple.400)"
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
        _hover={{
          bgGradient: "linear(to-r, pink.500,purple.500)",
        }}
        _active={{
          bgGradient: "linear(to-r, pink.300,purple.300)",
        }}>
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </Text>
        <Identicon />
      </Button>
    </Box>
  ) : (
    <Button onClick={handleConnectWallet}>Connect to a wallet</Button>
  )
}
