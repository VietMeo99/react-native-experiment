export enum StorageType {
  Profile = 'FILE_PROFILE',
  HandlingAttach = 'FILE_DINH_KEM',
  Decision = 'FILE_QUYET_DINH',
  Document = 'FILE_VAN_BAN_CAN_CU',
  HandlingDecision = 'FILE_QUYET_DINH_XU_LY',
  Notification = 'FILE_NOTIFICATION',
  PenalizeAttach = 'FILE_DINH_KEM_XU_PHAT',
  PenalizeDecision = 'FILE_QUYET_DINH_XU_PHAT',
  PenalizeRecord = 'FILE_BIEN_BAN_XU_PHAT',
  AdditionalPenalizeAttach = 'FILE_DINH_KEM_XU_PHAT_BO_SUNG',
  AdditionalApplyRelated = 'FILE_LIEN_QUAN_AP_DUNG_BO_SUNG',
  AdditionalApplyDecision = 'FILE_QUYET_DINH_AP_DUNG_BO_SUNG',
  ApplyAttach = 'FILE_DINH_KEM_AP_DUNG',
  ApplyDecision = 'FILE_QUYET_DINH_AP_DUNG',
  SuggestionProfileAttach = 'FILE_DINH_KEM_HO_SO_DE_NGHI',
  HandlingCriminalAttach = 'FILE_DINH_KEM_HANH_VI_VI_PHAM',
  ForceInfoPenalize = 'FILE_INFO_CUONG_CHE_XU_PHAT',
  TransferExecutionHandle = 'FILE_TRANSFER_THI_HANH_XU_LY',
  InfoExecutionHandle = 'FILE_INFO_THI_HANH_XU_LY',
  TransferForceHandle = 'FILE_TRANSFER_CUONG_CHE_XU_LY',
  InfoForceHandle = 'FILE_INFO_CUONG_CHE_XU_LY',
  InfoEnforcePenalize = 'FILE_INFO_ENFORCE_THI_HANH_XU_PHAT',
  TransferForcePenalize = 'FILE_TRANSFER_CUONG_CHE_XU_PHAT',
  InfoExecutionPenalize = 'FILE_INFO_THI_HANH_XU_PHAT',
  TransferExecutionPenalize = 'FILE_TRANSFER_THI_HANH_XU_PHAT',
  ExecutionForceTransferHandle = 'FILE_INFO_ENFORCE_THI_HANH_XU_LY',
}

export enum ObjectType {
  Profile = 13,
  HandlingAttach = 1,
  Document = 4,
  Decision = 6,
  HandlingCriminalAttach = 5,
  HandlingDecision = 11,
  Notification = 12,
  Auction = 2,
}
