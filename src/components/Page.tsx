import styled from "styled-components";

const StyledPage = styled.div`
  margin-left: ${(props) => props.theme.sizes.sidebarWidth};
  position: relative;
  min-height: calc(100vh - ${(props) => props.theme.sizes.headerHeight});
  overflow: hidden;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export default function Page({ children }: { children: React.ReactNode }) {
  return <StyledPage>{children}</StyledPage>;
}
