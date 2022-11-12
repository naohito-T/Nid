import type { NextComponentType, NextPageContext } from 'next';
import styled from 'styled-components';

import { Progress } from '@/components/molecules';

type Props = {
  isProgress: boolean;
  readonly children: Required<React.ReactNode>;
};

const Wrapper = styled.div``;

const MainWrap = styled.main``;

export const LayoutTpl: NextComponentType<NextPageContext, null, Props> = ({
  isProgress,
  children,
}) => {
  return (
    <Wrapper data-testid='layout'>
      {isProgress ? <Progress isProgress={isProgress} /> : <MainWrap>{children}</MainWrap>}
    </Wrapper>
  );
};
