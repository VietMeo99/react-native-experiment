import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, PixelRatio} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {View, TouchableOpacity} from 'components/ui';
import {Body1, Caption1, Overline, Title1} from 'components/ui/text/Typography';
import {Colors} from 'themes/colors';
import {AppRouter} from 'constants/router';
import {getNotificationsApi} from 'apis/notification.api';
import {ScreenWidth} from 'themes/size';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  smallButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
  },
  item: {
    width: '100%',
    paddingBottom: 8,
    paddingTop: 10,
    borderBottomWidth: PixelRatio.roundToNearestPixel(1.5),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  title: {flex: 1, color: Colors.neutral6},
});

const initNotifications = Array(10)
  .fill(null)
  .map((i, n) => ({id: n + 1, title: '', time: new Date()}));

const PrivateNotification = () => {
  // const navigation = useNavigation();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const {t} = useTranslation('home');
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] =
    useState<Array<{id: number; title: string; time: Date}>>(initNotifications);

  const renderTitle = useCallback(
    (decisionNumber: string, decisionName: string) => {
      return `[${t('number', {
        number: decisionNumber,
      })}] ${
        decisionName === 'DECISION_PENALIZE'
          ? t('decisionPenalize')
          : decisionName === 'DECISION_APPLY'
            ? t('decisionApply')
            : ''
      }`;
    },
    [t],
  );

  const getNotifications = useCallback(async () => {
    try {
      const response = await getNotificationsApi({
        page: 0,
        size: 5,
        type: 2,
      });
      setNotifications(
        response?.content
          ?.map(item => ({
            id: item.id,
            title: renderTitle(item.decisionNumber, item.decisionType),
            time: item.createdDate ? new Date(item.createdDate) : new Date(),
          }))
          .slice(0, 5) || [],
      );
    } catch (e) {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, [renderTitle]);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const renderItem = useCallback(
    ({item, index}) => (
      <View
        key={item.id}
        style={[
          styles.item,
          {
            borderColor:
              notifications.length - 1 === index
                ? Colors.transparent
                : Colors.neutral2,
          },
        ]}
        // disabled={loading}
        // onPress={() =>
        //   navigation.navigate(AppRouter.NOTIFICATION_DETAIL, { id: item.id })
        // }
      >
        {loading ? (
          <View style={{width: '100%'}} flexRow alignCenter>
            <SkeletonPlaceholder borderRadius={20}>
              <SkeletonPlaceholder.Item width={20} height={20} />
            </SkeletonPlaceholder>
            <View style={{width: 8}} />
            <SkeletonPlaceholder borderRadius={16}>
              <>
                <SkeletonPlaceholder.Item
                  width={ScreenWidth - 76}
                  height={20}
                />
                <SkeletonPlaceholder.Item
                  style={{marginTop: 2}}
                  width={60}
                  height={20}
                />
              </>
            </SkeletonPlaceholder>
          </View>
        ) : (
          <>
            <View style={styles.badge} center mr={2}>
              <Overline
                style={{color: Colors.neutral1}}
                center
                numberOfLines={2}>
                {index + 1}
              </Overline>
            </View>
            <Body1 style={styles.title}>{item.title}</Body1>
          </>
        )}
      </View>
    ),
    [loading, notifications.length],
  );

  return (
    <View mb={16}>
      <View flexRow alignCenter>
        <Title1 style={{flex: 1}}>{t('privateNotification')}</Title1>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => navigation.navigate(AppRouter.SEARCH_VIOLATION_INFO)}>
          <Caption1>{t('viewMore')}</Caption1>
        </TouchableOpacity>
      </View>
      {notifications.map((item, index) => renderItem({item, index}))}
    </View>
  );
};

export default PrivateNotification;
