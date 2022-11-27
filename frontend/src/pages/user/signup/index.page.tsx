import type { NextPage, InferGetServerSidePropsType } from 'next';
import Error from 'next/error';
import styled from 'styled-components';
import { SignUpTpl } from '@/components/templates';
import { displayFlex } from '@/styles/styled-components';
import { BackendGuestResource } from '@/apis/resources/guest/backend.resource';
import type { SignValueType } from '@/schema';

const Wrapper = styled.div`
  /* ${displayFlex({})}
  height: 100vh;
  background-color: #000; */
`;
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

const SingUp: NextPage<Props> = ({ statusCode }) => {
  const onSubmit = async (singValue: SignValueType) => {
    // validationをして
    // const backendGuestResource = new BackendGuestResource();
    // const users = await backendGuestResource.singIn(singValue);
    // // TODO useState or Recoil
    // console.log(`users ${users}`);
  };

  return (
    <>
      {statusCode ? (
        <Error statusCode={statusCode}></Error>
      ) : (
        <Wrapper>
          <SignUpTpl onSubmit={onSubmit} />
        </Wrapper>
      )}
    </>
  );
};

export default SingUp;
