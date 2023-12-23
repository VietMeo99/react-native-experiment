import React from 'react';
import {ActivityIndicator} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {AccountParams} from 'models/routes';
import {AccountRouter} from 'constants/router';
import Account from 'screens/account/Account';
import UpdateAccount from 'screens/account/UpdateAccount';
import {TouchableOpacity} from 'components/ui';
import {Body1} from 'components/ui/text/Typography';
import {navigationService} from 'utils/navigation.util';
import IconPencilSquare from 'assets/images/account/ic_pencil_square.svg';
import {Colors} from 'themes/colors';
import useForm from 'hooks/useForm';

const Stack = createNativeStackNavigator<AccountParams>();

const AccountRoutes = () => {
  const {t} = useTranslation('account');
  const {submitting, setSubmitting} = useForm();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: true,
        headerBackTitleVisible: false,
        headerTintColor: Colors.neutral5,
        headerTitleStyle: {fontSize: 14},
        // headerTitleStyle: {fontSize: 14, lineHeight: 20},
      }}>
      <Stack.Screen
        name={AccountRouter.ACCOUNT_INFO}
        component={Account}
        options={{
          title: t('account'),
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigationService.navigator?.navigate(
                  AccountRouter.UPDATE_ACCOUNT_INFO,
                )
              }>
              <IconPencilSquare />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name={AccountRouter.UPDATE_ACCOUNT_INFO}
        component={UpdateAccount}
        options={{
          title: t('editAccount'),
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity
              disabled={submitting}
              onPress={() => setSubmitting(true)}>
              {submitting ? (
                <ActivityIndicator color={Colors.neutral5} size={'small'} />
              ) : (
                <Body1
                  style={{
                    color: Colors.primary,
                  }}>
                  {t('save')}
                </Body1>
              )}
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountRoutes;
