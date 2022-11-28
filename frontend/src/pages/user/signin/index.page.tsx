import type { NextPage, InferGetServerSidePropsType } from 'next';
import Error from 'next/error';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { progressAtom } from '@/contexts/common';
import { SignValueScheme } from '@/schema';
import { SignInTpl, LayoutTpl } from '@/components/templates';
import { BackendGuestResource } from '@/apis/resources/guest/backend.resource';
import useSWR from 'swr';

import type { SignValue } from '@/schema';

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
  const [isProgress, setIsProgress] = useRecoilState(progressAtom);

  // validationをして成功であればprogressを外す
  const onSubmit = async (signValue: SignValue) => {
    setIsProgress(true);
    // 検証
    const parsedSignValue = await SignValueScheme.parseAsync(signValue);

    // TODO stateを作成しrecoilに保存
    const backendGuestResource = new BackendGuestResource();
    const tmpCode = await backendGuestResource.signUp(parsedSignValue);
    console.log(tmpCode);
    await new Promise((r) => setTimeout(r, 5000)).finally(() => setIsProgress(false));
  };

  return (
    <LayoutTpl isProgress={isProgress}>
      {statusCode ? <Error statusCode={statusCode}></Error> : <SignInTpl onSubmit={onSubmit} />}
    </LayoutTpl>
  );
};

export default SingIn;
