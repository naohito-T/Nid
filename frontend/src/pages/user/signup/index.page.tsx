import type { InferGetServerSidePropsType, NextPage } from 'next';
import styled from 'styled-components';
import { SignUpTpl } from '@/components/templates';
import { displayFlex } from '@/styles/styled-components';
import { BackendGuestResource } from '@/apis/resources/guest/backend.resource';
import type { SingValueType } from '@/schema';

const Wrapper = styled.div`
  /* ${displayFlex({})}
  height: 100vh;
  background-color: #000; */
`;

const SingUp: NextPage = () => {
  const onSubmit = async (singValue: SingValueType) => {
    // validationをして
    // const backendGuestResource = new BackendGuestResource();
    // const users = await backendGuestResource.singIn(singValue);
    // // TODO useState or Recoil
    // console.log(`users ${users}`);
  };

  return (
    <Wrapper>
      <SignUpTpl onSubmit={onSubmit} />
    </Wrapper>
  );
};

export default SingUp;
