import styled from "styled-components";

const StyledContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  height: 100%;
  max-width: ${(props) => props.theme.sizes.containerWidth};
  padding-top: ${(props) => props.theme.sizes.headerHeight};
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    padding-top: ${(props) => props.theme.sizes.headerHeightMobile};
  }
`;

export default function Container({ children }: { children: React.ReactNode }) {
  return <StyledContainer>{children}</StyledContainer>;
}
