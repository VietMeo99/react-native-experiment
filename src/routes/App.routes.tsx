import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppRouter} from 'constants/router';
import useAuthContext, {AuthContextValues} from 'hooks/useAuth';
import {AppRootParams} from 'models/routes';
import React from 'react';
import {Colors} from 'themes/colors';

// const noop = () => <View />;

const Stack = createNativeStackNavigator<AppRootParams>();

const AppRoutes = () => {
  // const {t} = useTranslation();
  const {token} = useAuthContext() as AuthContextValues;
  // const {buttonRight} = useHeader();

  return (
    <Stack.Navigator
      initialRouteName={AppRouter.MAIN}
      screenOptions={{
        headerShadowVisible: true,
        headerBackTitleVisible: false,
        headerTintColor: Colors.neutral5,
        headerTitleStyle: {fontSize: 14},
        headerTitleAlign: 'center',
      }}>
      {!token ? (
        <>
          <Stack.Screen
            name={AppRouter.LOGIN}
            component={() => <view>Login</view>}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={AppRouter.REGISTER}
            component={() => <view>Register</view>}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={AppRouter.REGISTER_SUCCESS}
            component={() => <view>RegisterSuccess</view>}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen
            name={AppRouter.LOGIN}
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={AppRouter.REGISTER}
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={AppRouter.REGISTER_SUCCESS}
            component={RegisterSuccess}
            options={{headerShown: false}}
          /> */}
          {/* <Stack.Screen
            name={AppRouter.FORGOT_PASSWORD}
            component={ForgotPassword}
            options={{title: t('auth:passwordRetrieval')}}
          /> */}
          {/* <Stack.Screen
            name={AppRouter.PASSWORD_SENT_TO_EMAIL}
            component={PasswordSentToEmail}
            options={{title: t('auth:passwordRetrieval'), headerLeft: noop}}
          /> */}
        </>
      ) : (
        <>
          {/* <Stack.Screen
            name={AppRouter.CHANGE_PASSWORD}
            component={ChangePassword}
            options={{title: t('password:changePassword')}}
          />
          <Stack.Screen
            name={AppRouter.MAIN}
            component={MainTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={AppRouter.PENALIZE_FILTER}
            component={PenalizeFilter}
            options={{title: t('penalize:advanceFilter')}}
          />
          <Stack.Screen
            name={AppRouter.VIEW_PENALIZE_INFO}
            component={ViewPenalizeInfo}
            options={{
              title: t('penalize:viewPenalizeVPHCInfo'),
              headerRight: () => buttonRight,
            }}
          />
          <Stack.Screen
            name={AppRouter.ADMINISTRATIVE_PENALIZE_VIOLATION_DETAIL}
            component={AdministrativePenalizeViolationDetail}
            options={{
              title: t('penalize:administrativePenalizeViolationDetail'),
              headerRight: () => buttonRight,
            }}
          />
          <Stack.Screen
            name={AppRouter.HANDLE_FILTER}
            component={HandleFilter}
            options={{title: t('handle:advanceFilter')}}
          />
          <Stack.Screen
            name={AppRouter.SUGGESTION_PROFILE_DETAIL}
            component={SuggestionProfileDetail}
            options={{title: t('handle:suggestionProfileDetail')}}
          />
          <Stack.Screen
            name={AppRouter.VIEW_HANDLE_INFO}
            component={ViewHandleInfo}
            options={{
              title: t('handle:viewHandleVPHCInfo'),
              headerRight: () => buttonRight,
            }}
          />
          <Stack.Screen
            name={AppRouter.ADMINISTRATIVE_HANDLING_VIOLATION_DETAIL}
            component={AdministrativeHandlingViolationDetail}
            options={{
              title: t('handle:administrativeHandlingViolationDetail'),
              headerRight: () => buttonRight,
            }}
          />
          <Stack.Screen
            name={AppRouter.SEARCH_VIOLATION_INFO}
            component={SearchViolationInfo}
            options={{
              headerTitle: () => (
                <SearchTitle title={t('search:searchViolationInfo')} />
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() =>
                    navigationService.navigator.navigate(
                      AppRouter.VIOLATION_INFO_FILTER,
                    )
                  }>
                  <IconAdjustmentsHorizontal />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name={AppRouter.VIOLATION_INFO_FILTER}
            component={ViolationInfoFilter}
            options={{title: t('search:advanceFilter')}}
          />
          <Stack.Screen
            name={AppRouter.DOCUMENT_LIST}
            component={DocumentList}
            options={{
              headerTitle: () => (
                <SearchTitle title={t('search:documentList')} />
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() =>
                    navigationService.navigator.navigate(
                      AppRouter.DOCUMENT_FILTER,
                    )
                  }>
                  <IconAdjustmentsHorizontal />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name={AppRouter.DOCUMENT_FILTER}
            component={DocumentFilter}
            options={{title: t('search:advanceFilter')}}
          />
          <Stack.Screen
            name={AppRouter.VIEW_DOCUMENT}
            component={ViewDocument}
            options={{title: t('search:viewDocument')}}
          />
          <Stack.Screen
            name={AppRouter.CRIMINAL_HANDLING_VIOLATION_LIST}
            component={CriminalHandlingViolationList}
            options={{
              headerTitle: () => (
                <SearchTitle
                  title={t('search:criminalHandlingViolationList')}
                />
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() =>
                    navigationService.navigator.navigate(
                      AppRouter.CRIMINAL_HANDLING_VIOLATION_FILTER,
                    )
                  }>
                  <IconAdjustmentsHorizontal />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name={AppRouter.CRIMINAL_HANDLING_VIOLATION_FILTER}
            component={CriminalHandlingViolationFilter}
            options={{title: t('search:advanceFilter')}}
          />
          <Stack.Screen
            name={AppRouter.VIEW_CRIMINAL_HANDLING_VIOLATION}
            component={ViewCriminalHandlingViolation}
            options={{title: t('search:viewCriminalHandlingViolation')}}
          />
          <Stack.Screen
            name={AppRouter.NOTIFICATIONS}
            component={Notifications}
            options={{
              headerTitle: () => (
                <SearchTitle
                  title={t('notification:notification')}
                  headerRightShown={true}
                />
              ),
            }}
          />
          <Stack.Screen
            name={AppRouter.NOTIFICATION_DETAIL}
            component={NotificationDetail}
            options={{title: t('notification:notificationDetail')}}
          /> */}
        </>
      )}
      {/* <Stack.Screen
        name={AppRouter.PASSWORD_UPDATED}
        component={PasswordUpdated}
        options={{title: t('password:changePassword'), headerLeft: noop}}
      /> */}
    </Stack.Navigator>
  );
};

export default AppRoutes;
