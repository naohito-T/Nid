import React from 'react';
import type { NextPage, InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Error from 'next/error';
import styled from 'styled-components';
import { SignUpTpl, LayoutTpl } from '@/components/templates';
import type { ResFrontError } from '@/schema';
import { useSignUp } from '@/hooks';

const Wrapper = styled.div``;

type ServerSideProps = ResFrontError;

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async () => {
  let statusCode: number | null = null;
  let message: string | null = null;
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
      message,
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const SingUp: NextPage<Props> = ({ statusCode, message }) => {
  const [isProgress, isError, onSubmit, onSnsLogin] = useSignUp();

  return (
    <LayoutTpl isProgress={isProgress}>
      {(statusCode && message) || (isError.statusCode && isError.message) ? (
        <Error
          statusCode={statusCode ?? isError.statusCode ?? 500}
          title={message ?? isError.message ?? 'Expected Un Error'}
        ></Error>
      ) : (
        <SignUpTpl onSubmit={onSubmit} onSnsLogin={onSnsLogin} />
      )}
    </LayoutTpl>
  );
};

export default SingUp;
