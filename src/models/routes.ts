export type AppRootParams = {
  LOGIN: object;
  REGISTER: object;
  REGISTER_SUCCESS: object;
  FORGOT_PASSWORD: object;
  PASSWORD_SENT_TO_EMAIL: object;
  MAIN: object;
  HOME: object;
  PENALIZE:
    | Partial<{
        createdDateStart: string;
        createdDateEnd: string;
        decisionNumber: string;
        name: string;
        idNumber: string;
        type: string;
        violationPlace: string;
        violationTimeStart: string;
        violationTimeEnd: string;
        additionalDecisionType: string;
        violationField: string;
        status: string;
        postStatus: string;
      }>
    | object;
  PENALIZE_FILTER: object;
  VIEW_PENALIZE_INFO: {id: string};
  ADMINISTRATIVE_PENALIZE_VIOLATION_DETAIL: {id: string};
  HANDLE:
    | Partial<{
        tab: number;
        profileNumber: string;
        idNumber: string;
        name: string;
        applyType: string;
        status: string;
        violationPlace: string;
        createdDateStart: string;
        createdDateEnd: string;
        decisionNumber: string;
        violationTimeStart: string;
        violationTimeEnd: string;
        violationField: string;
        type: string;
        postStatus: string;
        replace: boolean;
      }>
    | object;
  HANDLE_FILTER: object;
  SUGGESTION_PROFILE_DETAIL: {id: string};
  VIEW_HANDLE_INFO: {id: string};
  ADMINISTRATIVE_HANDLING_VIOLATION_DETAIL: {id: string};
  SEARCH: object;
  SEARCH_VIOLATION_INFO:
    | Partial<
        | {
            tab: number;
            createdDateStart: string;
            createdDateEnd: string;
            decisionNumber: string;
            name: string;
            idNumber: string;
            type: string;
            violationPlace: string;
            violationField: string;
            violationTimeStart: string;
            violationTimeEnd: string;
            additionalDecisionType: string;
            status: string;
            applyType: string;
            postStatus: string;
            postedUnit: string;
          }
        | {
            tab: number;
            createdDateStart: string;
            createdDateEnd: string;
            idNumber: string;
            name: string;
            applyType: string;
            status: string;
            violationPlace: string;
            violationTimeStart: string;
            violationTimeEnd: string;
            type: string;
            postStatus: string;
            replace: boolean;
          }
      >
    | object;
  VIOLATION_INFO_FILTER: object;
  DOCUMENT_LIST:
    | Partial<{
        documentCode: string;
        documentNumber: string;
        quoteContent: string;
        agencyIssued: string;
      }>
    | object;
  DOCUMENT_FILTER: object;
  VIEW_DOCUMENT: {id: string};
  CRIMINAL_HANDLING_VIOLATION_LIST:
    | Partial<{
        code: string;
        content: string;
      }>
    | object;
  CRIMINAL_HANDLING_VIOLATION_FILTER: object;
  VIEW_CRIMINAL_HANDLING_VIOLATION: {id: string};
  ACCOUNT: object;
  UPDATE_ACCOUNT: object;
  NOTIFICATIONS: object;
  NOTIFICATION_DETAIL: {
    id: string;
    title: string;
    content: string;
    time: number;
  };
  CHANGE_PASSWORD: object;
  PASSWORD_UPDATED: object;
};

export type AccountParams = {
  ACCOUNT_INFO: object;
  UPDATE_ACCOUNT_INFO: object;
};
