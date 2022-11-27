import type { NextComponentType, NextPageContext } from 'next';
import styled from 'styled-components';
import Dashboard from './dashbord';

import type { SignValueType } from '@/schema';

type Props = {
  onSubmit: (singValue: SignValueType) => Promise<void>;
};

/**
 * @desc loginしていたらログイン loginしていないのであればsignin or signup
 */
export const TopTpl: NextComponentType<NextPageContext, null, Props> = ({ onSubmit }) => {
  return <Dashboard />;
};
