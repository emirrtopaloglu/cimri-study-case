import type { InputHTMLAttributes } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 5px 10px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.border};
  transition: border-color 0.2s ease-in-out;
  color: #333;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    outline: none;
  }
  @media screen and (max-width: 768px) {
    min-width: 100%;
  }
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
}

export default function Input(props: InputProps) {
  return (
    <StyledInput
      {...props}
      style={{
        ...(props.style as {}),
        width: props.width
      }}
    />
  );
}
