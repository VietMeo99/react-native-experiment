export enum DecisionType {
  DecisionApply = 'DECISION_APPLY',
  DecisionPenalize = 'DECISION_PENALIZE',
}

export enum MessageType {
  Status_Change = 'STATUS_CHANGE', // Thay đổi trạng thái
  Publish = 'PUBLISH', // Đăng tải
  Unpublish = 'UNPUBLISH', // Bỏ đăng tải
  AddAttachment = 'ADD_ATTACHMENT', // Thêm quyết định bổ sung
  UpdateAttachment = 'UPDATE_ATTACHMENT', // Thêm quyết định bổ sung
  AssignExecute = 'ASSIGN_EXECUTE', // Điều chuyển thi hành
  AssignForce = 'ASSIGN_FORCE', // Điều chuyển cưỡng chế
  Update = 'UPDATE', // Cập nhật,
  NotificationUpdate = 'NOTIFICATION_UPDATE', //Cập nhật thông báo trong đơn vị
  NotificationNew = 'NOTIFICATION_NEW', //Cập nhật thông báo trong đơn vị
}
