import { Flex, Image, Input } from "@chakra-ui/react";
const InputRow = ({
  speed,
  distanceRef,
  timeRef,
  weekday,
  inputColor,
  rowType,
  image,
}) => {
  return (
    <Flex>
      <Image
        boxSize="39px"
        src={image}
        alt={weekday}
        backgroundColor={inputColor}
        borderRadius="5px"
      />
      {rowType == "Speed" && (
        <Input
          filter="blur(3px)"
          type="number"
          placeholder="speed in km/h"
          value={speed}
          bg
        />
      )}
      {rowType == "Distance" && (
        <>
          <Input ref={distanceRef} type="number" placeholder="km" bg />
          <Input type="number" placeholder="m" bg />
        </>
      )}
      {rowType == "Time" && (
        <>
          <Input type="number" ref={timeRef} placeholder="min" bg />
          <Input type="number" placeholder="sec" bg />
        </>
      )}
    </Flex>
  );
};

export default InputRow;
