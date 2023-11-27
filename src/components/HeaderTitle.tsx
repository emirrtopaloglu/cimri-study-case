import styled from "styled-components";

const StyledHeaderTitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 0.75rem;
  font-weight: 500;
`;

export default function HeaderTitle({
  children
}: {
  children: React.ReactNode;
}) {
  return <StyledHeaderTitle>{children}</StyledHeaderTitle>;
}
