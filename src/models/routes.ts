export type AppRootParams = {
  LOGIN: undefined;
  REGISTER: undefined;
  REGISTER_SUCCESS: undefined;
  FORGOT_PASSWORD: undefined;
  PASSWORD_SENT_TO_EMAIL: undefined;
  MAIN: undefined;
  HOME: undefined;
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
    | undefined;
  PENALIZE_FILTER: undefined;
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
    | undefined;
  HANDLE_FILTER: undefined;
  SUGGESTION_PROFILE_DETAIL: {id: string};
  VIEW_HANDLE_INFO: {id: string};
  ADMINISTRATIVE_HANDLING_VIOLATION_DETAIL: {id: string};
  SEARCH: undefined;
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
    | undefined;
  VIOLATION_INFO_FILTER: undefined;
  DOCUMENT_LIST:
    | Partial<{
        documentCode: string;
        documentNumber: string;
        quoteContent: string;
        agencyIssued: string;
      }>
    | undefined;
  DOCUMENT_FILTER: undefined;
  VIEW_DOCUMENT: {id: string};
  CRIMINAL_HANDLING_VIOLATION_LIST:
    | Partial<{
        code: string;
        content: string;
      }>
    | undefined;
  CRIMINAL_HANDLING_VIOLATION_FILTER: undefined;
  VIEW_CRIMINAL_HANDLING_VIOLATION: {id: string};
  ACCOUNT: undefined;
  UPDATE_ACCOUNT: undefined;
  NOTIFICATIONS: undefined;
  NOTIFICATION_DETAIL: {
    id: string;
    title: string;
    content: string;
    time: number;
  };
  CHANGE_PASSWORD: undefined;
  PASSWORD_UPDATED: undefined;
};

export type AccountParams = {
  ACCOUNT_INFO: undefined;
  UPDATE_ACCOUNT_INFO: undefined;
};
