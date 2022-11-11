import type { NextComponentType, NextPageContext } from 'next';
import styled from 'styled-components';
import Dashboard from './dashbord';

import type { SingValueType } from '@/schema';

type Props = {
  onSubmit: (singValue: SingValueType) => Promise<void>;
};

/**
 * @desc loginしていたらログイン loginしていないのであればsignin or signup
 */
export const TopTpl: NextComponentType<NextPageContext, null, Props> = ({ onSubmit }) => {
  return <Dashboard />;
};
