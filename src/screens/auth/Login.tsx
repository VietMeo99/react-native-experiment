import React, {useState, useRef, useMemo, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Recaptcha, {RecaptchaRef} from 'react-native-recaptcha-that-works';

import {View, Button, TextInput, Text} from 'components/ui';
import FormikInput from 'components/ui/input/FormikInput';
import {H1, Body1} from 'components/ui/text/Typography';
import IconUser from 'assets/images/auth/ic_user.svg';
import IconLock from 'assets/images/auth/ic_lock.svg';
import {Colors} from 'themes/colors';
import {AppRouter} from 'constants/router';
import {loginApi, loginWso2isApi, verifyRecaptchaApi} from 'apis/auth.api';
import useAuth from 'hooks/useAuth';
import CONFIG from 'config';
import Alert from 'utils/alertManager';
import {getMessageFromError} from 'utils/common/common.util';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  full: {width: '100%'},
  marginBottom: {marginBottom: 20},
  text: {color: Colors.neutral5, marginBottom: 32},
  error: {color: Colors.secondary1, marginBottom: 8},
});

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const navigation = useNavigation();
  // const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {t} = useTranslation('auth');
  const {setToken} = useAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const formikRef = useRef(null);
  const captchaRef = useRef<RecaptchaRef | null>(null);

  const loginFormSchema = useMemo(() => {
    return Yup.object().shape({
      username: Yup.string().trim().required(t('usernameRequired')),
      password: Yup.string().required(t('passwordRequired')),
    });
  }, [t]);

  const onSubmit = useCallback(
    async (values: LoginForm) => {
      Keyboard.dismiss();
      setError('');
      setLoading(true);
      try {
        const response = await loginApi(values);
        await loginWso2isApi(response?.accessTokenInfo.accessToken);
        setToken(
          response?.accessTokenInfo.accessToken,
          response?.accessTokenInfo.refreshToken,
        );
      } catch (e: any) {
        if (e?.response?.data?.code === 401) {
          if (e?.response?.data?.message) {
            setError(String(e?.response?.data?.message));
          } else if (count < 10) {
            setError(t('loginInvalid'));
          } else if (count >= 10) {
            setError(t('blockedAccount'));
          }
          setCount(p => p + 1);
        } else {
          Alert.alert(
            t('notification', {ns: 'common'}),
            getMessageFromError(e),
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [count, setToken, t],
  );

  useEffect(() => {
    if (count >= 5) {
      setDisabled(true);
      captchaRef.current?.open();
    }
  }, [count]);

  const onVerify = useCallback(
    async (token: string) => {
      try {
        await verifyRecaptchaApi(token);
        setDisabled(false);
      } catch (e) {
        Alert.alert(
          t('notification', {ns: 'common'}),
          getMessageFromError(e as any),
        );
      }
    },
    [t],
  );

  const onExpire = () => {
    Alert.alert(
      t('notification', {ns: 'common'}),
      t('captchaExpired', {ns: 'common'}),
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View flex={1} px={6} justifyCenter>
          <H1 style={[styles.full, {marginBottom: 8}]}>{t('login')}</H1>
          <Body1 style={[styles.full, styles.text]}>{t('loginWelcome')}</Body1>
          <Formik
            innerRef={formikRef}
            initialValues={{username: '', password: ''}}
            onSubmit={onSubmit}
            validationSchema={loginFormSchema}>
            {({handleSubmit, isValid, dirty}) => (
              <>
                <View style={[styles.full, styles.marginBottom]}>
                  <FormikInput
                    name={'username'}
                    style={styles.full}
                    renderPrefix={() => <IconUser />}
                    placeholder={t('username')}
                  />
                </View>
                <View style={[styles.full, styles.marginBottom]}>
                  <FormikInput
                    name={'password'}
                    secureTextEntry={true}
                    style={styles.full}
                    renderPrefix={() => <IconLock />}
                    placeholder={t('password')}
                  />
                </View>
                {error && (
                  <Body1 style={[styles.full, styles.error]}>{error}</Body1>
                )}
                <View>
                  <Button
                    style={[styles.full, {marginBottom: 10}]}
                    disabled={!isValid || !dirty || disabled}
                    loading={loading}
                    onPress={e => handleSubmit(e as any)}>
                    {t('login')}
                  </Button>
                </View>
              </>
            )}
          </Formik>
          <View flexRow alignCenter justifySpaceBetween>
            <Button
              style={{paddingHorizontal: 0}}
              variant={'transparent'}
              onPress={() => {
                Keyboard.dismiss();
                // navigation.navigate(AppRouter.REGISTER);
                navigation.navigate(AppRouter.REGISTER as never);
              }}>
              {t('register')}
            </Button>
            <Button
              style={{paddingHorizontal: 0}}
              variant={'transparent'}
              onPress={() => {
                Keyboard.dismiss();
                navigation.navigate(AppRouter.FORGOT_PASSWORD as never);
              }}>
              {t('forgotPassword')}
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Recaptcha
        ref={captchaRef}
        siteKey={CONFIG.RECAPTCHA.SITE_KEY}
        baseUrl={CONFIG.RECAPTCHA.DOMAIN}
        onVerify={onVerify}
        onExpire={onExpire}
      />
    </KeyboardAvoidingView>
  );
};

export default Login;
