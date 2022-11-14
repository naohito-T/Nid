import type { NextComponentType, NextPageContext } from 'next';
import styled from 'styled-components';
import { SingUp } from '@/components/organisms/top';
import type { SignValueType } from '@/schema';

type Props = {
  onSubmit: (singValue: SignValueType) => Promise<void>;
};

/** 全体の設定 */
const Wrapper = styled.div`
  width: 100%;
`;

/**
 * @desc loginしていたらログインにする
 */
export const SignUpTpl: NextComponentType<NextPageContext, null, Props> = ({ onSubmit }) => {
  return (
    <Wrapper data-testid='top-tpl'>
      <SingUp onSubmit={onSubmit} />
    </Wrapper>
  );
};
