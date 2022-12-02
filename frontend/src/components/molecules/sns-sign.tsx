import type { NextComponentType, NextPageContext } from 'next';
import { SNS } from '@/components/atoms/icon';
import styled, { ThemedStyledProps, DefaultTheme } from 'styled-components';
import Typography from '@mui/material/Typography';
import type { SignFlow } from '@/schema';

type Props = {
  className?: string;
  onClick: (flow: SignFlow) => void;
};

type StyleProps = {
  colorType?: 'white' | 'navy' | 'red';
};

const getStyleType = (props: ThemedStyledProps<StyleProps, DefaultTheme>): string => {
  switch (props.colorType) {
    case 'white':
      return ` `;
    case 'navy':
      return `background: navy;`;
    case 'red':
    default:
      return `background: transparent ;`;
  }
};

const SnsWrapper = styled.div<StyleProps>`
  cursor: pointer;
  position: relative;
  width: 100%;
  padding: 1.5rem 0;
  ${(props) => getStyleType(props)}
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border: 1px solid;
  border-radius: 20px;

  .icon-wrap {
    position: absolute;
    top: 30%;
    left: 2%;
  }
`;

export const SnsSign: NextComponentType<NextPageContext, null, Props & StyleProps> = ({
  className,
  colorType,
  onClick,
}) => {
  return (
    <>
      <SnsWrapper colorType={colorType} onClick={() => onClick('google')}>
        <div className='icon-wrap'>
          <SNS typeIcon='google' fontSize='large' />
        </div>
        <Typography
          component='h6'
          variant='h6'
          sx={{ width: '100%', display: 'flex', 'justify-content': 'center', fontWeight: 'bold' }}
        >
          GoogleでLogin
        </Typography>
      </SnsWrapper>

      <SnsWrapper colorType={colorType} onClick={() => onClick('twitter')}>
        <div className='icon-wrap'>
          <SNS typeIcon='twitter' fontSize='large' />
        </div>
        <Typography
          component='h6'
          variant='h6'
          sx={{ width: '100%', display: 'flex', 'justify-content': 'center', fontWeight: 'bold' }}
        >
          TwitterでLogin
        </Typography>
      </SnsWrapper>

      <SnsWrapper colorType={colorType} onClick={() => onClick('github')}>
        <div className='icon-wrap'>
          <SNS typeIcon='github' fontSize='large' />
        </div>
        <Typography
          component='h6'
          variant='h6'
          sx={{ width: '100%', display: 'flex', 'justify-content': 'center', fontWeight: 'bold' }}
        >
          GitHubでLogin
        </Typography>
      </SnsWrapper>
    </>
  );
};
