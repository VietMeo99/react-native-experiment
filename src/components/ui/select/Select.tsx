import {Popover} from 'react-native-popper';
import React, {ReactElement, useCallback, useState, useRef} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleProp,
  TextStyle,
  ViewStyle,
  PixelRatio,
} from 'react-native';
import {TouchableOpacity} from '@components/ui';
import styled, {css} from 'styled-components/native';
import IconChevronDown from 'assets/images/common/ic_chevron_down.svg';
import {Colors} from 'themes/colors';
import {Caption1} from 'components/ui/text/Typography';

export interface Props<OptionType> {
  size?: 'md' | 'lg';
  placeholder?: string;
  type?: 'full' | 'auto';
  options: OptionType[];
  value: OptionType | string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  dropdownIcon?: ReactElement;
  disabled?: boolean;
  closeOnSelect?: boolean;
  menuWidth?: number;

  onChange(option: OptionType): void;
  onBlur?: () => void;

  getLabel?(option: OptionType | string): string | number;

  getValue?(option: OptionType | string): string | number;
}

const TriggerElement = styled(TouchableOpacity)<{
  $type: 'full' | 'auto';
  $focused: boolean;
  $disabled: boolean;
  size: 'md' | 'lg';
}>`
  padding: ${({size}) => (size === 'md' ? '4px 8px' : '10px')};
  background-color: ${({$disabled}) =>
    $disabled ? Colors.neutral2 : 'transparent'};
  border: ${PixelRatio.roundToNearestPixel(1)}px solid
    ${({$disabled}) => ($disabled ? Colors.neutral2 : Colors.neutral3)};
  border-radius: 6px;
  min-height: ${({size}) => (size === 'md' ? 28 : 40)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${props =>
    props.$type === 'full'
      ? css`
          width: 100%;
        `
      : ''}
`;

const Label = styled(Caption1)<{$focused: boolean}>`
  color: ${({$focused}) => ($focused ? Colors.neutral4 : Colors.neutral5)};
`;

const OptionsFlatList = styled(FlatList)`
  border-radius: 6px;
  overflow: hidden;
  max-height: 240px;
  border: ${PixelRatio.roundToNearestPixel(1)}px solid ${Colors.neutral3};
`;

const OptionItem = styled(TouchableOpacity)<{checked: boolean}>`
  padding: ${({size}) => (size === 'md' ? '4px 8px' : '10px')};
  min-height: ${({size}) => (size === 'md' ? 28 : 40)}px;
  flex-direction: row;
  align-items: center;
  background-color: ${({checked}) =>
    checked ? Colors.neutral2 : Colors.white};
`;

const OptionText = styled(Caption1)`
  margin-right: 4px;
  color: ${Colors.neutral5};
`;

function Select<OptionsType>({
  size = 'md',
  type = 'auto',
  options,
  onChange,
  value,
  placeholder = 'Select an option',
  getLabel = (v: any) => v.label,
  getValue = (v: any) => v.value,
  style,
  labelStyle,
  dropdownIcon,
  disabled,
  closeOnSelect = true,
  menuWidth,
  onBlur,
}: Props<{value: string; label: string}>) {
  const [focused, setFocused] = useState(false);
  const width = useRef(120);

  const renderItem = useCallback<
    ListRenderItem<{value: string; label: string}>
  >(
    ({item}) => {
      return (
        <OptionItem
          size={size}
          checked={value && getValue(item) === getValue(value)}
          onPress={() => {
            onChange(item);
            if (closeOnSelect) {
              setFocused(false);
            }
          }}>
          <OptionText>{item.label}</OptionText>
        </OptionItem>
      );
    },
    [size, value, getValue, onChange, closeOnSelect],
  );
  const keyExtractor = useCallback(
    (_item: OptionsType, index) => String(index),
    [],
  );

  return (
    <Popover
      animationExitDuration={0}
      onOpenChange={setFocused}
      isOpen={focused}
      shouldCloseOnOutsideClick={true}
      placement={'bottom right'}
      onRequestClose={() => {
        setFocused(false);
        onBlur?.();
      }}
      trigger={
        <TriggerElement
          $disabled={disabled}
          $type={type}
          style={style}
          size={size}
          $focused={focused}
          disabled={disabled}
          onLayout={e => {
            // @ts-ignore
            width.current = e.nativeEvent.layout.width;
          }}>
          <Label style={[{flex: 1}, labelStyle]}>
            {getLabel(value) ?? placeholder}
          </Label>
          {dropdownIcon ?? <IconChevronDown style={{marginLeft: 10}} />}
        </TriggerElement>
      }>
      <Popover.Backdrop />
      <Popover.Content>
        <OptionsFlatList
          bounces={false}
          style={{width: menuWidth || width.current}}
          contentContainerStyle={{backgroundColor: Colors.neutral1}}
          data={options}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </Popover.Content>
    </Popover>
  );
}

export default Select;
