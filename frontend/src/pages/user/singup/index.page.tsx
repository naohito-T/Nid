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

const SingUp: NextPage = () => {
  const onClick = async () => {
    const guestResource = new GuestResource();
    const users = await guestResource.getUsers();
    console.log(`users ${users}`);
  };

  return (
    <>
      <Wrapper>
        <Button onClick={onClick}>SignUp</Button>
      </Wrapper>
    </>
  );
};

export default SingUp;
