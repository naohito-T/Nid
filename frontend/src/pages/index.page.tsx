import type { NextPage } from 'next';
import styled from 'styled-components';
import { TopTpl } from '@/components/templates';
import { BackendGuestResource } from '@/apis/resources/guest/backend.resource';
import type { SingValueType } from '@/schema';

const Wrapper = styled.main`
  width: 100%;
`;

// loginかチェックする
// 方針としてloginとみなす（recoilに値があれば）
// expiredを見て
// 期限が切れていなかったらlogin
// 期限が切れていたら再度loginを伝える。
export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

const Top: NextPage = () => {
  const onSubmit = async (singValue: SingValueType) => {
    // validationをして
    // const backendGuestResource = new BackendGuestResource();
    // const users = await backendGuestResource.singIn(singValue);
    // TODO useState or Recoil
    // console.log(`users ${users}`);
  };

  return (
    <Wrapper>
      <TopTpl onSubmit={onSubmit} />
    </Wrapper>
  );
};

export default Top;
