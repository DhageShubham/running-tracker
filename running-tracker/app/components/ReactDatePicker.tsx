import React, { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

import "react-datepicker/dist/react-datepicker.css";
import "./chakra-react-datepicker.css";

const customDateInput = ({ value, onClick, onChange }: any, ref: any) => (
  <Input
    autoComplete="off"
    background="white"
    value={value}
    ref={ref}
    onClick={onClick}
    onChange={onChange}
  />
);
customDateInput.displayName = "DateInput";

const CustomInput = forwardRef(customDateInput);

const icon = <CalendarIcon fontSize="lg" />;

interface Props {
  isClearable?: boolean;
  onChange: (date: Date) => any;
  selectedDate: Date | undefined;
  showPopperArrow?: boolean;
}

const DatePicker2 = ({ selectedDate, onChange, ...props }: Props) => {
  return (
    <>
      <InputGroup zIndex={1} className="dark-theme">
        <ReactDatePicker
          selected={selectedDate}
          onChange={onChange}
          className="react-datapicker__input-text"
          customInput={<CustomInput />}
          dateFormat="dd/MM/yy"
          {...props}
        />
        <InputRightElement color="gray.500" children={icon} />
      </InputGroup>
    </>
  );
};

export default DatePicker2;
