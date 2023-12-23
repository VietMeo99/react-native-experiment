import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import format from 'date-fns/format';

import {Colors} from 'themes/colors';
import {View} from 'components/ui';
import SegmentedControl from 'components/ui/segmented-control/SegmentedControl';
import DecisionPenalizeDetail from 'components/penalize/DecisionPenalizeDetail';
import DecisionToCorrectDetail from 'components/penalize/DecisionToCorrectDetail';
import DecisionExemptionDetail from 'components/penalize/DecisionExemptionDetail';
import DecisionEditDetail from 'components/penalize/DecisionEditDetail';
import ComplainDetail from 'components/penalize/ComplainDetail';
import DecisionCancelDetail from 'components/penalize/DecisionCancelDetail';
import DecisionSuspenseDetail from 'components/penalize/DecisionSuspenseDetail';
import DecisionPauseDetail from 'components/penalize/DecisionPauseDetail';
import DecisionCriminalDetail from 'components/penalize/DecisionCriminalDetail';
import ExecutionInfoDetail from 'components/penalize/ExecutionInfoDetail';
import ForceDetail from 'components/penalize/ForceDetail';
import ForceUnitTransferDetail from 'components/penalize/ForceUnitTransferDetail';
import ExecutionTransferDetail from 'components/penalize/ExecutionTransferDetail';
import DecisionPayFinesManyTimesDetail from 'components/penalize/DecisionPayFinesManyTimesDetail';
import ForceTransferInfoDetail from 'components/penalize/ForceTransferInfoDetail';
import InfoButton from 'components/penalize/InfoButton';
import {getDecisionPenalizeByIdApi} from 'apis/penalize.api';
import {getConstantsApi} from 'apis/common.api';
import Alert from 'utils/alertManager';
import {getMessageFromError} from 'utils/common/common.util';
import {getFileByObjectApi} from 'apis/file.api';
import {ObjectType, StorageType} from 'models/file.model';
import {DecisionPenalize} from 'models/penalize.model';
import useHeader from 'hooks/useHeader';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral1,
    paddingTop: 24,
  },
});

const AdministrativePenalizeViolationDetail = () => {
  const {params} = useRoute<any>();
  const {t} = useTranslation('penalize');
  const {setButtonRight} = useHeader();
  const [active, setActive] = useState(0);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<DecisionPenalize>({
    id: 0,
    type: 0,
    decisionNumber: '',
    decisionCreatedDate: '',
    decisionCreatedBy: '',
    decisionStatus: 0,
    decidingAddress: '',
    position: '',
    custody: '',
    violationDate: '',
    effectiveTime: '',
    paymentUnit: '',
    paymentTime: '',
    enforcementAgency: '',
    coordinationUnit: '',
    violationPlace: '',
    violationPlaceDetail: '',
    note: '',
    content: '',
    legalBased: '',
    objects: [],
    sanctionCode: '',
    sanctionType: '',
    sanctionDetail: '',
    recordFiles: [],
    decisionFiles: [],
    files: [],
    additional: {},
    continueEnforceInfos: [],
  });

  const getDecisionDetail = useCallback(async () => {
    try {
      setLoading(true);
      const decisionResponse = await getDecisionPenalizeByIdApi(params.id);
      const constantResponse = await getConstantsApi();
      let optionTemp = [
        {
          key: 0,
          title: t('decisionPenalize'),
        },
      ];
      let additionTemp = {};
      decisionResponse?.penalizeAttachments?.forEach(item => {
        if (!optionTemp.find(i => i.key === item.type) && item.type !== 21) {
          optionTemp.push({
            key: item.type,
            title: (function () {
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
          });
        }
        const temp = {
          id: item.id,
          decisionNumber: item.decisionNumber,
          decisionCreatedDate: item.decisionDay
            ? format(new Date(item.decisionDay), 'dd/MM/yyyy')
            : '',
          decisionCreatedBy: item.executioner,
          position: item.position,
          legalBased: item.legalGrounds,
          reason: item.type === 11 ? item.reasonForce : item.reason,
          content: item.content,
          contentEdit: item.contentEdit,
          effectiveTime: item.effectiveTime
            ? format(new Date(item.effectiveTime), 'dd/MM/yyyy')
            : '',
          representative: item.representative,
          paymentUnit: item.relationUnits
            ?.map(i => i?.paymentUnit?.unitName)
            .filter(i => !!i)
            .join(', '),
          enforcementAgency: item.relationUnits
            ?.map(i => i?.unit?.unitName)
            .filter(i => !!i)
            .join(', '),
          coordinationUnit: item.relationUnits
            ?.map(i => i?.supportingUnit?.unitName)
            .filter(i => !!i)
            .join(', '),
          forceUnit: item.relationUnits
            ?.map(i => i?.forceUnit?.unitName)
            .filter(i => !!i)
            .join(', '),
          note: item.note,
          moneyReduced: item.moneyReduced,
          moneyReturned: item.moneyReturned,
          complaint: item.complaint,
          pauseTime: `${t('from', {ns: 'common'})} ${
            item.pauseFrom ? format(new Date(item.pauseFrom), 'dd/MM/yyyy') : ''
          } ${t('to', {ns: 'common'})} ${
            item.pauseTo ? format(new Date(item.pauseTo), 'dd/MM/yyyy') : ''
          }`,
          receivedUnit: item.relationUnits
            ?.map(i => i?.receiveUnit?.unitName)
            .filter(i => !!i)
            .join(', '),
          object: item.penalizeViolatorInfo?.name,
          idObject: item.penalizeViolatorInfo?.businessCodeOrIdentityNumber,
          expPay: item.deadlineForPayment,
          propertyReturned: item.propertyReturned,
          firstPayment: item.firstPayment,
          secondPayment: item.secondPayment,
          thirdPayment: item.thirdPayment,
          executionUnit: item.unitExecution?.unitName,
          receivedAndSupportUnit: item.unitReceiveAndCooperate?.unitName,
          directDelivery: item.directDelivery ? t('yes') : t('no'),
          deliveryTime: item.deliveryTime
            ? format(new Date(item.deliveryTime), 'dd/MM/yyyy')
            : '',
        };
        if (additionTemp[String(item.type)]) {
          additionTemp[String(item.type)].push(temp);
        } else {
          additionTemp[String(item.type)] = [temp];
        }
      });
      setOptions(optionTemp);
      const attachFileResponse = await getFileByObjectApi({
        objectId: params.id,
        objectType: ObjectType.HandlingAttach,
        storageType: StorageType.PenalizeAttach,
      });
      const decisionFileResponse = await getFileByObjectApi({
        objectId: params.id,
        objectType: ObjectType.HandlingAttach,
        storageType: StorageType.PenalizeDecision,
      });
      let files = [];
      if (decisionResponse?.type === 1) {
        const recordFileResponse = await getFileByObjectApi({
          objectId: params.id,
          objectType: ObjectType.HandlingAttach,
          storageType: StorageType.PenalizeRecord,
        });
        files =
          recordFileResponse?.map(item => ({
            id: item.id,
            name: item.fileName,
            type: item.contentType,
          })) || [];
      }

      const dataAuction =
        typeof decisionResponse?.dataAuction === 'string'
          ? JSON.parse(decisionResponse?.dataAuction)
          : decisionResponse?.dataAuction;

      const auctionFileResponse = await Promise.all(
        Object.keys(dataAuction || {}).map((k: string) => {
          return getFileByObjectApi({
            objectId: String(k),
            objectType: ObjectType.Auction,
          });
        }),
      );

      const auctionFiles = {};

      Object.keys(dataAuction || {}).forEach((k: string, i: number) => {
        auctionFiles[k] = auctionFileResponse[i];
      });

      const multiplePayment =
        typeof decisionResponse?.dataMultiplePayment === 'string'
          ? JSON.parse(decisionResponse?.dataMultiplePayment)
          : decisionResponse?.dataMultiplePayment;

      const mappedData = {
        id: decisionResponse?.id,
        type: decisionResponse?.type,
        decisionStatus: decisionResponse.statusDecision,
        decisionNumber: decisionResponse?.decisionNumber,
        decisionCreatedDate: decisionResponse?.decisionDay
          ? format(new Date(decisionResponse?.decisionDay), 'dd/MM/yyyy')
          : '',
        decisionCreatedBy: decisionResponse?.penalizeInfo?.executioner,
        decidingAddress: decisionResponse?.decidingAddress,
        position: decisionResponse?.penalizeInfo?.position,
        custody: decisionResponse?.penalizeInfo?.custodyInfo,
        effectiveTime: decisionResponse?.penalizeInfo?.effectiveTime
          ? format(
              new Date(decisionResponse?.penalizeInfo.effectiveTime),
              'dd/MM/yyyy',
            )
          : '',
        violationDate: decisionResponse?.penalizeInfo?.violationTime
          ? format(
              new Date(decisionResponse?.penalizeInfo.violationTime),
              'dd/MM/yyyy',
            )
          : '',
        paymentUnit: decisionResponse?.penalizeInfo.relationUnits
          ?.map(item => item?.paymentUnit?.unitName)
          .filter(item => !!item)
          .join(', '),
        paymentTime: decisionResponse?.penalizeInfo.paymentTime,
        enforcementAgency: decisionResponse?.penalizeInfo.relationUnits
          ?.map(item => item?.unit?.unitName)
          .filter(item => !!item)
          .join(', '),
        coordinationUnit: decisionResponse?.penalizeInfo.relationUnits
          ?.map(item => item?.supportingUnit?.unitName)
          .filter(item => !!item)
          .join(', '),
        violationPlace: [
          decisionResponse?.penalizeInfo?.violationCommune?.communeName,
          decisionResponse?.penalizeInfo?.violationDistrict?.districtName,
          decisionResponse?.penalizeInfo?.violationProvince?.provinceName,
        ]
          .filter(i => !!i)
          .join(', '),
        violationPlaceDetail: decisionResponse?.penalizeInfo?.address,
        note: decisionResponse?.penalizeInfo?.note,
        content: decisionResponse?.content,
        legalBased: decisionResponse?.legalGrounds,
        objects:
          decisionResponse?.decisionPenalizeViolatorInfos?.map(item => ({
            id: item.id,
            type: item.type,
            name: item.name,
            address: [
              item?.commune?.communeName,
              item?.district?.districtName,
              item?.province?.provinceName,
            ]
              .filter(i => !!i)
              .join(', '),
            addressDetail: item.specificAddress,
            gender: (item.type === 0 ? item.representativeGender : item.sex)
              ? t('female')
              : t('male'),
            gcngpNumber: item.licenseNumber,
            representative: item.representative,
            position: item.position,
            dob: item.dob ? format(new Date(item.dob), 'dd/MM/yyyy') : '',
            job: item.job,
            nationality: item.nationality,
            idNumber: item.businessCodeOrIdentityNumber,
            idReceivingDate: item.idReceivingDate
              ? format(new Date(item.idReceivingDate), 'dd/MM/yyyy')
              : '',
            idReceivingAddress: item.idReceivingAddress,
            multiplePayment: multiplePayment?.[String(item.id)],
            violationBehavior:
              item.penalizeBehaviors?.map(i => ({
                id: i.id,
                name: i.administrativeViolationActions,
                violationField: i.violationField?.name,
                circumstantialEvidence: i.evidences,
                terms: i.referencingRule,
                solution: i.solution,
                solutionDetail: i.specificSolution,
                relatedContent: i.content,
                expSolution: i.durationOfSolution
                  ? format(new Date(i.durationOfSolution), 'dd/MM/yyyy')
                  : '',
                moneySolution: i.moneySolution,
                auction: !!i.propertiesAuction,
                aggravatingDetails: i.aggravatingDetails,
                mitigatingDetails: i.mitigatingDetails,
                moneyAuction: dataAuction?.[String(i.id)]?.moneyAuction || 0,
                noteAuction: dataAuction?.[String(i.id)]?.note,
                auctionFiles:
                  auctionFiles?.[String(i.id)]?.map(item => ({
                    id: item.id,
                    name: item.fileName,
                    type: item.contentType,
                  })) || [],
                fineLevel: i.fineLevel || 0,
                fineInterest: i.fineInterest || 0,
                additionPenalizes:
                  i.penalizeAdditionalInfos?.map(sub => ({
                    id: sub.id,
                    name: sub.administrativeSanction?.name,
                    code: sub.administrativeSanction?.code,
                    duration: sub.durationOfSolution
                      ? format(new Date(sub.durationOfSolution), 'dd/MM/yyyy')
                      : '',
                  })) || [],
              })) || [],
          })) || [],
        sanctionCode: decisionResponse?.administrativeSanction?.code,
        sanctionType: decisionResponse?.administrativeSanction?.name,
        sanctionDetail: decisionResponse?.administrativeSanctionDetail,
        recordFiles: files,
        decisionFiles:
          decisionFileResponse?.map(item => ({
            id: item.id,
            name: item.fileName,
            type: item.contentType,
          })) || [],
        files:
          attachFileResponse?.map(item => ({
            id: item.id,
            name: item.fileName,
            type: item.contentType,
          })) || [],
        additional: additionTemp,
        continueEnforceInfos:
          decisionResponse?.penalizeAttachments
            ?.map((item, index) => ({
              id: item.id,
              type: item.type,
              prevType:
                decisionResponse.penalizeAttachments?.[index - 1]?.type || 0,
              prevTypeStr:
                decisionResponse.penalizeAttachments?.[index - 1]?.typeStr ||
                '',
              createdBy: item.createBy,
              createdDate: item.createdDate
                ? format(new Date(item.createdDate), 'dd/MM/yyyy')
                : '',
              info: item.content,
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

  const onChangeTab = useCallback(
    async (index: number) => {
      try {
        setActive(index);
        setLoading(true);
      } catch (e) {
        Alert.alert(t('notification', {ns: 'common'}), getMessageFromError(e));
      } finally {
        setLoading(false);
      }
    },
    [t],
  );

  const renderContent = useCallback(() => {
    if (active === 0) {
      return (
        <DecisionPenalizeDetail
          detail={detail}
          getDecisionDetail={getDecisionDetail}
          loading={loading}
        />
      );
    } else {
      const data = detail.additional[String(options[active]?.key)];
      switch (options[active]?.key) {
        case 1:
          return (
            <DecisionToCorrectDetail
              getDecisionDetail={getDecisionDetail}
              detail={data || []}
              loading={loading}
            />
          );

        case 2:
          return (
            <DecisionExemptionDetail
              getDecisionDetail={getDecisionDetail}
              detail={data || []}
              loading={loading}
            />
          );

        case 3:
          return (
            <DecisionEditDetail
              detail={data || []}
              getDecisionDetail={getDecisionDetail}
              sanctionCode={detail.sanctionCode}
              loading={loading}
            />
          );

        case 4:
          return (
            <ComplainDetail
              detail={data || []}
              getDecisionDetail={getDecisionDetail}
              loading={loading}
            />
          );

        case 5:
          return (
            <DecisionCancelDetail
              detail={data || []}
              getDecisionDetail={getDecisionDetail}
              loading={loading}
            />
          );

        case 6:
          return (
            <DecisionSuspenseDetail
              detail={data || []}
              getDecisionDetail={getDecisionDetail}
              loading={loading}
            />
          );

        case 7:
          return (
            <DecisionPauseDetail
              detail={data || []}
              getDecisionDetail={getDecisionDetail}
              loading={loading}
            />
          );

        case 8:
          return (
            <DecisionCriminalDetail
              detail={data || []}
              getDecisionDetail={getDecisionDetail}
              loading={loading}
            />
          );

        case 9:
          return (
            <ExecutionInfoDetail
              detail={data || []}
              getDecisionDetail={getDecisionDetail}
              loading={loading}
            />
          );

        case 10:
          return (
            <ForceDetail
              detail={data || []}
              getDecisionDetail={getDecisionDetail}
              loading={loading}
            />
          );

        case 11:
          return (
            <ForceUnitTransferDetail
              detail={data || []}
              getDecisionDetail={getDecisionDetail}
              loading={loading}
            />
          );

        case 14:
          return (
            <ForceTransferInfoDetail
              detail={data || []}
              getDecisionDetail={getDecisionDetail}
              loading={loading}
            />
          );

        case 15:
          return (
            <ExecutionTransferDetail
              detail={data || []}
              getDecisionDetail={getDecisionDetail}
              loading={loading}
            />
          );

        case 20:
          return (
            <DecisionPayFinesManyTimesDetail
              detail={data || []}
              getDecisionDetail={getDecisionDetail}
              loading={loading}
            />
          );

        default:
          return null;
      }
    }
  }, [active, detail, getDecisionDetail, loading, options]);

  return (
    <View flex={1} style={styles.container}>
      <View px={2}>
        <SegmentedControl
          activeIndex={active}
          tabs={options}
          onChangeActiveTab={onChangeTab}
        />
      </View>
      {renderContent()}
    </View>
  );
};

export default AdministrativePenalizeViolationDetail;
