import type { InferGetServerSidePropsType, NextPage } from 'next';
import styled from 'styled-components';
import { SignInTpl } from '@/components/templates';
import { BackendGuestResource } from '~/apis/resources/guest/backend.resource';

import type { SingValueType } from '@/schema';

const Wrapper = styled.div``;

const SingIn: NextPage = () => {
  const onSubmit = async (singValue: SingValueType) => {
    // validationをして
    // const backendGuestResource = new BackendGuestResource();
    // const users = await backendGuestResource.singIn(singValue);
    // TODO useState or Recoil
    // console.log(`users ${users}`);
  };

  return (
    <Wrapper>
      <SignInTpl onSubmit={onSubmit} />
    </Wrapper>
  );
};

export default SingIn;
