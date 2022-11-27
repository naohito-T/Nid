import type { NextComponentType, NextPageContext } from 'next';
import styled from 'styled-components';
import { SignIn } from '@/components/organisms/top';
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
export const SignInTpl: NextComponentType<NextPageContext, null, Props> = ({ onSubmit }) => {
  return (
    <Wrapper data-testid='top-tpl'>
      <SignIn onSubmit={onSubmit} />
      <section>
        {/* <Button onClick={onClick}>API接続</Button>

    <Link href={'/user/sing-up'} passHref>
      <p className='text'>Sing-up</p>
    </Link>

    <Link href={'/user/sing-in'} passHref>
      <p className='text'>Sing-up</p>
    </Link> */}
      </section>
    </Wrapper>
  );
};
