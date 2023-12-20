import React, {
  forwardRef,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  StyleProp,
  TextInput,
  PixelRatio,
  TextInputProps,
  TextStyle,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';
import {Colors} from 'themes/colors';
import {getFonts, NotoSans} from 'themes/fonts';
import View from 'components/ui/view/View';
import IconEye from 'assets/images/common/ic_eye.svg';
import IconEyeSlash from 'assets/images/common/ic_eye_slash.svg';
import {mergeRefs} from 'utils/common/common.util';
import TouchableOpacity from 'components/ui/touchable-opacity/TouchableOpacity';
import {v4 as uuid} from 'uuid';

const InputContainer = styled(View)`
  position: relative;
  flex-direction: row;
  align-items: center;
  height: 40px;
  padding-horizontal: 10px;
  border-radius: 8px;
  border: ${PixelRatio.roundToNearestPixel(1)}px solid
    ${({focused, editable, isError}) =>
      !editable
        ? Colors.neutral2
        : focused
          ? Colors.primary
          : isError
            ? Colors.secondary1
            : Colors.neutral3};
  background-color: ${({editable}) =>
    !editable ? Colors.neutral2 : Colors.transparent};
`;

const InnerInput = styled(TextInput)`
  flex: 1;
  font-family: ${getFonts(NotoSans, '400')};
  font-size: 14px;
  line-height: 20px;
  color: ${({editable}) => (!editable ? Colors.neutral4 : Colors.neutral5)};
  height: 100%;
  padding-vertical: 0;
  width: 100%;
  text-align: left;
`;

const Prefix = styled(View)`
  margin-right: 10px;
`;

const Suffix = styled(View)`
  margin-left: 10px;
`;

const ClearInputContainer = styled(TouchableOpacity)`
  margin-left: 10px;
  z-index: 99;
`;

export interface InputProps extends TextInputProps {
  renderSuffix?: () => ReactElement;
  renderPrefix?: () => ReactElement;
  style?: StyleProp<ViewStyle>;
  checkNotLogin?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  clearable?: boolean;
  isError?: boolean;
}

const Input = forwardRef<any, InputProps>(
  (
    {
      renderSuffix,
      renderPrefix,
      inputStyle = {},
      style,
      value,
      onChangeText,
      secureTextEntry,
      editable = true,
      isError = false,
      ...other
    },
    _forwardRef,
  ) => {
    const inputId = useRef(uuid()).current;
    const [hidePassword, setHidePassword] = useState(true);
    const [focused, setFocused] = useState(false);
    const ref = useRef(null);

    const defaultRenderSuffix = useCallback(() => {
      if (secureTextEntry) {
        return (
          <ClearInputContainer
            onPress={() => setHidePassword(p => !p)}
            hitSlop={{top: 5, left: 5, right: 5, bottom: 5}}>
            {/* {hidePassword ? <IconEyeSlash /> : <IconEye />} */}
          </ClearInputContainer>
        );
      }
      return <></>;
    }, [secureTextEntry, hidePassword]);

    return (
      <TouchableWithoutFeedback
        onPress={() => (editable ? (ref.current as any)?.focus() : undefined)}>
        <InputContainer
          style={style}
          focused={focused}
          editable={!!editable}
          isError={isError}>
          {renderPrefix && <Prefix flexShrink={1}>{renderPrefix()}</Prefix>}
          <InnerInput
            inputAccessoryViewID={inputId}
            ref={mergeRefs([ref, _forwardRef])}
            style={inputStyle}
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholderTextColor={Colors.neutral4}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry ? hidePassword : false}
            editable={editable}
            {...other}
            onFocus={(e: any) => {
              setFocused(true);
              other.onFocus?.(e);
            }}
            onBlur={(e: any) => {
              setFocused(false);
              other.onBlur?.(e);
            }}
          />
          {defaultRenderSuffix()}
          {renderSuffix && <Suffix flexShrink={1}>{renderSuffix()}</Suffix>}
        </InputContainer>
      </TouchableWithoutFeedback>
    );
  },
);

export default React.memo(Input);
