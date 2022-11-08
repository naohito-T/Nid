import type { NextPage } from 'next';
import styled from 'styled-components';
import { TopTpl } from '@/components/templates';

const Wrapper = styled.main`
  max-width: 1280px;
  width: 100%;
`;

const Top: NextPage = () => {
  const onClick = async () => {
    // const guestResource = new GuestResource();
    // const users = await guestResource.getTest();
    // console.log(`users ${users}`);
  };

  return (
    <Wrapper>
      <TopTpl />
    </Wrapper>
  );
};

export default Top;
