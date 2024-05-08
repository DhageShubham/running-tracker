import React from "react";
import {
  Box,
  Image,
  Text,
  Button,
  SimpleGrid,
  Card,
  Heading,
  CardBody,
  CardHeader,
  CardFooter,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Divider,
  Flex,
  IconButton,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";

import "./ShowCard.css";

const ShowCard = ({
  weekday,
  cardColor,
  inputColor,
  planetURL,
  distRec,
  timeRec,
  speedRec,
}) => {
  timeRec = `${Math.floor(timeRec)} hr ${Math.round(
    (timeRec % 1) * 60
  )} min`.replace("0 hr", "");
  return (
    <Card backgroundColor={cardColor}>
      <CardHeader pb="0px">
        <Box display="flex" wrap="true" alignItems="center" gap={2}>
          <Image boxSize="40px" src={planetURL} alt={weekday} title={weekday} />
          <Heading size="md">{weekday}</Heading>
        </Box>
        <IconButton
          size="sm"
          color="blue.500"
          position="absolute"
          top="5px"
          right="5px"
          aria-label="Edit"
          bg={inputColor}
          icon={<EditIcon />}
        />
      </CardHeader>

      <Divider m="4px 15px" color="white" w="auto" />

      <CardBody>
        <FormControl display="flex" flexDirection="column" gap={2}>
          <Flex gap={1}>
            <Image
              boxSize="39px"
              src="https://www.svgrepo.com/download/166477/distance.svg"
              alt="distance"
              backgroundColor={inputColor}
              borderRadius="5px"
              title="distance covered"
            />
            <Box
              borderRadius="5px"
              display="flex"
              bg={inputColor}
              flex={1}
              alignItems="center"
              justifyContent="center"
            >
              {" "}
              {distRec} km{" "}
            </Box>
          </Flex>

          <Flex gap={1}>
            <Image
              boxSize="39px"
              src="https://cdn-icons-png.flaticon.com/512/3133/3133158.png"
              alt="time"
              backgroundColor={inputColor}
              borderRadius="5px"
              title="time taken"
            />
            <Box
              borderRadius="5px"
              display="flex"
              bg={inputColor}
              flex={1}
              alignItems="center"
              justifyContent="center"
            >
              {timeRec}
            </Box>
          </Flex>
          <Flex gap={1}>
            <Image
              boxSize="39px"
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Run_icon.png"
              alt="speed"
              backgroundColor={inputColor}
              borderRadius="5px"
              title="speed for above distance and time"
            />
            <Box
              borderRadius="5px"
              display="flex"
              bg={inputColor}
              flex={1}
              alignItems="center"
              justifyContent="center"
            >
              {speedRec} km/hr
            </Box>
          </Flex>
          {/* <Input  ref={distanceRef} type="number" placeholder="km" bg isRequired/>
            <Input type="number" ref={timeRef}  placeholder="min" bg isRequired/>
            <Input   type="number"  placeholder="speed in km/h" value={speed}  bg readoly /> */}
          {/* <InputRow weekday={weekday} inputColor={inputColor} rowType="Distance" image="https://www.svgrepo.com/download/166477/distance.svg"/>
                <InputRow weekday={weekday} inputColor={inputColor} rowType="Time" image="https://cdn-icons-png.flaticon.com/512/3133/3133158.png"/>
                <InputRow weekday={weekday} inputColor={inputColor} rowType="Speed" image="https://upload.wikimedia.org/wikipedia/commons/f/fa/Run_icon.png"/> */}
        </FormControl>
      </CardBody>
    </Card>
  );
};

export default ShowCard;
