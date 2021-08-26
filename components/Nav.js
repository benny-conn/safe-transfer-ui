import React from "react"
import { Box, HStack, Text } from "@chakra-ui/react"
import ConnectButton from "./ConnectButton"

const Nav = () => {
  return (
    <Box w="100%" p="4" position="relative" top={0}>
      <HStack justify="space-between">
        <Text fontSize="lg">
          SafeTransfer{" "}
          <Text fontSize="sm" as={"span"} color="gray.400">
            by bennycio
          </Text>
        </Text>
        <ConnectButton />
      </HStack>
    </Box>
  )
}

export default Nav
