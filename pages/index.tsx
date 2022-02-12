/* eslint-disable @next/next/link-passhref */
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Button } from "@chakra-ui/react";
import { SignMessageButton } from "../src/components/signMessageButton";

const Index: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Sapiens</h1>

        <div className={styles.walletButtons}>
          <WalletMultiButton />
          <WalletDisconnectButton />
        </div>

        <Link href="news-list">
          <Button _hover={{ bg: "grey" }} color="white" bg="black" mt="30px">
            Go to news
          </Button>
        </Link>
      </main>

      <div>
        <SignMessageButton />
      </div>
    </div>
  );
};

export default Index;
