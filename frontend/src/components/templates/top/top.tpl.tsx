import type { NextComponentType, NextPageContext } from 'next';
import styled from 'styled-components';
import { SingForm } from '@/components/organisms/top';

type Props = {};

/** 全体の設定 */
const Wrapper = styled.div`
  width: 100%;
`;

export const TopTpl: NextComponentType<NextPageContext, null, Props> = ({}) => {
  return (
    <Wrapper data-testid='top-tpl'>
      <SingForm />
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
