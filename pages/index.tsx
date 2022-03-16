/* eslint-disable @next/next/link-passhref */

import React, { useEffect, useContext } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Button, Box } from "@chakra-ui/react";
import { SignMessageButton } from "../src/components/signMessageButton";
import { Heading } from "@chakra-ui/react";
import router from "next/router";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import { useWallet } from "@solana/wallet-adapter-react";

import bs58 from "bs58";

import Web3 from "@solana/web3.js";

import * as splGovernance from "@solana/spl-governance";
import { Connection, PublicKey } from "@solana/web3.js";

import * as splToken from "@solana/spl-token";
import Image from "next/image";

import { UserContext } from "../src/components/HOC/withAuth";

import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const Index: NextPage = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;

  const { value }: any = useContext(UserContext);
  const [loggedIn, setLoggedIn] = value;
  const convertBS58 = (publicKey: any) => {
    // let utf8Encode = new TextEncoder();

    // const bytes = utf8Encode.encode(publicKey);
    // var result = [];

    // for (var i = 0; i < publicKey.length; i += 2) {
    //   result.push(parseInt(publicKey.substring(i, i + 2), 16));
    // }
    // let bytes =   Uint8Array.from(result);
    // const address = bs58.encode(bytes);
    // return address;

    let uint8ArrMessage = new Uint8Array(publicKey.split(""));
    const address = bs58.encode(uint8ArrMessage);

    return address;
  };

  useEffect(() => {
    if (wallet.connected && localStorage.getItem("token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [wallet, localStorage]);
  return (
    <div>
      <Head>
        <title>Sapiens News</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading as="h1" size="4xl">
          <span className={styles.animateCharcter}>
            {" "}
            <Image
              src="/Sapiens News.jpeg"
              alt="Sapiens news logo"
              width={60}
              height={60}
            />
            apiens News
          </span>
        </Heading>
        <Heading
          as="h2"
          size="lg"
          color={"white"}
          fontFamily={"Helvetica"}
          margin={10}
        >
          The 🌎 of Un-biased media
        </Heading>

        {loggedIn ? (
          <>
            <Link href="news-list">
              <Button
                _hover={{ bg: "violet" }}
                color="white"
                bg="black"
                mt="30px"
              >
                Read news
              </Button>
            </Link>
          </>
        ) : (
          <Heading as="h3" size="lg" color={"white"} margin={10}>
            Connect wallet to get started
          </Heading>
        )}
        <div style={{ position: "absolute", top: 0, right: 0, margin: 10 }}>
          <WalletMultiButton />
        </div>
        <Box margin={"10px"}>
          {loggedIn && (
            <>
              <Button
                onClick={() => {
                  router.push("/articleList");
                }}
              >
                My articles
              </Button>
            </>
          )}
        </Box>
        {/* <Button
          onClick={async () => {
            const connection = new Connection(
              "https://api.devnet.solana.com",
              "recent"
            );
            const programId = new PublicKey(
              "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw"
            );

            const realms = await splGovernance.getRealms(connection, programId);
            // splGovernance.serializeInstructionToBase64()
            // @ts-ignore
            // console.log(realms);

            let TOKEN_PROGRAM_ID = new PublicKey(
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            );
            let mintPubkey = new PublicKey(
              "CbuK4bukpEih3SjwkeJ8VXZaGBSYTvg2Z6P6rhdNmDj9"
            );
            let tokenAccountPubkey = new PublicKey(
              "3bNxnDnZdtAZLmemrRaEXFmcNeTzTcXLBbdsvWCyJ2f"
            );
            let pdaOwnerPubkey = new PublicKey(
              "Fi9F5XRMX6RFbZGn5HmCmQLSyQazrN8JMJQZZNyax7JK"
            );

            let burn_instr = splToken.createBurnInstruction(
              tokenAccountPubkey, // from (should be a token account)
              mintPubkey, // mint
              pdaOwnerPubkey, // owner of token account
              1e13, // 6 decimals + 9 for 1 billion tokens
              [], // for multisig account, leave empty.
              TOKEN_PROGRAM_ID // always TOKEN_PROGRAM_ID
            );
            let base64Addr = await splGovernance.serializeInstructionToBase64(
              burn_instr
            );
            console.log(base64Addr);
          }}
        >
          Test
        </Button> */}
      </main>

      <div></div>
    </div>
  );
};

export default Index;
