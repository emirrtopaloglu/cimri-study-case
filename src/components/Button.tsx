import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    filter: brightness(1);
    transform: scale(0.98);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  children,
  ...props
}: { children: React.ReactNode } & Button) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
