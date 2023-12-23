import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {BarChart} from 'react-native-gifted-charts';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import startOfYear from 'date-fns/startOfYear';
import endOfYear from 'date-fns/endOfYear';

import {Button, View} from 'components/ui';
import {Caption1, Overline, Title1} from 'components/ui/text/Typography';
import BottomSheet from 'components/ui/bottom-sheet/BottomSheet';
import FineStatisticFilter from './FineStatisticFilter';
import IconAdjustmentsHorizontal from 'assets/images/common/ic_adjustments_horizontal.svg';
import {Colors} from 'themes/colors';
import {getOverallFinesApi} from 'apis/home.api';
import {ScreenWidth} from 'themes/size';

const styles = StyleSheet.create({
  smallButton: {
    paddingHorizontal: 8,
    borderColor: Colors.neutral3,
  },
});

const today = new Date();

const initialState = Array(12)
  .fill(0)
  .map((_item, index) => ({label: `T${index + 1}`, values: [0, 0]}));

const FinesStatistic = () => {
  const {t} = useTranslation('home');
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState<number>(today.getFullYear());
  const [unit, setUnit] = useState<{value: string; label: string}>({
    value: '',
    label: t('all'),
  });
  const [fines, setFines] = useState<
    Array<{
      label: string;
      values: Array<number>;
    }>
  >(initialState);

  const getFines = useCallback(async () => {
    try {
      const temp = today;
      temp.setFullYear(year);
      const response = await getOverallFinesApi({
        unitId: unit.value,
        fromTime: String(temp ? startOfYear(temp).getTime() : ''),
        toTime: String(temp ? endOfYear(temp).getTime() : ''),
      });
      setFines(p =>
        p.map(item => {
          const found = response.find(
            i => `T${i?.month_year?.split('-')?.[0] || ''}` === item.label,
          );
          if (found) {
            return {
              ...item,
              values: [
                found.tong_so_tien_phat_thu_tu_dau_gia || 0,
                found.tong_so_tien_phat_thu_duoc || 0,
              ],
            };
          }
          return item;
        }),
      );
    } catch (e) {
      // TODO: Show Error
    } finally {
      setLoading(false);
    }
  }, [unit.value, year]);

  useEffect(() => {
    getFines();
  }, [getFines]);

  return (
    <View mb={6}>
      <View flexRow alignCenter>
        <Title1 style={{flex: 1}}>{t('finesStatistic')}</Title1>
        <BottomSheet
          renderContent={() => (
            <FineStatisticFilter
              unit={unit}
              year={year}
              setUnit={setUnit}
              setYear={setYear}
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
      {loading ? (
        <View my={2}>
          <SkeletonPlaceholder borderRadius={8}>
            <SkeletonPlaceholder.Item width={ScreenWidth - 48} height={232} />
          </SkeletonPlaceholder>
        </View>
      ) : (
        <View
          style={{
            borderRadius: 8,
            borderWidth: 1,
            borderColor: Colors.neutral3,
            overflow: 'hidden',
          }}
          my={2}>
          <View flexRow justifySpaceBetween px={1}>
            <Overline style={{color: Colors.neutral6}}>
              ({t('million')})
            </Overline>
            <View>
              <View flexRow alignCenter>
                <View
                  style={{
                    backgroundColor: '#F59E0B',
                    width: 12,
                    height: 12,
                  }}
                  mr={1.5}
                />
                <Overline ellipsizeMode={'tail'}>{t('fromAuction')}</Overline>
              </View>
              <View flexRow alignCenter>
                <View
                  style={{
                    backgroundColor: '#3B82F6',
                    width: 12,
                    height: 12,
                  }}
                  mr={1.5}
                />
                <Overline ellipsizeMode={'tail'}>{t('fromViolation')}</Overline>
              </View>
            </View>
          </View>
          <BarChart
            data={fines.reduce(
              (acc, item) =>
                acc
                  .concat({
                    value: item.values[0],
                    label: item.label,
                    spacing: 2,
                    labelWidth: 64,
                    labelTextStyle: {
                      color: Colors.neutral6,
                      fontSize: 10,
                      textAlign: 'center',
                    },
                    frontColor: '#F59E0B',
                  })
                  .concat({
                    value: item.values[1],
                    frontColor: '#3B82F6',
                  })
                  .concat({value: 0}),
              [],
            )}
            width={ScreenWidth - 48}
            height={200}
            barWidth={24}
            spacing={8}
            yAxisTextStyle={{color: Colors.neutral6, fontSize: 10}}
          />
        </View>
      )}
    </View>
  );
};

export default FinesStatistic;
