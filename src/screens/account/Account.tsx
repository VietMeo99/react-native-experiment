import React, {useState, useCallback, useEffect} from 'react';
import {
  RefreshControl,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';
import format from 'date-fns/format';

import {Colors} from 'themes/colors';
import {Button, TouchableOpacity, View} from 'components/ui';
import {Caption1, H2, Title1, Title2} from 'components/ui/text/Typography';
import BottomSheet from 'components/ui/bottom-sheet/BottomSheet';
import IconAvatar from 'assets/images/account/ic_avatar.svg';
import IconCamera from 'assets/images/account/ic_camera.svg';
import {AppRouter} from 'constants/router';
import {tokenManager} from 'utils/tokenManager';
import {getProfileApi} from 'apis/account.api';
import {
  getFileByObjectApi,
  downloadFileApi,
  applyFileApi,
  uploadFileApi,
} from 'apis/file.api';
import Alert from 'utils/alertManager';
import {getMessageFromError} from 'utils/common/common.util';
import {ScreenWidth} from 'themes/size';
import {ObjectType} from 'models/file.model';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  avatar: {width: 64, height: 64, marginBottom: 8, position: 'relative'},
  avatarBorder: {
    width: 64,
    height: 64,
    borderColor: Colors.neutral2,
    borderWidth: 1,
    borderRadius: 64,
  },
  camera: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  item: {marginBottom: 28},
  field: {flex: 1},
  uploadField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: Colors.neutral3,
    borderBottomWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});

const Account = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {t} = useTranslation('account');
  const [profile, setProfile] = useState<{
    id: number;
    avatar: string;
    name: string;
    username: string;
    gender: string;
    birthday: string;
    phoneNumber: string;
    email: string;
    position: string;
    unitName: string;
  }>({
    id: 0,
    avatar: '',
    name: '',
    username: '',
    gender: '',
    birthday: '',
    phoneNumber: '',
    email: '',
    position: '',
    unitName: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [file, setFile] = useState<Asset | undefined>();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const profileResponse = await getProfileApi();
      const fileResponse = await getFileByObjectApi({
        objectId: String(profileResponse.id),
        objectType: ObjectType.Profile,
      });
      let avatar = '';
      if (fileResponse.length) {
        const currentIndex = fileResponse.length - 1;
        const response = await downloadFileApi({
          id: fileResponse[currentIndex].id,
          name: fileResponse[currentIndex].fileName,
        });
        avatar =
          Platform.OS === 'android'
            ? 'file://' + response.path()
            : '' + response.path();
      }
      setProfile({
        id: profileResponse?.id,
        avatar,
        name: profileResponse?.fullName,
        username: profileResponse?.username,
        gender: !profileResponse?.gender ? t('male') : t('female'),
        birthday: profileResponse?.birthday
          ? format(new Date(profileResponse?.birthday), 'dd/MM/yyyy')
          : '',
        phoneNumber: profileResponse?.phoneNumber,
        email: profileResponse?.email,
        position: profileResponse?.position,
        unitName: profileResponse?.unit?.unitName || '',
      });
    } catch (e: any) {
      Alert.alert(t('notification', {ns: 'common'}), getMessageFromError(e));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (isFocused) {
      getProfile();
    }
  }, [isFocused, getProfile]);

  const handleLogout = useCallback(() => {
    tokenManager.doLogout();
  }, []);

  const handleTakePhoto = useCallback(async () => {
    try {
      const response = await launchCamera({
        mediaType: 'photo',
      });
      setFile(response?.assets?.[0]);
    } catch (e) {
      // TODO: Show Error
    }
  }, []);

  const handleChooseFromLibrary = useCallback(async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
      });
      setFile(response?.assets?.[0]);
    } catch (e) {
      // TODO: Show Error
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      if (file) {
        const response = await uploadFileApi(file, {
          objectType: ObjectType.Profile,
        });
        await applyFileApi({
          listFileIds: [response?.id],
          objectType: ObjectType.Profile,
          objectId: String(profile.id),
        });
      }
    } catch (e: any) {
      Alert.alert(t('notification', {ns: 'common'}), getMessageFromError(e));
    }
  }, [file, profile.id, t]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  const renderItem = useCallback(
    ({title, value}) => (
      <View style={styles.item} flexRow>
        {loading ? (
          <>
            <View flex={1}>
              <SkeletonPlaceholder borderRadius={16}>
                <SkeletonPlaceholder.Item width={100} height={20} />
              </SkeletonPlaceholder>
            </View>
            <View flex={1}>
              <SkeletonPlaceholder borderRadius={16}>
                <SkeletonPlaceholder.Item
                  width={ScreenWidth / 2 - 48}
                  height={20}
                />
              </SkeletonPlaceholder>
            </View>
          </>
        ) : (
          <>
            <Caption1 style={styles.field}>{title}</Caption1>
            <Title2 style={styles.field}>{value}</Title2>
          </>
        )}
      </View>
    ),
    [loading],
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getProfile} />
      }>
      <View flex={1}>
        <View center>
          <BottomSheet
            renderContent={({onClose}) => (
              <View flex={1} pt={5} pb={8}>
                <H2 center style={{marginBottom: 24}}>
                  {t('updateAvatar')}
                </H2>
                <TouchableOpacity
                  style={[styles.uploadField, {borderTopWidth: 1}]}
                  onPress={() => {
                    handleTakePhoto();
                    onClose();
                  }}>
                  <Title1>{t('takePhoto')}</Title1>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.uploadField}
                  onPress={() => {
                    handleChooseFromLibrary();
                    onClose();
                  }}>
                  <Title1>{t('chooseFromLibrary')}</Title1>
                </TouchableOpacity>
              </View>
            )}>
            {({onOpen}) => (
              <TouchableOpacity style={styles.avatar} onPress={onOpen}>
                {file || profile.avatar ? (
                  <Image
                    style={styles.avatarBorder}
                    source={{uri: file?.uri || profile.avatar}}
                  />
                ) : (
                  <View style={styles.avatarBorder}>
                    <IconAvatar />
                  </View>
                )}
                <View style={styles.camera} center>
                  <IconCamera />
                </View>
              </TouchableOpacity>
            )}
          </BottomSheet>
        </View>
        {loading ? (
          <View center mb={6}>
            <SkeletonPlaceholder borderRadius={16}>
              <SkeletonPlaceholder.Item
                width={ScreenWidth / 2 - 48}
                height={20}
              />
            </SkeletonPlaceholder>
          </View>
        ) : (
          <Title2 center style={{marginBottom: 24}}>
            {profile.name}
          </Title2>
        )}
        {renderItem({title: t('username'), value: profile.username})}
        {renderItem({title: t('gender'), value: profile.gender})}
        {renderItem({title: t('dateOfBirth'), value: profile.birthday})}
        {renderItem({title: t('phoneNumber'), value: profile.phoneNumber})}
        {renderItem({title: t('email'), value: profile.email})}
        {renderItem({title: t('position'), value: profile.position})}
        {renderItem({title: t('employment'), value: profile.unitName})}
      </View>
      <View mb={8}>
        <Button
          variant="secondary"
          onPress={() => navigation.navigate(AppRouter.CHANGE_PASSWORD)}>
          {t('changePassword')}
        </Button>
        <Button
          variant="transparent"
          style={{marginTop: 12}}
          textStyle={{color: Colors.secondary1}}
          onPress={handleLogout}>
          {t('logout')}
        </Button>
      </View>
    </ScrollView>
  );
};

export default Account;
