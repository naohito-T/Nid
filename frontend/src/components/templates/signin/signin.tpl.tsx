import type { NextComponentType, NextPageContext } from 'next';
import styled from 'styled-components';
import { SignIn } from '@/components/organisms/top';
import type { SignValue, SignFlow } from '@/schema';

type Props = {
  onSubmit: (singValue: SignValue) => Promise<void>;
  onSnsLogin: (flow: SignFlow) => void;
};

/** 全体の設定 */
const Wrapper = styled.div`
  width: 100%;
`;

/**
 * @desc loginしていたらログインにする
 */
export const SignInTpl: NextComponentType<NextPageContext, null, Props> = ({
  onSubmit,
  onSnsLogin,
}) => {
  return (
    <Wrapper data-testid='top-tpl'>
      <SignIn onSubmit={onSubmit} onSnsLogin={onSnsLogin} />
    </Wrapper>
  );
};
