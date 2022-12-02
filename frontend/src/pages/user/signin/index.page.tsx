import type { NextPage, InferGetServerSidePropsType, GetServerSideProps } from 'next';
import type { ResFrontError } from '@/schema';
import Error from 'next/error';
import styled from 'styled-components';
import { useSignIn } from '@/hooks';
import { SignInTpl, LayoutTpl } from '@/components/templates';

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

const SingIn: NextPage<Props> = ({ statusCode, message }) => {
  const [isProgress, isError, onSubmit, onSnsLogin] = useSignIn();

  return (
    <LayoutTpl isProgress={isProgress}>
      {(statusCode && message) || (isError.statusCode && isError.message) ? (
        <Error
          statusCode={statusCode ?? isError.statusCode ?? 500}
          title={message ?? isError.message ?? 'Expected Un Error'}
        ></Error>
      ) : (
        <SignInTpl onSubmit={onSubmit} onSnsLogin={onSnsLogin} />
      )}
    </LayoutTpl>
  );
};

export default SingIn;
