import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, PixelRatio} from 'react-native';
import {useTranslation} from 'react-i18next';
import {default as RNDatePicker} from 'react-native-date-picker';
import format from 'date-fns/format';

import {View, TouchableOpacity, Button} from 'components/ui';
import {Body1, Title1, Title2} from 'components/ui/text/Typography';
import BottomSheet from '../bottom-sheet/BottomSheet';
import IconCalendar from 'assets/images/common/ic_calendar.svg';
import {Colors} from 'themes/colors';

const styles = StyleSheet.create({
  buttonInput: {
    borderWidth: PixelRatio.roundToNearestPixel(1),
  },
  buttonGroup: {
    paddingHorizontal: 24,
  },
  buttonText: {
    color: Colors.primary,
    textTransform: 'uppercase',
  },
});

export interface Props {
  range?: {
    start: Date;
    end: Date;
  };
  value?: Date;
  onChange: (
    value:
      | Date
      | {
          start: Date;
          end: Date;
        },
  ) => void;
  onBlur?: () => void;
  disabled?: boolean;
  isRange?: boolean;
}

const DatePicker: FC<Props> = ({
  range,
  value,
  onChange,
  onBlur,
  isRange,
  disabled,
}) => {
  const {t} = useTranslation('common');
  const [date, setDate] = useState<any>(value);
  // const [date, setDate] = useState<Date>(value);
  const [rangeDate, setRangeDate] = useState<any>(range);
  // const [rangeDate, setRangeDate] = useState<{start: Date; end: Date}>(range);
  const [first, setFirst] = useState<boolean>(true);

  useEffect(() => {
    if (isRange) {
      setRangeDate(range);
    } else {
      setDate(value);
    }
  }, [isRange, range, value]);

  const renderContent = ({onClose}) => (
    <View flex={1} pt={2.5} pb={8}>
      <View flexRow alignCenter justifySpaceBetween mb={2}>
        <Title1 style={{marginLeft: 24}}>
          {isRange ? (first ? t('startDate') : t('endDate')) : ''}
        </Title1>
        <View style={styles.buttonGroup} flexRow alignCenter justifyEnd>
          <TouchableOpacity
            style={{marginRight: 24}}
            onPress={() => {
              setFirst(true);
              onClose();
            }}>
            <Title2 style={styles.buttonText}>{t('cancel')}</Title2>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (isRange) {
                if (first) {
                  setFirst(false);
                } else {
                  onChange({
                    start: rangeDate?.start || new Date(),
                    end: rangeDate?.end || new Date(),
                  });
                  setFirst(true);
                  onClose();
                }
              } else {
                onChange(date || new Date());
                onClose();
              }
            }}>
            <Title2 style={styles.buttonText}>
              {isRange && first ? t('next') : t('choose')}
            </Title2>
          </TouchableOpacity>
        </View>
      </View>

      <View flex={1} center flexRow>
        {isRange ? (
          first ? (
            <RNDatePicker
              mode="date"
              androidVariant="iosClone"
              textColor={Colors.neutral6}
              date={rangeDate?.start || new Date()}
              onDateChange={v => {
                setRangeDate(p => ({...p, start: v}));
              }}
            />
          ) : (
            <RNDatePicker
              mode="date"
              androidVariant="iosClone"
              textColor={Colors.neutral6}
              date={rangeDate?.end || new Date()}
              onDateChange={v => {
                setRangeDate(p => ({...p, end: v}));
              }}
            />
          )
        ) : (
          <RNDatePicker
            mode="date"
            androidVariant="iosClone"
            textColor={Colors.neutral6}
            date={date || new Date()}
            onDateChange={v => {
              setDate(v);
            }}
          />
        )}
      </View>
    </View>
  );

  return (
    <BottomSheet renderContent={renderContent} onDismiss={onBlur}>
      {({opened, onOpen}) => (
        <Button
          style={[
            styles.buttonInput,
            {
              borderColor: disabled
                ? Colors.neutral2
                : opened
                  ? Colors.primary
                  : Colors.neutral3,
              backgroundColor: disabled ? Colors.neutral2 : Colors.transparent,
            },
          ]}
          variant={'secondary'}
          disabled={disabled}
          onPress={onOpen}>
          <View flex={1} flexRow alignCenter justifySpaceBetween>
            <Body1 style={{marginRight: 14}}>
              {isRange
                ? range?.start && range?.end
                  ? `${
                      range.start ? format(range.start, 'dd/MM/yyyy') : ''
                    } - ${range.end ? format(range.end, 'dd/MM/yyyy') : ''}`
                  : ''
                : value
                  ? format(value, 'dd/MM/yyyy')
                  : ''}
            </Body1>
            <IconCalendar />
          </View>
        </Button>
      )}
    </BottomSheet>
  );
};

export default DatePicker;
