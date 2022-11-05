import type { InferGetServerSidePropsType, NextPage } from 'next';
import styled from 'styled-components';
import { displayFlex } from '@/styles/styled-components';
import { Button } from '@/components/atoms/button';
import { User } from '@/@types/model';
import { GuestResource } from '~/apis/resources/guest/backend.resource';
import Link from 'next/link';

const Wrapper = styled.div`
  ${displayFlex({})}
  height: 100vh;
  background-color: #000;
`;

const SingIn: NextPage = () => {
  const onClick = async () => {
    const guestResource = new GuestResource();
    const users = await guestResource.getUsers();
    console.log(`users ${users}`);
  };

  const onLoginForEmail = (email: string, password: string) => {
    console.log('email');
  };

  return (
    <Wrapper>
      <Button onClick={onClick}>SignIn</Button>
    </Wrapper>
  );
};

export default SingIn;
