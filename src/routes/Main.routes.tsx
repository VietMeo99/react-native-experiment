import React from 'react';
import HeaderBackButton from '@react-navigation/elements/src/Header/HeaderBackButton';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';

import Home from 'screens/home/Home';
import Search from 'screens/search/Search';
import AccountRoutes from './Account.routes';
import Penalize from 'screens/penalize/Penalize';
import SearchTitle from 'components/search/title/SearchTitle';
// TODO: remove
// import Handle from 'screens/handle/Handle';
import Handle from 'screens/home/Home';
import Bell from 'components/notification/Bell';
import {Caption2} from 'components/ui/text/Typography';
import {TouchableOpacity, View} from 'components/ui';
import IconHome from 'assets/images/tab-bar/ic_home.svg';
import IconHomeActive from 'assets/images/tab-bar/ic_home_active.svg';
import IconBanknotes from 'assets/images/tab-bar/ic_banknotes.svg';
import IconBanknotesActive from 'assets/images/tab-bar/ic_banknotes_active.svg';
import IconMagnifyingGlassWhite from 'assets/images/tab-bar/ic_magnifying_glass_white.svg';
import IconClipboardDocumentList from 'assets/images/tab-bar/ic_clipboard_document_list.svg';
import IconClipboardDocumentListActive from 'assets/images/tab-bar/ic_clipboard_document_list_active.svg';
import IconUser from 'assets/images/tab-bar/ic_user.svg';
import IconUserActive from 'assets/images/tab-bar/ic_user_active.svg';
import IconAdjustmentsHorizontal from 'assets/images/common/ic_adjustments_horizontal.svg';
import {navigationService, replaceAndResetRoutes} from 'utils/navigation.util';
import {AppRouter} from 'constants/router';
import {Colors} from 'themes/colors';
import useCachedParams from 'hooks/useCachedParams';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const {t} = useTranslation();
  const {resetCachedParams} = useCachedParams();

  return (
    <Tab.Navigator
      initialRouteName={AppRouter.HOME}
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerTintColor: Colors.neutral5,
        headerTitleStyle: {fontSize: 14, lineHeight: 20},
        headerTitleAlign: 'center',
        headerShadowVisible: true,
      }}>
      <Tab.Screen
        name={AppRouter.HOME}
        component={Home}
        options={{
          title: t('home:home'),
          tabBarLabel: ({focused}) => (
            <Caption2
              style={{color: focused ? Colors.primary : Colors.neutral4}}>
              {focused ? '●' : t('home:home')}
            </Caption2>
          ),
          tabBarIcon: ({focused}) =>
            focused ? <IconHomeActive /> : <IconHome />,
          headerRight: () => <Bell />,
        }}
      />
      <Tab.Screen
        name={AppRouter.PENALIZE}
        component={Penalize}
        options={{
          headerTitle: () => (
            <SearchTitle
              title={t('penalize:penalizeVPHCFull')}
              tabHeaderShown={true}
            />
          ),
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              labelVisible={false}
              onPress={() => {
                resetCachedParams();
                replaceAndResetRoutes(AppRouter.HOME);
              }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() =>
                navigationService.navigator?.navigate(AppRouter.PENALIZE_FILTER)
              }>
              <IconAdjustmentsHorizontal />
            </TouchableOpacity>
          ),
          tabBarStyle: {display: 'none'},
          tabBarLabel: ({focused}) => (
            <Caption2
              style={{color: focused ? Colors.primary : Colors.neutral4}}>
              {focused ? '●' : t('penalize:penalize')}
            </Caption2>
          ),
          tabBarIcon: ({focused}) =>
            focused ? <IconBanknotesActive /> : <IconBanknotes />,
        }}
      />
      <Tab.Screen
        name={AppRouter.SEARCH}
        component={Search}
        options={{
          title: t('search:lookUp'),
          tabBarLabel: '',
          tabBarLabelStyle: {display: 'none'},
          tabBarIcon: ({focused}) => (
            <View
              center
              style={{
                backgroundColor: Colors.primary,
                width: 45,
                height: 45,
                borderRadius: 45,
                borderColor: focused ? Colors.primaryLighter : Colors.white,
                borderWidth: 5,
              }}>
              <IconMagnifyingGlassWhite />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={AppRouter.HANDLE}
        component={Handle}
        options={{
          headerTitle: () => (
            <SearchTitle
              title={t('handle:handleVPHCFull')}
              tabHeaderShown={true}
            />
          ),
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              labelVisible={false}
              onPress={() => {
                resetCachedParams();
                replaceAndResetRoutes(AppRouter.HOME);
              }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() =>
                navigationService.navigator?.navigate(AppRouter.HANDLE_FILTER)
              }>
              <IconAdjustmentsHorizontal />
            </TouchableOpacity>
          ),
          tabBarStyle: {display: 'none'},
          tabBarLabel: ({focused}) => (
            <Caption2
              style={{color: focused ? Colors.primary : Colors.neutral4}}>
              {focused ? '●' : t('handle:handle')}
            </Caption2>
          ),
          tabBarIcon: ({focused}) =>
            focused ? (
              <IconClipboardDocumentListActive />
            ) : (
              <IconClipboardDocumentList />
            ),
        }}
      />
      <Tab.Screen
        name={AppRouter.ACCOUNT}
        component={AccountRoutes}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Caption2
              style={{color: focused ? Colors.primary : Colors.neutral4}}>
              {focused ? '●' : t('account:account')}
            </Caption2>
          ),
          tabBarIcon: ({focused}) =>
            focused ? <IconUserActive /> : <IconUser />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
