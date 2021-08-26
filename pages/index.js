import React, { createContext, useEffect, useState } from "react"
import Head from "next/head"
import {
  Box,
  VStack,
  HStack,
  Button,
  Text,
  Link,
  Icon,
  Stack,
  IconButton,
} from "@chakra-ui/react"
import Nav from "../components/Nav"
import { TransferETH, PullETH, ReceieveETH } from "../components/ETH"
import { TransferNFT, PullNFT, ReceieveNFT } from "../components/NFT"
import { safeTransfer } from "../interact/safe-transfer"
import { AiFillGithub } from "react-icons/ai"

const TRANSFER = "transfer"
const PULL = "pull"
const COMPLETE = "complete"

export default function Home() {
  const [current, setCurrent] = useState(TRANSFER)
  const { txHash } = safeTransfer.useContainer()

  return (
    <Box w="100%" pb="10" position="absolute" minH="100vh">
      <Head>
        <title>Simple Send</title>
        <meta name="description" content="Send ETH or NFTs safely and simply" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <VStack w="100%" minH="75%">
        <Options current={current} setCurrent={setCurrent} />
        <Stack
          direction={["column", "row"]}
          justify="space-evenly"
          w="100%"
          h="100%"
          m={10}>
          <Actions current={current} />
        </Stack>
        {txHash && (
          <Text>
            Transaction at:{" "}
            <Link
              isExternal={true}
              href={`https://ropsten.etherscan.io/tx/${txHash}`}>
              {txHash}
            </Link>
          </Text>
        )}
      </VStack>
      <Link
        isExternal={true}
        href={"https://github.com/bennycio/safe-transfer"}
        position="absolute"
        bottom="2"
        left="1">
        <IconButton
          type="button"
          variant="unstyled"
          aria-label="go to github for project"
          icon={<Icon as={AiFillGithub} boxSize="2em" />}
        />
      </Link>
    </Box>
  )
}

const Actions = ({ current }) => {
  switch (current) {
    case TRANSFER:
      return (
        <>
          <TransferETH />
          <TransferNFT />
        </>
      )
    case PULL:
      return (
        <>
          <PullETH />
          <PullNFT />
        </>
      )
    case COMPLETE:
      return (
        <>
          <ReceieveETH />
          <ReceieveNFT />
        </>
      )
    default:
      return (
        <>
          <TransferETH />
          <TransferNFT />
        </>
      )
  }
}

const Options = ({ current, setCurrent }) => {
  return (
    <Stack direction={"row"} w={["100%", "50%"]} spacing={10} p={4}>
      <Button
        w="100%"
        onClick={() => setCurrent(TRANSFER)}
        background={current == TRANSFER ? "gray.300" : "gray.100"}>
        Transfer
      </Button>
      <Button
        w="100%"
        onClick={() => setCurrent(PULL)}
        background={current == PULL ? "gray.300" : "gray.100"}>
        Pull
      </Button>
      <Button
        w="100%"
        onClick={() => setCurrent(COMPLETE)}
        background={current == COMPLETE ? "gray.300" : "gray.100"}>
        Receive
      </Button>
    </Stack>
  )
}
