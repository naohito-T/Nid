import type { NextPage, InferGetServerSidePropsType } from 'next';
import Error from 'next/error';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { AddressTpl, LayoutTpl } from '@/components/templates';
import { progressAtom } from '@/contexts/common';

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

const Address: NextPage<Props> = ({ statusCode }) => {
  const [isProgress, setIsProgress] = useRecoilState(progressAtom);

  /**
   * 変更する値だけを抽出する必要。
   */
  const onSubmit = async (singValue: SignValue) => {
    // validationをして
    // const backendGuestResource = new BackendGuestResource();
    // const users = await backendGuestResource.singIn(singValue);
    // // TODO useState or Recoil
    // console.log(`users ${users}`);
  };

  return (
    <LayoutTpl isProgress={isProgress}>
      {statusCode ? <Error statusCode={statusCode}></Error> : <AddressTpl onSubmit={onSubmit} />}
    </LayoutTpl>
  );
};

export default Address;
