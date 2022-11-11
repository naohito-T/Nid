import type { InferGetServerSidePropsType, NextPage } from 'next';
import styled from 'styled-components';

import { User } from '@/@types/model';
import { AddressTpl } from '@/components/templates';
import { BackendGuestResource } from '~/apis/resources/guest/backend.resource';
import Link from 'next/link';
import type { SingValueType } from '@/schema';

const Wrapper = styled.div``;

const Address: NextPage = () => {
  const onSubmit = async (singValue: SingValueType) => {
    // validationをして
    // const backendGuestResource = new BackendGuestResource();
    // const users = await backendGuestResource.singIn(singValue);
    // // TODO useState or Recoil
    // console.log(`users ${users}`);
  };

  const onLoginForEmail = (email: string, password: string) => {
    console.log('email');
  };

  return (
    <Wrapper>
      <AddressTpl onSubmit={onSubmit} />
    </Wrapper>
  );
};

export default Address;
