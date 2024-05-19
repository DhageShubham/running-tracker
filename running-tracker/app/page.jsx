import { Heading, Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  return (
    <Box>
      <Heading>
        Welcome to the running tracker website. Run daily and track it daily.
      </Heading>
      <Link href="/dashboard">
        <Button bg="green.100">Lets run!</Button>
      </Link>
    </Box>
  );
}
