import { Heading, Box, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Box>
      <Heading>this is homepage</Heading>
      <Link href="/dashboard">
        <Button bg="green.100">Lets run!</Button>
      </Link>
    </Box>
  );
}
