import { InputHTMLAttributes } from "react";
import styled from "styled-components";

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props) =>
    props.checked ? props.theme.colors.primary : "white"};
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primaryLight};
  }
`;

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  checked: boolean;
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <CheckboxContainer className={props.className}>
      <HiddenCheckbox {...props} />
      <StyledCheckbox checked={props.checked}>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2px">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </StyledCheckbox>
    </CheckboxContainer>
  );
}
