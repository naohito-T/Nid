import type { NextPage, InferGetServerSidePropsType } from 'next';
import Error from 'next/error';
import styled from 'styled-components';

import { AddressTpl } from '@/components/templates';
import { BackendGuestResource } from '~/apis/resources/guest/backend.resource';
import Link from 'next/link';
import type { SignValueType } from '@/schema';

const Wrapper = styled.div``;

export const getServerSideProps = async () => {
  let statusCode: number | null = null;
  /**
   * @memo window.alert('Hello'); ここでnullアクセスも（500）
   * throw new Error('status'); 500へ遷移（しかしmessageはとどかない）
   */
  // const backendGuestResource = new BackendGuestResource();
  // ここの中でerrorがfetchされたらerrorページへ飛ばされる。
  // const users = await backendGuestResource.signIn({ email: '', password: '' });

  return {
    props: {
      statusCode,
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Address: NextPage<Props> = ({ statusCode }) => {
  const onSubmit = async (singValue: SignValueType) => {
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
    <>
      {statusCode ? (
        <Error statusCode={statusCode}></Error>
      ) : (
        <Wrapper>
          <AddressTpl onSubmit={onSubmit} />
        </Wrapper>
      )}
    </>
  );
};

export default Address;
