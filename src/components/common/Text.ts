import {css} from 'styled-components/native';

export type TextAlignment = Partial<{
  center: boolean;
  left: boolean;
  right: boolean;
  wrap: boolean;
}>;

export const TextAlignmentCss = css<TextAlignment>`
  ${props =>
    props.center &&
    css`
      text-align: center;
    `};
  ${props =>
    props.left &&
    css`
      text-align: left;
    `};
  ${props =>
    props.right &&
    css`
      text-align: right;
    `};
  ${props =>
    props.wrap === false &&
    css`
      white-space: nowrap;
    `};
`;
