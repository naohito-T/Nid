import type { InferGetServerSidePropsType, NextPage } from 'next';
import styled from 'styled-components';
import { displayFlex } from '@/styles/styled-components';
import { Button } from '@/components/atoms/button';
import { User } from '@/@types/model';
import { GuestResource } from '@/apis/resources/guest';

const Wrapper = styled.div`
  ${displayFlex({})}
  height: 100vh;
  background-color: #000;
`;

const Top: NextPage = () => {
  const onClick = async () => {
    const guestResource = new GuestResource();
    const users = await guestResource.getUsers();
    console.log(`users ${users}`);
  };

  return (
    <Wrapper>
      <Button onClick={onClick}>API接続</Button>
    </Wrapper>
  );
};

export default Top;
