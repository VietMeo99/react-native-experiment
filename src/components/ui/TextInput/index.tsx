/* eslint-disable no-shadow */
import React, {useEffect, useMemo, useState} from 'react';
import {
  Image,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import type {InputProps} from './model';

import ic_eye from './icon/eye.png';
import ic_uneye from './icon/uneye.png';
import ic_close from './icon/close.png';

const defaultProps = {
  style: {},
  value: '',
  showIcon: true,
  currency: false,
  numeric: false,
};

const TextInputComponent: InputProps = props => {
  const {
    fontFamily,
    style,
    inputStyle,
    iconStyle,
    labelStyle,
    placeholderStyle = {},
    textErrorStyle,
    value,
    label,
    placeholderTextColor = '#000',
    placeholder = '',
    showIcon,
    mode = 'default',
    textError,
    focusColor,
    onFocus,
    onBlur,
    onChangeText = (_value: string) => {},
    renderLeftIcon,
    renderRightIcon,
  } = props;

  const [text, setText] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [textEntry, setTextEntry] = useState<boolean>(
    mode === 'password' ? true : false,
  );
  const formatNumeric = (num: string) => {
    const values = num.toString().replace(/\D/g, '');
    return values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  useEffect(() => {
    if (value) {
      if (mode === 'numeric') {
        setText(formatNumeric(value));
      } else {
        setText(value);
      }
    } else {
      setText('');
    }
  }, [mode, value]);

  const reConvertNumeric = (x: string) => {
    let s;
    s = x.split('.');
    s = s.join('');
    return s;
  };

  const onChange = (txt: string) => {
    if (mode === 'numeric') {
      setText(formatNumeric(txt));
      onChangeText(reConvertNumeric(txt));
    } else {
      setText(txt);
      onChangeText(txt);
    }
  };

  const onChangeTextEntry = () => {
    setTextEntry(!textEntry);
  };

  const _renderRightIcon = () => {
    if (showIcon) {
      if (renderRightIcon) {
        return renderRightIcon();
      }
      if (text.length > 0) {
        if (mode === 'password') {
          return (
            <TouchableOpacity onPress={onChangeTextEntry}>
              <Image
                source={textEntry ? ic_eye : ic_uneye}
                style={[styles.icon, iconStyle]}
              />
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity onPress={() => onChange('')}>
              <Image source={ic_close} style={[styles.icon, iconStyle]} />
            </TouchableOpacity>
          );
        }
      } else {
        return null;
      }
    }
    return null;
  };

  const font = () => {
    if (fontFamily) {
      return {
        fontFamily: fontFamily,
      };
    } else {
      return {};
    }
  };

  const onFocusCustom = (e: any) => {
    setIsFocus(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const onBlurCustom = (e: any) => {
    setIsFocus(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const colorFocus = useMemo(() => {
    if (isFocus && focusColor) {
      return {
        borderBottomColor: focusColor,
        borderTopColor: focusColor,
        borderLeftColor: focusColor,
        borderRightColor: focusColor,
      };
    } else {
      return {};
    }
  }, [focusColor, isFocus]);

  const styleLable: StyleProp<TextStyle> = useMemo(() => {
    if (isFocus || (text.length > 0 && label)) {
      const styleS: any = labelStyle;
      return {
        top: 5,
        color: isFocus ? focusColor : null,
        ...styleS,
      };
    } else {
      const styleS: any = placeholderStyle;
      return {
        position: 'absolute',
        ...styleS,
      };
    }
  }, [isFocus, text.length, label, focusColor, labelStyle, placeholderStyle]);

  return (
    <>
      <View style={[styles.container, style, colorFocus]}>
        <View style={[styles.textInput]}>
          {renderLeftIcon?.()}
          <View style={styles.wrapInput}>
            {label ? (
              <Text style={[styles.label, styleLable]}>{label}</Text>
            ) : null}
            <TextInput
              secureTextEntry={textEntry}
              {...props}
              style={[styles.input, inputStyle, font()]}
              value={text}
              placeholder={isFocus || !label ? placeholder : ''}
              placeholderTextColor={placeholderTextColor}
              onChangeText={onChange}
              onFocus={onFocusCustom}
              onBlur={onBlurCustom}
            />
          </View>
          {/* {_renderRightIcon()} */}
        </View>
      </View>
      {textError ? (
        <Text style={[styles.textError, textErrorStyle]}>{textError}</Text>
      ) : null}
    </>
  );
};

TextInputComponent.defaultProps = defaultProps;

export default TextInputComponent;
