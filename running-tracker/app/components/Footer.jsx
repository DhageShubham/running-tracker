import React from "react";
import { Box, Flex, Image, Button, Heading } from "@chakra-ui/react";

function Footer() {
  return (
    <Box
      as="footer"
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      height="50px" // Adjust height as needed
      backgroundColor="gray.200"
      textAlign="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      Created by Shubham Dhage | &copy; {new Date().getFullYear()}
    </Box>
  );
}

export default Footer;
