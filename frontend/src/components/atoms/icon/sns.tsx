import type { NextComponentType, NextPageContext } from 'next';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

type Props = {
  typeIcon: Required<string>;
  fontSize?: 'small' | 'inherit' | 'large' | 'medium' | undefined;
};

/**
 * @desc Progress
 */
export const SNS: NextComponentType<NextPageContext, null, Props> = ({
  typeIcon,
  fontSize = 'small',
}) => {
  switch (typeIcon) {
    case 'google':
      return <GoogleIcon fontSize={fontSize} />;
    case 'twitter':
      return <TwitterIcon fontSize={fontSize} />;
    case 'github':
      return <GitHubIcon fontSize={fontSize} />;
    default:
      return <></>;
  }
};
