import React, {Fragment, useState, useEffect, useCallback} from 'react';
import {RefreshControl, StyleSheet, ScrollView, PixelRatio} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation, useRoute} from '@react-navigation/native';
import format from 'date-fns/format';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import uniqBy from 'lodash/uniqBy';

import {Colors} from 'themes/colors';
import {TouchableOpacity, View} from 'components/ui';
import {
  Body1,
  Caption1,
  Overline,
  SmallText,
  Title2,
} from 'components/ui/text/Typography';
import IconUserCircle from 'assets/images/handle/ic_user_circle.svg';
import IconCalendarDays from 'assets/images/handle/ic_calendar_days.svg';
import Alert from 'utils/alertManager';
import {getMessageFromError} from 'utils/common/common.util';
import {getConstantsApi} from 'apis/common.api';
import {ScreenWidth} from 'themes/size';
import {AppRouter} from 'constants/router';
import {boxShadowStyles} from 'components/ui/view/BoxShadow';
import {getDecisionPenalizeByIdApi} from 'apis/penalize.api';
import useHeader from 'hooks/useHeader';
import InfoButton from 'components/penalize/InfoButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral1,
    paddingTop: 24,
  },
  button: {
    backgroundColor: Colors.neutral2,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  card: {
    borderRadius: 8,
    borderWidth: PixelRatio.roundToNearestPixel(1),
    borderColor: Colors.neutral2,
  },
});

const ViewPenalizeInfo = () => {
  const navigation = useNavigation();
  const {params} = useRoute<any>();
  const {setButtonRight} = useHeader();
  const {t} = useTranslation('penalize');
  const [loading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<{
    id: number;
    type: string;
    status: string;
    group: Array<{id: number; name: string; idNumber: string}>;
    personal: Array<{id: number; name: string; idNumber: string}>;
    penalizeAttachments: Array<{
      id: number;
      name: string;
      createdDate: string;
      createdBy: string;
    }>;
    continueEnforceInfos: Array<{
      id: number;
      type: number;
      prevType: number;
      prevTypeStr: string;
      createdBy: string;
      createdDate: string;
      info: string;
    }>;
  }>({
    id: 0,
    status: '',
    type: '',
    group: [],
    personal: [],
    penalizeAttachments: [],
    continueEnforceInfos: [],
  });

  const getDecisionDetail = useCallback(async () => {
    try {
      setLoading(true);
      const detailResponse = await getDecisionPenalizeByIdApi(params.id);
      const constantResponse = await getConstantsApi();
      let tempGroup = [];
      let tempPersonal = [];
      detailResponse?.decisionPenalizeViolatorInfos?.forEach(item => {
        if (item.type === 0) {
          tempGroup.push({
            id: item.id,
            name: item.name,
            idNumber: item.businessCodeOrIdentityNumber,
          });
        } else {
          tempPersonal.push({
            id: item.id,
            name: item.name,
            idNumber: item.businessCodeOrIdentityNumber,
          });
        }
      });
      const mappedData = {
        id: detailResponse?.id,
        type:
          detailResponse?.type === 0 ? t('notCreateRecord') : t('createRecord'),
        status: detailResponse?.statusDecisionStr,
        group: tempGroup,
        personal: tempPersonal,
        penalizeAttachments: [
          {
            id: 0,
            name: t('decisionPenalize'),
            createdBy: detailResponse?.createBy,
            createdDate: detailResponse?.createdDate
              ? format(new Date(detailResponse.createdDate), 'dd/MM/yyyy')
              : '',
          },
        ].concat(
          uniqBy(detailResponse?.penalizeAttachments, 'type')
            ?.filter(item => item.type !== 21) // TODO: Hide decision continue execution
            .map(item => ({
              id: item.id,
              name: (function () {
                switch (item.type) {
                  case 1:
                    return t('decisionToCorrect');

                  case 2:
                    return t('decisionExemption');

                  case 3:
                    return t('decisionEdit');

                  case 4:
                    return t('complain');

                  case 5:
                    return t('decisionCancel');

                  case 6:
                    return t('decisionSuspense');

                  case 7:
                    return t('decisionPause');

                  case 8:
                    return t('decisionCriminal');

                  case 9:
                    return t('executionInfo');

                  case 10:
                    return t('forceInfo');

                  case 11:
                    return t('forceUnitTransfer');

                  case 14:
                    return t('forceTransferInfo');

                  case 15:
                    return t('executionTransfer');

                  case 20:
                    return t('decisionPayFinesManyTimes');

                  default:
                    return (
                      constantResponse.DECISION_PENALIZE_ATTACHMENT_TYPE.find(
                        i => i.id === item.type,
                      )?.value || ''
                    );
                }
              })(),
              createdBy: item.createBy,
              createdDate: item.createdDate
                ? format(new Date(item.createdDate), 'dd/MM/yyyy')
                : '',
            })),
        ),
        continueEnforceInfos:
          detailResponse?.penalizeAttachments
            ?.map((item, index) => ({
              id: item.id,
              type: item.type,
              prevType:
                detailResponse.penalizeAttachments?.[index - 1]?.type || 0,
              prevTypeStr:
                detailResponse.penalizeAttachments?.[index - 1]?.typeStr || '',
              createdBy: item.createBy,
              createdDate: item.createdDate
                ? format(new Date(item.createdDate), 'dd/MM/yyyy')
                : '',
              info: item.continueEnforceInfo,
            }))
            ?.filter(item => item.type === 21) || [],
      };
      setDetail(mappedData);
      if (mappedData.continueEnforceInfos.length) {
        setButtonRight(() => (
          <InfoButton data={mappedData.continueEnforceInfos} />
        ));
      }
    } catch (e) {
      Alert.alert(t('notification', {ns: 'common'}), getMessageFromError(e));
    } finally {
      setLoading(false);
    }
  }, [params.id, setButtonRight, t]);

  useEffect(() => {
    getDecisionDetail();

    return () => {
      setButtonRight(() => null);
    };
  }, [getDecisionDetail, setButtonRight]);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getDecisionDetail} />
      }>
      <View flexRow mb={6} mx={6}>
        <View flex={1} mr={4}>
          {loading ? (
            <SkeletonPlaceholder borderRadius={16}>
              <>
                <SkeletonPlaceholder.Item width={80} height={20} />
                <SkeletonPlaceholder.Item
                  width={ScreenWidth - 160}
                  height={20}
                />
              </>
            </SkeletonPlaceholder>
          ) : (
            <>
              <Caption1>{t('recordType')}</Caption1>
              <Title2>{detail.type}</Title2>
            </>
          )}
        </View>
        {loading ? (
          <SkeletonPlaceholder borderRadius={16}>
            <SkeletonPlaceholder.Item width={60} height={28} />
          </SkeletonPlaceholder>
        ) : (
          <View
            style={{
              maxHeight: 28,
              borderWidth: PixelRatio.roundToNearestPixel(1),
              borderColor: Colors.neutral4,
              backgroundColor: Colors.neutral2,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
            }}>
            <SmallText style={{color: Colors.neutral5}}>
              {detail.status}
            </SmallText>
          </View>
        )}
      </View>

      <View mb={6} mx={6}>
        {loading ? (
          <SkeletonPlaceholder borderRadius={16}>
            <>
              <SkeletonPlaceholder.Item width={80} height={20} />
              <SkeletonPlaceholder.Item width={ScreenWidth - 160} height={20} />
            </>
          </SkeletonPlaceholder>
        ) : (
          !!detail.group.length && (
            <>
              <Caption1>
                {t('groupName')} ({detail.group.length})
              </Caption1>
              {detail.group.map(item => (
                <View key={item.id} flexRow>
                  <Title2 style={{paddingHorizontal: 8}}>●</Title2>
                  <Title2 style={{flex: 1}}>
                    {item.name} - <Body1>{item.idNumber}</Body1>
                  </Title2>
                </View>
              ))}
            </>
          )
        )}
      </View>
      <View mb={6} mx={6}>
        {loading ? (
          <SkeletonPlaceholder borderRadius={16}>
            <>
              <SkeletonPlaceholder.Item width={80} height={20} />
              <SkeletonPlaceholder.Item width={ScreenWidth - 160} height={20} />
            </>
          </SkeletonPlaceholder>
        ) : (
          !!detail.personal.length && (
            <>
              <Caption1>
                {t('personalName')}({detail.personal.length})
              </Caption1>
              {detail.personal.map(item => (
                <View key={item.id} flexRow>
                  <Title2 style={{paddingHorizontal: 8}}>●</Title2>
                  <Title2 style={{flex: 1}}>
                    {item.name} - <Body1>{item.idNumber}</Body1>
                  </Title2>
                </View>
              ))}
            </>
          )
        )}
      </View>
      {!!detail.penalizeAttachments.length && (
        <TouchableOpacity
          style={[styles.card, boxShadowStyles.all, {marginHorizontal: 24}]}
          onPress={() =>
            navigation.navigate(
              AppRouter.ADMINISTRATIVE_PENALIZE_VIOLATION_DETAIL,
              {
                id: detail.id,
              },
            )
          }>
          {detail.penalizeAttachments.map((item, index) => (
            <View
              key={item.id}
              flexRow
              alignCenter
              px={2}
              style={{
                borderTopWidth:
                  index === 0 ? 0 : PixelRatio.roundToNearestPixel(1),
                borderColor: Colors.neutral2,
                height: 48,
                maxHeight: 48,
              }}>
              <View
                style={{position: 'relative', width: 120}}
                justifyCenter
                mr={6}>
                <View flexRow alignCenter justifyEnd>
                  <Overline
                    style={{marginRight: 2}}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}>
                    {item.createdBy}
                  </Overline>
                  <IconUserCircle />
                </View>
                <View flexRow alignCenter justifyEnd>
                  <Overline
                    style={{marginRight: 2}}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}>
                    {item.createdDate}
                  </Overline>
                  <IconCalendarDays />
                </View>
                {index !== 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      top: -32,
                      right: -13,
                      width: 2,
                      height: 48,
                      backgroundColor: Colors.neutral4,
                    }}
                  />
                )}
                <View
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: -16,
                    width: 8,
                    height: 8,
                    borderRadius: 8,
                    backgroundColor: Colors.neutral4,
                  }}
                />
              </View>
              <View flex={1} justifyCenter>
                <Body1
                  style={{color: Colors.neutral6}}
                  numberOfLines={2}
                  ellipsizeMode={'tail'}>
                  {item.name}
                </Body1>
              </View>
            </View>
          ))}
        </TouchableOpacity>
      )}
      <View mb={35} />
    </ScrollView>
  );
};

export default ViewPenalizeInfo;
