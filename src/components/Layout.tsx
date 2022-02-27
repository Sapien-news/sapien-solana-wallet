import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import Navbar from "./navBar";
import Image from "next/image";
const Layout = ({ children }: any) => {
  return (
    <div
      style={{ backgroundColor: "black", color: "white", minHeight: "100vh" }}
    >
      <Navbar />
      {children}
      <footer
        style={{
          // position: "absolute",
          margin: "50px auto 0 auto",

          width: "100%",
          bottom: "0",
          // background: "black",
          padding: "20px",
          left: 0,
          right: 0,
          textAlign: "center",
          // right: "50%",
        }}
      >
        <Flex
          justifyContent={"center"}
          wrap={"wrap"}
          style={{
            position: "absolute",
            // top: "50%",  /* position the top  edge of the element at the middle of the parent */
            left: "50%" /* position the left edge of the element at the middle of the parent */,

            transform: "translate(-50%, -50%)",
          }}
        >
          <Image
            src="/Sapiens News.jpeg"
            alt="Sapiens news logo"
            width={30}
            height={30}
          />
          <Text>apiens News © 2022</Text>
        </Flex>
      </footer>
    </div>
  );
};

export default Layout;