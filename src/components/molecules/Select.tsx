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
`;

const Select: React.FC<SelectProps> = (props) => {
  return <StyledSelect {...props} />;
};

export default Select;
