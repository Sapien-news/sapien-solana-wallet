/* eslint-disable @next/next/link-passhref */

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

import Image from "next/image";

const Index: NextPage = () => {
  const { publicKey } = useWallet();
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

        {!publicKey ? (
          <Heading as="h3" size="lg" color={"white"} margin={10}>
            Connect wallet to get started
          </Heading>
        ) : (
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
        )}
        <div style={{ position: "absolute", top: 0, right: 0, margin: 10 }}>
          <WalletMultiButton />
        </div>
        <Box margin={"10px"}>
          {localStorage.getItem("token") ? (
            <>
              <Button
                onClick={() => {
                  router.push("/articleList");
                }}
              >
                My articles
              </Button>
            </>
          ) : (
            <SignMessageButton />
          )}
        </Box>
      </main>

      <div></div>
    </div>
  );
};

export default Index;
