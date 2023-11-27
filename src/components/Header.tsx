import styled from "styled-components";
import Input from "./Input";
import Image from "next/image";

const StyledHeader = styled.header`
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  position: fixed;
  top: 0;
  z-index: 100;
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  height: 70px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    justify-content: center;
    height: 100px;
  }
`;

interface HeaderProps {
  setSearch: (search: string) => void;
}

export default function Header(props: HeaderProps) {
  return (
    <StyledHeader>
      <HeaderContainer>
        <Image src="/logo.webp" width={88} height={30} alt="Cimri" />
        <Input
          placeholder="Marka veya ürün ara..."
          width="400px"
          onChange={(e) => props.setSearch(e.target.value)}
        />
      </HeaderContainer>
    </StyledHeader>
  );
}
