import type { NextPage, InferGetServerSidePropsType } from 'next';
import Error from 'next/error';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { progressState } from '@/stores/common';
import { SignValueScheme } from '@/schema';
import { SignInTpl, LayoutTpl } from '@/components/templates';
import { BackendGuestResource } from '@/apis/resources/guest/backend.resource';

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

const SingIn: NextPage<Props> = ({ statusCode }) => {
  const [isProgress, setIsProgress] = useRecoilState(progressState);

  // validationをして成功であればprogressを外す
  const onSubmit = async (signValue: SignValueType) => {
    setIsProgress(true);
    // 検証
    const parsedSignValue = await SignValueScheme.parseAsync(signValue);
    const backendGuestResource = new BackendGuestResource();
    console.log(`users`);
    const user = await backendGuestResource.signIn(parsedSignValue);
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
