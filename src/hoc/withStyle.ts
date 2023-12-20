import {ComponentType} from 'react';
import styled from 'styled-components/native';
import {TextAlignment, TextAlignmentCss} from '@components/common/Text';
import {
  Flex,
  FlexCss,
  Position,
  PositionCss,
} from '@components/common/Position';
import {SpaceCss, Spacing} from '@components/common/Spacing';

export function withTextAlignment<T>(Component: ComponentType<T>) {
  return styled(Component)<TextAlignment>`
    ${TextAlignmentCss}
  `;
}

export function withFlex<T>(Component: ComponentType<T>) {
  return styled(Component)<Flex>`
    ${FlexCss}
  `;
}

export function withPosition<T>(Component: ComponentType<T>) {
  return styled(Component)<Position>`
    ${PositionCss}
  `;
}

export function withSpacing<T>(Component: ComponentType<T>) {
  return styled(Component)<Spacing>`
    ${SpaceCss}
  `;
}

export function withAllStyleUtils<T>(Component: ComponentType<T>) {
  return styled(Component)<Spacing & Flex & Position>`
    ${SpaceCss}
    ${PositionCss}
    ${FlexCss}
  `;
}
