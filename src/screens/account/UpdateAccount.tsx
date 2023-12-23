import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Image,
  TextInput,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';

import {Colors} from 'themes/colors';
import {Input, TouchableOpacity, View} from 'components/ui';
import {Caption1, H2, Title1} from 'components/ui/text/Typography';
import Select from 'components/ui/select/Select';
import DatePicker from 'components/ui/date-picker/DatePicker';
import IconAvatar from 'assets/images/account/ic_avatar.svg';
import IconCamera from 'assets/images/account/ic_camera.svg';
import IconPencil from 'assets/images/account/ic_pencil.svg';
import {getProfileApi, updateProfileApi} from 'apis/account.api';
import Alert from 'utils/alertManager';
import {getMessageFromError} from 'utils/common/common.util';
import useForm from 'hooks/useForm';
import {AccountRouter} from 'constants/router';
import BottomSheet from 'components/ui/bottom-sheet/BottomSheet';
import {
  applyFileApi,
  downloadFileApi,
  getFileByObjectApi,
  uploadFileApi,
} from 'apis/file.api';
import {getFonts, NotoSans} from 'themes/fonts';
import {ObjectType} from 'models/file.model';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  wrapper: {flex: 1},
  avatar: {
    width: 64,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
  },
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
  item: {marginBottom: 16},
  field: {marginBottom: 4},
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

const UpdateAccount = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {t} = useTranslation('account');
  const [profile, setProfile] = useState<{
    id: number;
    avatar: string;
    name: string;
    username: string;
    gender: string;
    birthday: Date | string;
    phoneNumber: string;
    email: string;
    position: string;
    unitName: string;
  }>({
    id: 0,
    avatar: '',
    name: '',
    username: '',
    gender: '0',
    birthday: '',
    phoneNumber: '',
    email: '',
    position: '',
    unitName: '',
  });
  const [file, setFile] = useState<Asset | undefined>();
  const [editable, setEditable] = useState<boolean>(false);
  const inputRef = useRef<any>();
  const {submitting, setSubmitting} = useForm();

  const genderOptions = useMemo(() => {
    return [
      {value: '0', label: t('male')},
      {value: '1', label: t('female')},
    ];
  }, [t]);

  const getProfile = useCallback(async () => {
    try {
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
        gender: !profileResponse?.gender ? '0' : '1',
        birthday: new Date(profileResponse?.birthday),
        phoneNumber: profileResponse?.phoneNumber,
        email: profileResponse?.email,
        position: profileResponse?.position,
        unitName: profileResponse?.unit?.unitName || '',
      });
    } catch (e: any) {
      Alert.alert(t('notification', {ns: 'common'}), getMessageFromError(e));
    }
  }, [t]);

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

  useEffect(() => {
    if (isFocused) {
      getProfile();
    }
  }, [isFocused, getProfile]);

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
      await updateProfileApi({
        id: profile.id,
        name: profile.name,
        gender: profile.gender,
        birthday: profile.birthday as Date,
        phoneNumber: profile.phoneNumber,
        email: profile.email,
      });
      navigation.navigate(AccountRouter.ACCOUNT_INFO);
    } catch (e: any) {
      Alert.alert(t('notification', {ns: 'common'}), getMessageFromError(e));
    } finally {
      setSubmitting(false);
    }
  }, [
    file,
    profile.id,
    profile.name,
    profile.gender,
    profile.birthday,
    profile.phoneNumber,
    profile.email,
    navigation,
    t,
    setSubmitting,
  ]);

  useEffect(() => {
    if (submitting) {
      handleSubmit();
    }
  }, [handleSubmit, submitting]);

  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>
      <KeyboardAvoidingView style={styles.wrapper} behavior={'padding'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
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
              <View mb={6} flexRow center>
                <TextInput
                  ref={inputRef}
                  editable={editable}
                  style={{
                    fontSize: 16,
                    lineHeight: 20,
                    fontFamily: getFonts(NotoSans, '500', 'normal'),
                    marginRight: 4,
                    color: Colors.neutral6,
                  }}
                  value={profile.name}
                  onChangeText={v => setProfile(p => ({...p, name: v}))}
                />
                <TouchableOpacity
                  onPress={() => {
                    setEditable(p => !p);
                  }}>
                  <IconPencil />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.item}>
              <Caption1 style={styles.field}>{t('username')}</Caption1>
              <Input value={profile.username} editable={false} />
            </View>
            <View style={styles.item}>
              <Caption1 style={styles.field}>{t('gender')}</Caption1>
              <Select
                size={'lg'}
                value={
                  genderOptions.find(item => item.value === profile.gender) ||
                  ''
                }
                options={genderOptions}
                onChange={value =>
                  setProfile(p => ({...p, gender: value.value}))
                }
              />
            </View>
            <View style={styles.item}>
              <Caption1 style={styles.field}>{t('dateOfBirth')}</Caption1>
              <DatePicker
                value={profile.birthday as Date}
                onChange={value =>
                  setProfile(p => ({...p, birthday: value as Date}))
                }
              />
            </View>
            <View style={styles.item}>
              <Caption1 style={styles.field}>{t('phoneNumber')}</Caption1>
              <Input
                value={profile.phoneNumber}
                keyboardType="phone-pad"
                maxLength={12}
                onChangeText={value =>
                  setProfile(p => ({...p, phoneNumber: value}))
                }
              />
            </View>
            <View style={styles.item}>
              <Caption1 style={styles.field}>{t('email')}</Caption1>
              <Input
                value={profile.email}
                keyboardType="email-address"
                maxLength={100}
                onChangeText={value => setProfile(p => ({...p, email: value}))}
              />
            </View>
            <View style={styles.item}>
              <Caption1 style={styles.field}>{t('position')}</Caption1>
              <Input value={profile.position} editable={false} />
            </View>
            <View mb={6}>
              <Caption1 style={styles.field}>{t('employment')}</Caption1>
              <Input value={profile.unitName} editable={false} />
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default UpdateAccount;
