import { NextComponentType, NextPageContext } from 'next';
import styled from 'styled-components';

type Props = {
  className?: string;
  disabled?: boolean;
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
};

const StyledButton = styled.button``;

export const Button: NextComponentType<NextPageContext, null, Props> = ({
  className = '',

  children,
  onClick,
}) => {
  return (
    <form action='/send-data-here' method='post'>
      {children}
    </form>
  );
};
