interface ViolationBehavior {
  id: number;
  name: string;
  violationField: string;
  circumstantialEvidence: string;
  terms: string;
  solution: string;
  solutionDetail: string;
  relatedContent: string;
  expSolution: string;
  moneySolution: number;
  auction: boolean;
  aggravatingDetails: string;
  mitigatingDetails: string;
  fineLevel: number;
  fineInterest: number;
  moneyAuction: number;
  noteAuction: string;
  auctionFiles: Array<{id: string; name: string; type: string}>;
  additionPenalizes: Array<{
    id: number;
    name: string;
    code: string;
    duration: string;
  }>;
}

interface ViolationObject {
  id: number;
  type: number;
  name: string;
  idNumber: string;
  address: string;
  addressDetail: string;
  gender: string;
  gcngpNumber: string;
  representative: string;
  position: string;
  dob: string;
  job: string;
  nationality: string;
  idReceivingDate: string;
  idReceivingAddress: string;
  multiplePayment?: {
    firstPaymentMethod: number;
    firstPaymentMethodStr: string;
    firstPaymentDate: number;
    firstPaymentFullAddress: string;
    firstPaymentBankStr: string;
    firstPaymentAddressSpecific: string;
    secondPaymentMethod: number;
    secondPaymentMethodStr: string;
    secondPaymentDate: number;
    secondPaymentFullAddress: string;
    secondPaymentBankStr: string;
    secondPaymentAddressSpecific: string;
    thirdPaymentMethod: number;
    thirdPaymentMethodStr: string;
    thirdPaymentDate: number;
    thirdPaymentFullAddress: string;
    thirdPaymentBankStr: string;
    thirdPaymentAddressSpecific: string;
  };
  violationBehavior: Array<ViolationBehavior>;
}

export interface DecisionAdditional {
  id: number;
  decisionNumber: string;
  decisionCreatedDate: string;
  decisionCreatedBy: string;
  position: string;
  legalBased: string;
  reason: string;
  content: string;
  contentEdit: string;
  effectiveTime: string;
  representative: string;
  paymentUnit: string;
  enforcementAgency: string;
  coordinationUnit: string;
  forceUnit: string;
  note: string;
  moneyReduced: number;
  moneyReturned: number;
  pauseTime: string;
  receivedUnit: string;
  object: string;
  idObject: string;
  expPay: string;
  propertyReturned: string;
  firstPayment: number;
  secondPayment: number;
  thirdPayment: number;
  executionUnit: string;
  receivedAndSupportUnit: string;
  directDelivery: string;
  deliveryTime: string;
}

export interface DecisionPenalize {
  id: number;
  type: number;
  decisionNumber: string;
  decisionCreatedDate: string;
  decidingAddress: string;
  decisionStatus: number;
  legalBased: string;
  objects: Array<ViolationObject>;
  decisionCreatedBy: string;
  position: string;
  custody: string;
  effectiveTime: string;
  violationDate: string;
  paymentUnit: string;
  paymentTime: string;
  enforcementAgency: string;
  coordinationUnit: string;
  violationPlace: string;
  violationPlaceDetail: string;
  note: string;
  content: string;
  sanctionCode: string;
  sanctionType: string;
  sanctionDetail: string;
  recordFiles: Array<{id: string; name: string; type: string}>;
  decisionFiles: Array<{id: string; name: string; type: string}>;
  files: Array<{id: string; name: string; type: string}>;
  additional: {
    [key: string]: Array<DecisionAdditional>;
  };
  continueEnforceInfos: Array<{
    id: number;
    type: number;
    prevType: number;
    prevTypeStr: string;
    createdBy: string;
    createdDate: string;
    info: string;
  }>;
}
