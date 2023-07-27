import styled from "@emotion/styled";
import React, { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  // Add any additional custom props here, if needed
}

const StyledSelect = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  appearance: initial;

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 15px; /* Adjust this value to add padding around the arrow */
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #000; /* Arrow color */
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

const Select: React.FC<SelectProps> = (props) => {
  return <StyledSelect {...props} />;
};

export default Select;
