import styled from "styled-components";

const StyledBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primaryLight};

  & > span {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-left: 5px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
`;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export default function Badge(props: BadgeProps) {
  return (
    <StyledBadge {...props}>
      {props.children}
      <span>&times;</span>
    </StyledBadge>
  );
}
