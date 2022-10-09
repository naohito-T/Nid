import { NextComponentType, NextPageContext } from 'next';
import styled from 'styled-components';

type Props = {
  className?: string;
  disabled?: boolean;
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
};

const StyledButton = styled.button`
  width: 100%;
  height: auto;
  font-size: 14px;
  color: ${(props): string => props.theme.white};
  text-align: center;
  &:disabled {
    background: ${(props): string => props.theme.black};
  }

  p {
    margin-right: 1rem;
  }
`;

export const Button: NextComponentType<NextPageContext, null, Props> = ({
  className = '',
  disabled,
  value,
  children,
  onClick,
}) => {
  return (
    <StyledButton disabled={disabled} value={value} onClick={onClick} className={className}>
      {children}
    </StyledButton>
  );
};
