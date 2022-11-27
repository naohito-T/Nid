import type { NextComponentType, NextPageContext } from 'next';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
  isProgress: boolean;
};

/**
 * @desc Progress
 */
export const Progress: NextComponentType<NextPageContext, null, Props> = ({ isProgress }) => {
  return (
    <Backdrop open={isProgress}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};
