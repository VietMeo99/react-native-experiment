import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {PieChart} from 'react-native-gifted-charts';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';

import {View, Button} from 'components/ui';
import {Caption1, Overline, Title1} from 'components/ui/text/Typography';
import BottomSheet from 'components/ui/bottom-sheet/BottomSheet';
import ViolationStatisticFilter from './ViolationStatisticFilter';
import IconAdjustmentsHorizontal from 'assets/images/common/ic_adjustments_horizontal.svg';
import {Colors} from 'themes/colors';
import {getTotalQuantityDecisionApi} from 'apis/home.api';
import {ScreenWidth} from 'themes/size';

const styles = StyleSheet.create({
  smallButton: {
    paddingHorizontal: 8,
    borderColor: Colors.neutral3,
  },
});

const today = new Date();

const ViolationStatistic = () => {
  const {t} = useTranslation('home');
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState<{value: string; label: string}>({
    value: '',
    label: t('all'),
  });
  const [field, setField] = useState<{value: string; label: string}>({
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
    criminally: number;
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
    criminally: 0,
    ended: 0,
    cancelled: 0,
  });

  const data = useMemo(() => {
    return [
      {
        name: t('issued'),
        value: quantity.issued,
        color: '#3B82F6',
      },
      {
        name: t('paused'),
        value: quantity.paused,
        color: '#FACC15',
      },
      {
        name: t('suspended'),
        value: quantity.suspended,
        color: '#EF4444',
      },
      {
        name: t('forced'),
        value: quantity.forced,
        color: '#A855F7',
      },
      {
        name: t('cancelled'),
        value: quantity.cancelled,
        color: '#94A3B8',
      },
      {
        name: t('ended'),
        value: quantity.ended,
        color: '#78716C',
      },
      {
        name: t('notIssued'),
        value: quantity.notIssued,
        color: '#F97316',
      },
      {
        name: t('criminally'),
        value: quantity.criminally,
        color: '#22C55E',
      },
    ];
  }, [
    t,
    quantity.issued,
    quantity.paused,
    quantity.suspended,
    quantity.forced,
    quantity.cancelled,
    quantity.ended,
    quantity.notIssued,
    quantity.criminally,
  ]);

  const total = useMemo(() => {
    return data.reduce((acc, item) => acc + item.value, 0);
  }, [data]);

  const getTotalQuantityDecision = useCallback(async () => {
    try {
      const temp = today;
      temp.setMonth(time.month - 1);
      temp.setFullYear(time.year);
      const response = await getTotalQuantityDecisionApi({
        unitId: unit.value,
        violationField: field.value,
        fromTime: String(temp ? startOfMonth(temp).getTime() : ''),
        toTime: String(temp ? endOfMonth(temp).getTime() : ''),
      });
      setQuantity({
        notIssued: response?.chua_ban_hanh || 0,
        issued: response?.thi_hanh || 0,
        paused: response?.da_hoan || 0,
        partCancelled: response?.dinh_chinh || 0,
        suspended: response?.da_hoan || 0,
        exemptCompliance: response?.mien_chap_hanh || 0,
        forced: response?.cuong_che || 0,
        criminally: response?.truy_cuu_tnhs || 0,
        ended: response?.ket_thuc || 0,
        cancelled: response?.huy_bo || 0,
      });
    } catch (e) {
      // TODO: Show Error
    } finally {
      setLoading(false);
    }
  }, [unit.value, field.value, time.month, time.year]);

  useEffect(() => {
    getTotalQuantityDecision();
  }, [getTotalQuantityDecision]);

  return (
    <View mb={6}>
      <View flexRow alignCenter>
        <Title1 style={{flex: 1}}>{t('violationStatistic')}</Title1>
        <BottomSheet
          renderContent={() => (
            <ViolationStatisticFilter
              unit={unit}
              field={field}
              time={time}
              setUnit={setUnit}
              setField={setField}
              setTime={setTime}
            />
          )}>
          {({onOpen}) => {
            return (
              <Button
                style={styles.smallButton}
                variant={'secondary'}
                height={28}
                onPress={onOpen}>
                <Caption1 style={{marginRight: 14}}>{t('filter')}</Caption1>
                <IconAdjustmentsHorizontal />
              </Button>
            );
          }}
        </BottomSheet>
        <BottomSheet
          renderContent={() => (
            <ViolationStatisticFilter
              unit={unit}
              field={field}
              time={time}
              setUnit={setUnit}
              setField={setField}
              setTime={setTime}
            />
          )}>
          {({onOpen}) => {
            return (
              <Button
                style={styles.smallButton}
                variant={'secondary'}
                height={28}
                onPress={onOpen}>
                <Caption1 style={{marginRight: 14}}>{t('filter')}</Caption1>
                <IconAdjustmentsHorizontal />
              </Button>
            );
          }}
        </BottomSheet>
      </View>
      {loading ? (
        <View my={2}>
          <SkeletonPlaceholder borderRadius={8}>
            <SkeletonPlaceholder.Item width={ScreenWidth - 48} height={260} />
          </SkeletonPlaceholder>
        </View>
      ) : (
        <View
          style={{
            borderRadius: 8,
            borderWidth: 1,
            borderColor: Colors.neutral3,
            backgroundColor: Colors.neutral1,
            overflow: 'hidden',
            position: 'relative',
          }}
          my={2}
          pt={2}>
          <View center px={2}>
            <PieChart
              data={data}
              donut
              radius={105}
              innerRadius={(105 * 5) / 9}
              centerLabelComponent={() => {
                return (
                  <View center>
                    <Overline>{t('total')}</Overline>
                    <Title1>{total}</Title1>
                  </View>
                );
              }}
            />
          </View>
          <View
            style={{
              height: 118,
              flexWrap: 'wrap',
            }}
            px={2}>
            {data.map(item => (
              <View
                key={item.name}
                style={{width: ScreenWidth / 2 - 24}}
                flexRow
                px={1}
                py={1}>
                <View
                  style={{
                    backgroundColor: item.color,
                    width: 12,
                    height: 12,
                  }}
                  mt={1}
                  mr={1.5}
                />
                <Overline
                  style={{flex: 1}}
                  numberOfLines={2}
                  ellipsizeMode={'tail'}>
                  {item.name} (
                  {total
                    ? Number((item.value / total) * 100).toFixed(2)
                    : '0.00'}
                  %)
                </Overline>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default ViolationStatistic;
