import { css } from 'styled-components';

type DisplayFlexProps = {
  alignItems?: string;
  justifyContent?: string;
  flexDirection?: string;
};

export const displayFlex = ({
  alignItems = 'center',
  justifyContent = 'center',
  flexDirection = 'column',
}: DisplayFlexProps) => css`
  display: flex;
  align-items: ${alignItems};
  justify-content: ${justifyContent};
  flex-direction: ${flexDirection};
`;

/**
 * @desc flexだとwrapするelementが必要だが、これだと要らないとのこと。
 * @see https://coliss.com/articles/build-websites/operation/css/centering-side-aligned-using-modern-css.html
 */
export const maxInline = ({}) => css`
  max-inline-size: max-content;
  margin-inline: auto;
`;

type PositionAbsProps = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
};

// rightとleftが同居できない。そのため冗長だが4点起点のmixinを作成

/**
 * @desc 左上を起点
 */
export const posUppLeft = ({ top = '0', left = '0' }: PositionAbsProps) => css`
  position: absolute;
  top: ${top};
  left: ${left};
`;

/**
 * @desc 右上を起点
 */
export const posUppRight = ({ top = '0', right = '0' }: PositionAbsProps) => css`
  position: absolute;
  top: ${top};
  right: ${right};
`;

/**
 * @desc 右下を起点
 */
export const posLowRight = ({ right = '0', bottom = '0' }: PositionAbsProps) => css`
  position: absolute;
  right: ${right};
  bottom: ${bottom};
`;

/**
 * @desc 左下を起点
 */
export const posLowLeft = ({ bottom = '0', left = '0' }: PositionAbsProps) => css`
  position: absolute;
  bottom: ${bottom};
  left: ${left};
`;
