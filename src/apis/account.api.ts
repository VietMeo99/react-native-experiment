import authorizedRequest from 'utils/request/authorizedRequest';
import formatISO from 'date-fns/formatISO';

interface ProfileResponse {
  id: number;
  unit: Unit;
  fileAvatar: string;
  username: string;
  position: string;
  birthday: string;
  phoneNumber: string;
  gender: number;
  fullName: string;
  email: string;
}

export interface Unit {
  id: number;
  unitName: string;
}

export function getProfileApi() {
  return authorizedRequest.get<ProfileResponse>('/api/v1/common-user/profile');
}

export function updateProfileApi(
  body: Partial<{
    id: number;
    name: string;
    gender: string;
    birthday: Date;
    phoneNumber: string;
    email: string;
    position: string;
    unitName: string;
  }>,
) {
  let form: any = {};
  form.id = body.id;
  if (body.name) {
    form.fullName = body.name;
  }
  if (body.gender) {
    form.gender = body.gender;
  }
  if (body.birthday) {
    form.birthday = formatISO(body.birthday);
  }
  if (body.phoneNumber) {
    form.phoneNumber = body.phoneNumber;
  }
  if (body.email) {
    form.email = body.email;
  }

  return authorizedRequest.post('/api/v1/common-user/update-profile', form);
}

export function changePasswordApi(body: {
  oldPassWord: string;
  password: string;
  rePassWord: string;
}) {
  return authorizedRequest.post('/api/v1/common-user/change-pass', body);
}
