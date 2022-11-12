import type { NextPage, InferGetServerSidePropsType } from 'next';
import Error from 'next/error';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { progressState } from '@/stores/common';
import { SignInTpl, LayoutTpl } from '@/components/templates';
import { BackendGuestResource } from '@/apis/resources/guest/backend.resource';

import type { SingValueType } from '@/schema';

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

const SingIn: NextPage<Props> = ({ statusCode }) => {
  const [isProgress, setIsProgress] = useRecoilState(progressState);

  const onSubmit = async (singValue: SingValueType) => {
    // validationをして
    setIsProgress(true);

    const backendGuestResource = new BackendGuestResource();
    console.log(`users`);

    // const users = await backendGuestResource.signIn(singValue);
    // TODO useState or Recoil
    await new Promise((r) => setTimeout(r, 5000)).finally(() => setIsProgress(false));
    // console.log(`users ${users}`);
  };

  return (
    <LayoutTpl isProgress={isProgress}>
      {statusCode ? <Error statusCode={statusCode}></Error> : <SignInTpl onSubmit={onSubmit} />}
    </LayoutTpl>
  );
};

export default SingIn;
