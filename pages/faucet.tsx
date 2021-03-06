/* eslint-disable @next/next/link-passhref */

import { NextPage } from "next";
import Head from "next/head";
import {
  Heading,
  Center,
  Input,
  Box,
  VStack,
  Button,
  useToast,
  ButtonGroup,
} from "@chakra-ui/react";
import { PublicKey, Connection } from "@solana/web3.js";
import {
  useAnchorWallet,
  useWallet,
  WalletContextState,
} from "@solana/wallet-adapter-react";
import styles from "../styles/Home.module.css";
import Layout from "../src/components/Layout";

import {
  requestNewsTokenFromFaucet,
  requestSapienTokenFromFaucet,
} from "../src/api/faucet";
//@ts-ignore
import ReCAPTCHA from "react-google-recaptcha";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";

const Faucet = () => {
  const wallet: any = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [requestedToken, setRequestedToken] = useState("");
  const toast = useToast();
  const validateSolanaAddress = async (addr: string) => {
    let publicKey;
    try {
      publicKey = new PublicKey(addr);
    } catch (err) {
      return false;
    }

    return await PublicKey.isOnCurve(publicKey.toBytes());
  };
  async function onChange(value: any) {
    if (requestedToken === "news") {
      try {
        await requestNewsTokenFromFaucet();
        toast({
          position: "top",
          title: "Airdrop succesful",
          description: "Please check your wallet",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        closeModal();
      } catch (err) {
        toast({
          position: "top",
          title: "Airdrop failed",
          description: "Something went wrong  ",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else if (requestedToken === "sapien") {
      try {
        await requestSapienTokenFromFaucet();
        toast({
          position: "top",
          title: "Airdrop succesful",
          description: "Please check your wallet",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        closeModal();
      } catch (err) {
        toast({
          position: "top",
          title: "Airdrop failed",
          description: "Something went wrong  ",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      try {
        const NODE_RPC = "https://api.devnet.solana.com"; // devnet environment
        const CONNECTION = new Connection(NODE_RPC);
        const confirmation = await CONNECTION.requestAirdrop(
          wallet.publicKey,
          1000000000
        );

        toast({
          position: "top",
          title: "Airdrop succesful",
          description: "Please check your wallet",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        closeModal();
      } catch (err) {
        toast({
          position: "top",
          title: "Airdrop failed",
          description: "Something went wrong  ",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }

    // sendtokens
  }

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClick = async () => {
    if (await validateSolanaAddress(address)) {
      openModal();
    } else {
      toast({
        position: "top",
        title: "Invalid address",
        description: "Please enter valid solana address",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <div>
      <Modal isCentered isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input id="yourFirstCaptchaUserInput" type="text" />
            <ReCAPTCHA
              sitekey={"6Lch2uweAAAAALFqOjR-PWmtp_PvBc19BIr8hQBR"}
              onChange={onChange}
            />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Head>
        <title>Sapiens News</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.values}>
        <Center h="100vh">
          <VStack>
            <Box color="white">
              <Heading>Faucet</Heading>
            </Box>
            <Box width="40vw">
              {/* <Input
                color="white"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Input> */}
            </Box>
            <Box>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    openModal();
                    setRequestedToken("news");
                  }}
                >
                  Request News tokens
                </Button>
                <Button
                  onClick={() => {
                    openModal();
                    setRequestedToken("sapien");
                  }}
                >
                  Request Sapien tokens (Governance)
                </Button>
                <Button
                  onClick={() => {
                    openModal();
                    setRequestedToken("sol");
                  }}
                >
                  Request Sol
                </Button>
              </ButtonGroup>
            </Box>
          </VStack>
        </Center>
      </main>
      <div></div>
    </div>
  );
};

Faucet.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

export default Faucet;
