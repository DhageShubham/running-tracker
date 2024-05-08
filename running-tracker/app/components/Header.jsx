import Link from "next/link";
import React from "react";
import { Box, Flex, Image, Button, Heading } from "@chakra-ui/react";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <Flex
      justifyContent="space-between"
      h="60px"
      p="10px 20px"
      mb="10px"
      alignItems="center"
      borderBottom="2px solid black"
      bg="gray.300"
    >
      <Link href="/">
        <Box>
          <Image
            src="https://media2.giphy.com/media/hTDbWGwrjWlt6yRSMB/giphy.gif?cid=6c09b952iii0mhf4pclg973o9zez00ptsdb9texurxikrxem&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
            width="50px"
            height="50px"
            cursor="pointer"
          ></Image>
        </Box>
      </Link>
      <Heading md cursor="pointer">
        <Link href="/"></Link>Running Tracker
      </Heading>
      <Box>
        <UserButton afterSignOutUrl="/"></UserButton>

        <SignedOut>
          <Link href="/dashboard" cursor="pointer">
            <Button bg="gray.400">Sign in</Button>
          </Link>
        </SignedOut>
      </Box>
    </Flex>
  );
}

export default Header;
