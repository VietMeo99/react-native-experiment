import {GenericResponse} from 'models';
import authorizedRequest from 'utils/request/authorizedRequest';

interface DecisionPenalizeResponse {
  id: number;
  createdDate: number | null;
  decisionDay: number | null;
  penalizeInfo: {
    id: number;
    violationProvince: {id: string; provinceName: string} | null;
    violationDistrict: {id: string; districtName: string} | null;
    violationCommune: {id: string; communeName: string} | null;
    address: string;
  } | null;
  decisionPenalizeViolatorInfos: Array<{
    id: number;
    penalizeBehaviors: Array<{
      id: number;
      violationField: {id: number; name: string};
    }> | null;
    businessCodeOrIdentityNumber: null | string;
    name: string;
  }> | null;
  administrativeSanction: {id: number; name: string} | null;
  decisionCode: null | string;
  decisionNumber: string | null;
  statusDecision: number | null;
  statusDecisionStr: string | null;
}

export function getDecisionPenalizesApi(
  params: Partial<{
    searchType: number;
    page: number;
    size: number;
    sort: string;
    keyword: string;
    fromTime: number;
    toTime: number;
    decisionNumber: string;
    name: string;
    idNumber: string;
    type: string;
    violationPlace: string;
    violationFromTime: number;
    violationToTime: number;
    attachmentTypes: Array<string>;
    violationField: string;
    status: string;
    postStatus: string;
    postedUnit: string;
  }>,
) {
  const search = encodeURIComponent(
    `{"size":${params.size || null},"page":${params.page || 0},"searchType":${
      params.searchType || null
    }${params.sort ? `,"sort":"${params.sort}"` : ''}${
      params.keyword ? `,"keyword":"${params.keyword}"` : ''
    }${params.fromTime ? `,"fromDateLong":${params.fromTime}` : ''}${
      params.toTime ? `,"toDateLong":${params.toTime}` : ''
    }${
      params.decisionNumber
        ? `,"decisionNumber":"${params.decisionNumber}"`
        : ''
    }${params.name ? `,"name":"${params.name}"` : ''}${
      params.idNumber
        ? `,"businessCodeOrIdentityNumber":"${params.idNumber}"`
        : ''
    }${params.type ? `,"type":${params.type}` : ''}${
      params.violationPlace
        ? `,"violationAddressFull":"${params.violationPlace}"`
        : ''
    }${
      params.violationFromTime
        ? `,"violationTimeFromLong":${params.violationFromTime}`
        : ''
    }${
      params.violationToTime
        ? `,"violationTimeToLong":${params.violationToTime}`
        : ''
    }${
      params.attachmentTypes?.length
        ? `,"attachmentTypeList":[${String(params.attachmentTypes)}]`
        : ''
    }${
      params.violationField
        ? `,"violationFieldCode":"${params.violationField}"`
        : ''
    }${params.status ? `,"statusDecision":${params.status}` : ''}${
      params.postedUnit ? `,"unitId":${params.postedUnit}` : ''
    }${params.postStatus ? `,"isPublish":${params.postStatus}` : ''}}`,
  );

  // return authorizedRequest.get<
  //   GenericResponse<Array<DecisionPenalizeResponse>>
  // >(`/api/v1/system/decision-penalize/getPage?search=${search}`, {
  //   params: {
  //     page: params.page,
  //     size: params.size,
  //     sort: params.sort,
  //   },
  // });\
  return {
    content: Array(100)
      .fill({
        id: Math.random(),
        createdDate: 10,
        decisionDay: 10,
        penalizeInfo: {
          id: 10,
          violationProvince: {id: 'temp', provinceName: 'temp'},
          violationDistrict: {id: 'temp', districtName: 'temp'},
          violationCommune: {id: 'temp', communeName: 'temp'},
          address: 'temp',
        },
        decisionPenalizeViolatorInfos: Array(2).fill({
          id: 10,
          penalizeBehaviors: Array(5).fill({
            id: 10,
            violationField: {id: 10, name: 'temp'},
          }),
          businessCodeOrIdentityNumber: 'temp',
          name: 'temp',
        }),
        administrativeSanction: {id: 10, name: 'temp'},
        decisionCode: 'temp',
        decisionNumber: 'temp',
        statusDecision: 10,
        statusDecisionStr: 'temp',
      })
      .map((item, index) => {
        return {...item, id: Math.random() + index};
      }),
  } as GenericResponse<Array<DecisionPenalizeResponse>>;
}

interface DecisionPenalizeDetailResponse {
  id: number;
  createdDate: number | null;
  createBy: string | null;
  decisionDay: number | null;
  decidingAddress: string | null;
  statusDecision: number;
  executioner: string | null;
  dataAuction: string | null;
  // JSON string: { [key: string]: { moneyAuction: number | null; note: string | null }; }
  dataMultiplePayment: string | null;
  // JSON string: {
  //   [key: string]: {
  //     firstPaymentMethod: number | null;
  //     firstPaymentMethodStr: string | null;
  //     firstPaymentDate: number | null;
  //     firstPaymentFullAddress: string | null;
  //     firstPaymentBankStr: string | null;
  //     firstPaymentAddressSpecific: string | null;
  //     secondPaymentMethod: number | null;
  //     secondPaymentMethodStr: string | null;
  //     secondPaymentDate: number | null;
  //     secondPaymentFullAddress: string | null;
  //     secondPaymentBankStr: string | null;
  //     secondPaymentAddressSpecific: string | null;
  //     thirdPaymentMethod: number | null;
  //     thirdPaymentMethodStr: string | null;
  //     thirdPaymentDate: number | null;
  //     thirdPaymentFullAddress: string | null;
  //     thirdPaymentBankStr: string | null;
  //     thirdPaymentAddressSpecific: string | null;
  //   };
  // };
  penalizeAttachments: Array<{
    id: number;
    type: number | null;
    typeStr: string | null;
    decisionDay: number | null;
    executioner: string | null;
    decisionCode: string | null;
    decisionNumber: string | null;
    position: string | null;
    legalGrounds: string | null;
    createdDate: number | null;
    createBy: string | null;
    reason: string | null;
    reasonForce: string | null;
    content: string | null;
    contentEdit: string | null;
    effectiveTime: number | null;
    representative: string | null;
    note: string | null;
    relationUnits: Array<{
      id: number;
      unit: {id: number; unitName: string} | null;
      supportingUnit: {id: number; unitName: string} | null;
      paymentUnit: {id: number; unitName: string} | null;
      receiveUnit: {id: number; unitName: string} | null;
      forceUnit: {id: number; unitName: string} | null;
    }> | null;
    penalizeViolatorInfo: {
      id: number;
      name: string | null;
      businessCodeOrIdentityNumber: string | null;
    };
    moneyReduced: number | null;
    moneyReturned: number | null;
    complaint: string | null;
    pauseFrom: string | null;
    pauseTo: string | null;
    deadlineForPayment: string | null;
    propertyReturned: number | null;
    firstPayment: number | null;
    secondPayment: number | null;
    thirdPayment: number | null;
    unitExecution: {id: number; unitName: string} | null;
    unitReceiveAndCooperate: {id: number; unitName: string} | null;
    directDelivery: number | null;
    deliveryTime: number | null;
    continueEnforceInfo: string | null;
  }> | null;
  decisionPenalizeViolatorInfos: Array<{
    id: number;
    type: number;
    sex: number | null;
    address: string | null;
    addressFull: string | null;
    province: {id: string; provinceName: string} | null;
    district: {id: string; districtName: string} | null;
    commune: {id: string; communeName: string} | null;
    specificAddress: string | null;
    penalizeBehaviors: Array<{
      id: number;
      administrativeViolationActions: string | null;
      violationField: {id: number; name: string};
      evidences: string | null;
      solution: string | null;
      specificSolution: string | null;
      durationOfSolution: number | null;
      referencingRule: string | null;
      propertiesAuction: number | null;
      fineLevel: number | null;
      fineInterest: number | null;
      content: string | null;
      moneySolution: number | null;
      aggravatingDetails: string | null;
      mitigatingDetails: string | null;
      moneyAuction: number | null;
      penalizeAdditionalInfos: Array<{
        id: number;
        administrativeSanction: {
          id: number;
          name: string | null;
          code: string | null;
        };
        durationOfSolution: number | null;
      }>;
    }> | null;
    detailViolateAddress: null;
    businessCodeOrIdentityNumber: null | string;
    nationality: string | null;
    dob: number | null;
    job: string | null;
    name: string;
    representative: string | null;
    representativeGender: number | null;
    licenseNumber: string | null;
    idReceivingDate: number | null;
    idReceivingAddress: string | null;
    position: string | null;
  }> | null;
  penalizeInfo: {
    id: number;
    executioner: string;
    position: string;
    custodyInfo: string | null;
    violationTime: number | null;
    effectiveTime: number | null;
    paymentTime: string | null;
    address: string | null;
    addressFull: string | null;
    violationProvince: {id: string; provinceName: string} | null;
    violationDistrict: {id: string; districtName: string} | null;
    violationCommune: {id: string; communeName: string} | null;
    detailViolateAddress: string | null;
    relationUnits: Array<{
      id: number;
      unit: {id: number; unitName: string} | null;
      supportingUnit: {id: number; unitName: string} | null;
      paymentUnit: {id: number; unitName: string} | null;
    }> | null;
    note: string | null;
  } | null;
  penalizeUnit: {id: number; unitName: string};
  administrativeSanction: {
    code: string;
    id: number;
    name: string;
  } | null;
  administrativeSanctionDetail: string | null;
  decisionCode: string | null;
  decisionNumber: string | null;
  legalGrounds: string;
  content: string | null;
  note: string | null;
  type: number;
  statusDecisionStr: string;
}

export function getDecisionPenalizeByIdApi(id: string) {
  // return authorizedRequest.get<DecisionPenalizeDetailResponse>(
  //   `/api/v1/system/decision-penalize/${id}`,
  // );
  return {} as DecisionPenalizeDetailResponse;
}
