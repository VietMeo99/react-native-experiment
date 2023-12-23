import {GenericResponse} from 'models';
import {DecisionType, MessageType} from 'models/notification.model';
import authorizedRequest from 'utils/request/authorizedRequest';

interface NotificationResponse {
  id: number;
  createdDate: number;
  content: string | null;
  notificationId: string | null;
  decisionId: number;
  decisionNumber: string;
  decisionType: DecisionType;
  messageType: MessageType;
  dataJson: string | null;
  previousStatusStr: string | null;
  currentStatusStr: string | null;
  previousStatusDecisionStr: string | null;
  currentStatusDecisionStr: string | null;
  fromFullName: string | null;
  notificationSubject: string | null;
  isRead: number;
}

export function getNotificationsApi(
  params: Partial<{
    type: number;
    page: number;
    size: number;
  }>,
) {
  const search = encodeURIComponent(
    `{"type":${params.type || null},"page":${params.page || 0},"size":${
      params.size || null
    }}`,
  );
  // return authorizedRequest.get<GenericResponse<Array<NotificationResponse>>>(
  //   `/api/v1/system/dashboard/getNotify?search=${search}`,
  //   {params: {page: params.page, size: params.size}},
  // );
  return {
    content: Array(10)
      .fill({
        id: Math.random(),
        createdDate: 10,
        content: 'test',
        notificationId: 'test',
        decisionId: 10,
        decisionNumber: 'test',
        decisionType: DecisionType.DecisionApply,
        messageType: MessageType.AddAttachment,
        dataJson: 'test',
        previousStatusStr: 'test',
        currentStatusStr: 'test',
        previousStatusDecisionStr: 'test',
        currentStatusDecisionStr: 'test',
        fromFullName: 'test',
        notificationSubject: 'test',
        isRead: 10,
      })
      .map((item, index) => {
        return {...item, id: Math.random() + index};
      }),
  };
}

export function getTotalUnreadNotificationsApi() {
  // return authorizedRequest.get<number>(
  //   '/api/v1/system/dashboard/countNotifiUnread',
  // );
  return 10;
}

export function readNotificationApi(id: number) {
  // return authorizedRequest.post(
  //   '/api/v1/system/dashboard/readNotification',
  //   {},
  //   {params: {id}},
  // );
  return true;
}
