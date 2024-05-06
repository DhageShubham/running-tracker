"use client";
import {
  Box,
  Image,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormControl,
  Input,
  Divider,
  Flex,
} from "@chakra-ui/react";
import DatePicker2 from "./ReactDatePicker";
import { weekdays } from "../constants/weekdays.js";

import { useRef, useState } from "react";
import InputRow from "./InputRow";

const InputCard = () => {
  const distanceKmRef = useRef(null);
  const distanceMRef = useRef(null);
  const timeMinRef = useRef(null);
  const timeSecRef = useRef(null);
  const [endDate, setEndDate] = useState(new Date());
  const [speed, setSpeed] = useState("");
  const selectedDay = endDate.toLocaleDateString("en-US", { weekday: "long" });
  const { day, color, inputColor, planetURL } = weekdays.filter(
    (day) => day.day == selectedDay
  )[0];
  // const selectedDay = endDate.toLocaleDateString('en-US', { weekday: 'long' })
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
    <Card bg={color}>
      <CardHeader pb="0px">
        <Box display="flex" wrap="true" alignItems="center" gap={2}>
          <Image boxSize="40px" src={planetURL} alt={day} />
          {/* <Heading size="md">{day}</Heading> */}
          <DatePicker2 selectedDate={endDate} onChange={setEndDate} />
        </Box>
      </CardHeader>

      <Divider m="4px 15px" color="white" w="auto" />

      <CardBody>
        <FormControl display="flex" flexDirection="column" gap={2}>
          <Flex>
            <Image
              boxSize="39px"
              src="https://www.svgrepo.com/download/166477/distance.svg"
              alt="distance"
              backgroundColor={inputColor}
              borderRadius="5px"
            />
            <Input ref={distanceKmRef} type="number" placeholder="km" bg />
            <Input ref={distanceMRef} type="number" placeholder="m" bg />
          </Flex>

          <Flex>
            <Image
              boxSize="39px"
              src="https://cdn-icons-png.flaticon.com/512/3133/3133158.png"
              alt="time"
              backgroundColor={inputColor}
              borderRadius="5px"
            />
            <Input ref={timeMinRef} type="number" placeholder="min" bg />
            <Input ref={timeSecRef} type="number" placeholder="sec" bg />
          </Flex>
          {/* <Flex >
          <Image
              boxSize="39px"
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Run_icon.png"
              alt="speed"
              backgroundColor={inputColor}
              borderRadius="5px"
          />
          <Input   type="number"  placeholder="speed in km/h" value={speed}  bg readoly />
  
      </Flex> */}
          {/* <Input  ref={distanceRef} type="number" placeholder="km" bg isRequired/>
          <Input type="number" ref={timeRef}  placeholder="min" bg isRequired/>
          <Input   type="number"  placeholder="speed in km/h" value={speed}  bg readoly /> */}
          {/* <InputRow weekday={weekday} inputColor={inputColor} rowType="Distance" image="https://www.svgrepo.com/download/166477/distance.svg"/>
              <InputRow weekday={weekday} inputColor={inputColor} rowType="Time" image="https://cdn-icons-png.flaticon.com/512/3133/3133158.png"/>
              <InputRow weekday={weekday} inputColor={inputColor} rowType="Speed" image="https://upload.wikimedia.org/wikipedia/commons/f/fa/Run_icon.png"/> */}
        </FormControl>
      </CardBody>

      <CardFooter justifyContent="center" pt="0px">
        <Button bg={inputColor} onClick={calculateSpeed}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InputCard;
