import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, PixelRatio} from 'react-native';
import {useTranslation} from 'react-i18next';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';

import {View, Button} from 'components/ui';
import {Body1, Caption1, Title1} from 'components/ui/text/Typography';
import BottomSheet from 'components/ui/bottom-sheet/BottomSheet';
import GeneralNotificationFilter from './GeneralNotificationFilter';
import IconAdjustmentsHorizontal from 'assets/images/common/ic_adjustments_horizontal.svg';
import {Colors} from 'themes/colors';
import {getOverallQuantityDecisionApi} from 'apis/home.api';

const styles = StyleSheet.create({
  smallButton: {
    paddingHorizontal: 8,
    borderColor: Colors.neutral3,
  },
  item: {
    width: '100%',
    paddingBottom: 8,
    paddingTop: 10,
    borderBottomWidth: PixelRatio.roundToNearestPixel(1.5),
    borderColor: Colors.neutral2,
  },
  title: {flex: 1, color: Colors.neutral6},
  quantity: {color: Colors.primary},
});

const today = new Date();

const GeneralNotification = () => {
  const {t} = useTranslation('home');
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState<{value: string; label: string}>({
    value: '',
    label: t('all'),
  });
  const [time, setTime] = useState<{month: number; year: number}>({
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });
  const [quantity, setQuantity] = useState<{
    notIssued: number;
    issued: number;
    paused: number;
    partCancelled: number;
    suspended: number;
    exemptCompliance: number;
    forced: number;
    // criminally: number;
    ended: number;
    cancelled: number;
  }>({
    notIssued: 0,
    issued: 0,
    paused: 0,
    partCancelled: 0,
    suspended: 0,
    exemptCompliance: 0,
    forced: 0,
    // criminally: 0,
    ended: 0,
    cancelled: 0,
  });

  const getOverallQuantityDecision = useCallback(async () => {
    try {
      const temp = today;
      temp.setMonth(time.month - 1);
      temp.setFullYear(time.year);
      const response = await getOverallQuantityDecisionApi({
        unitId: unit.value,
        fromTime: String(temp ? startOfMonth(temp).getTime() : ''),
        toTime: String(temp ? endOfMonth(temp).getTime() : ''),
      });
      setQuantity({
        notIssued: response?.qd_chua_ban_hanh || 0,
        issued: response?.da_ban_hanh || 0,
        paused: response?.qd_da_hoan || 0,
        partCancelled: response?.qd_dinh_chinh || 0,
        suspended: response?.qd_dinh_chi || 0,
        exemptCompliance: response?.qd_mien_chap_hanh || 0,
        forced: response?.qd_cuong_che || 0,
        // criminally: response?.qd_truy_cuu_tnhs || 0,
        ended: response?.qd_ket_thuc || 0,
        cancelled: response?.qd_huy_bo || 0,
      });
    } catch (e) {
      // TODO: Show Error
    } finally {
      setLoading(false);
    }
  }, [unit.value]);

  useEffect(() => {
    getOverallQuantityDecision();
  }, [getOverallQuantityDecision]);

  const renderItem = useCallback(
    ({title, value}) => (
      <View style={styles.item} flexRow alignCenter>
        {loading ? (
          <View flex={1}>
            <SkeletonPlaceholder borderRadius={20}>
              <SkeletonPlaceholder.Item width={250} height={20} />
            </SkeletonPlaceholder>
          </View>
        ) : (
          <Body1 style={styles.title} numberOfLines={1}>
            {title}
          </Body1>
        )}
        {loading ? (
          <SkeletonPlaceholder borderRadius={20}>
            <SkeletonPlaceholder.Item width={20} height={20} />
          </SkeletonPlaceholder>
        ) : (
          <Caption1 style={styles.quantity}>{value}</Caption1>
        )}
      </View>
    ),
    [loading],
  );

  return (
    <View mb={6}>
      <View flexRow alignCenter>
        <Title1 style={{flex: 1}}>{t('generalNotification')}</Title1>
        <BottomSheet
          renderContent={() => (
            <GeneralNotificationFilter
              time={time}
              unit={unit}
              setTime={setTime}
              setUnit={setUnit}
            />
          )}>
          {({onOpen}) => (
            <Button
              style={styles.smallButton}
              variant={'secondary'}
              height={28}
              onPress={onOpen}>
              <Caption1 style={{marginRight: 14}}>{t('filter')}</Caption1>
              <IconAdjustmentsHorizontal />
            </Button>
          )}
        </BottomSheet>
      </View>
      {renderItem({
        title: t('decisionNotIssuedQuantity'),
        value: quantity.notIssued,
      })}
      {renderItem({
        title: t('decisionIssuedQuantity'),
        value: quantity.issued,
      })}
      {renderItem({
        title: t('decisionPausedQuantity'),
        value: quantity.paused,
      })}
      {renderItem({
        title: t('decisionPartCancelledQuantity'),
        value: quantity.partCancelled,
      })}
      {renderItem({
        title: t('decisionSuspendedQuantity'),
        value: quantity.suspended,
      })}
      {renderItem({
        title: t('decisionExemptComplianceQuantity'),
        value: quantity.exemptCompliance,
      })}
      {renderItem({
        title: t('decisionForcedQuantity'),
        value: quantity.forced,
      })}
      {/* {renderItem({
        title: t('decisionCriminallyQuantity'),
        value: quantity.criminally,
      })} */}
      {renderItem({
        title: t('decisionEndedQuantity'),
        value: quantity.ended,
      })}
      {renderItem({
        title: t('decisionCancelledQuantity'),
        value: quantity.cancelled,
      })}
    </View>
  );
};

export default GeneralNotification;
