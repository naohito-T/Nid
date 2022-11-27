import type { NextPage, InferGetServerSidePropsType } from 'next';
import Error from 'next/error';
import styled from 'styled-components';
import { TopTpl } from '@/components/templates';
import { BackendGuestResource } from '@/apis/resources/guest/backend.resource';
import type { SignValue } from '@/schema';

const Wrapper = styled.main`
  width: 100%;
`;

// loginかチェックする
// 方針としてloginとみなす（recoilに値があれば）
// expiredを見て
// 期限が切れていなかったらlogin
// 期限が切れていたら再度loginを伝える。
export const getServerSideProps = async () => {
  let statusCode: number | null = null;
  /**
   * @memo window.alert('Hello'); ここでnullアクセスも（500）
   * throw new Error('status'); 500へ遷移（しかしmessageはとどかない）
   */
  // const backendGuestResource = new BackendGuestResource();
  // ここの中でerrorがfetchされたらerrorページへ飛ばされる。
  // const users = await backendGuestResource.signIn({ email: '', password: '' });
  const isLogin = false;

  if (!statusCode && !isLogin) {
    return {
      redirect: {
        permanent: false,
        destination: '/user/signin',
      },
    };
  }

  return {
    props: {
      statusCode,
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Top: NextPage<Props> = ({ statusCode }) => {
  const onSubmit = async (singValue: SignValue) => {
    // validationをして
    const backendGuestResource = new BackendGuestResource();
    const users = await backendGuestResource.signIn(singValue);
    // TODO useState or Recoil
    console.log(`users ${users}`);
  };

  return (
    <>
      {statusCode ? (
        <Error statusCode={statusCode}></Error>
      ) : (
        <Wrapper>
          <TopTpl onSubmit={onSubmit} />
        </Wrapper>
      )}
    </>
  );
};

export default Top;
