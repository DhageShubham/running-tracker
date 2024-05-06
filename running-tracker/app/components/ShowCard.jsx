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

import { useRef, useState } from "react";

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
  const distanceKmRef = useRef(null);
  const distanceMRef = useRef(null);
  const timeMinRef = useRef(null);
  const timeSecRef = useRef(null);

  const [speed, setSpeed] = useState("");

  const calculateSpeed = () => {
    const distanceKm = +distanceKmRef.current.value || 0;
    const distanceM = +distanceMRef.current.value || 0;
    const timeMin = +timeMinRef.current.value || 0;
    const timeSec = +timeSecRef.current.value || 0;

    const totalDistance = distanceKm + distanceM / 1000;
    const totalTime = timeMin / 60 + timeSec / 3600;
    const calSpeed = totalDistance / totalTime;
    setSpeed(calSpeed);
    //todo : code to send to firebase
  };

  return (
    <Card backgroundColor={cardColor}>
      <CardHeader pb="0px">
        <Box display="flex" wrap="true" alignItems="center" gap={2}>
          <Image boxSize="40px" src={planetURL} alt={weekday} />
          <Heading size="md">{weekday}</Heading>
        </Box>
        <IconButton
          size="sm"
          color="blue.500"
          position="absolute"
          top="5px"
          right="5px"
          aria-label="Search database"
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
              {timeRec} min{" "}
            </Box>
          </Flex>
          <Flex gap={1}>
            <Image
              boxSize="39px"
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Run_icon.png"
              alt="speed"
              backgroundColor={inputColor}
              borderRadius="5px"
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
