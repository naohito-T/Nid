import type { InferGetServerSidePropsType, NextPage } from 'next';
import styled from 'styled-components';
import { displayFlex } from '@/styles/styled-components';
import { Button } from '@/components/atoms/button';
import { User } from '@/@types/model';
import { GuestResource } from '~/apis/resources/guest/backend.resource';
import Link from 'next/link';
import { Axios } from 'axios';

const Wrapper = styled.div`
  ${displayFlex({})}
  height: 100vh;
  background-color: #fff;
`;

const Top: NextPage = () => {
  const onClick = async () => {
    // const guestResource = new GuestResource();
    // const users = await guestResource.getTest();
    // console.log(`users ${users}`);
  };

  return (
    <Wrapper>
      <Button onClick={onClick}>API接続</Button>
      {/* 新規作成 */}
      <Link href={'/user/sing-up'} passHref>
        <p className='text'>Sing-up</p>
      </Link>
      {/* ログイン */}
      <Link href={'/user/sing-in'} passHref>
        <p className='text'>Sing-up</p>
      </Link>
    </Wrapper>
  );
};

export default Top;
