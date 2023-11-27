import styled from "styled-components";

const StyledSidebar = styled.div`
  width: ${(props) => props.theme.sizes.sidebarWidth};
  margin: 0;
  padding: 0;
  padding-right: 20px;
  background-color: #fff;
  position: fixed;
  top: ${(props) => props.theme.sizes.headerHeight};
  height: 100%;
  overflow: auto;

  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    top: 0;
    padding-right: 0;
  }
`;

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return <StyledSidebar>{children}</StyledSidebar>;
}
