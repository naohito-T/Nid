import { NextComponentType, NextPageContext } from 'next';
import styled from 'styled-components';

type Props = {
  className?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (event: React.MouseEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
};

const Wrapper = styled.input`
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

export const Input: NextComponentType<NextPageContext, null, Props> = ({
  className = '',
  disabled,
  value,
  children,
  onChange,
}) => {
  return (
    <Wrapper disabled={disabled} value={value} onChange={onChange} className={className}>
      {children}
    </Wrapper>
  );
};
