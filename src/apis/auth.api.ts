import authorizedRequest from 'utils/request/authorizedRequest';

export function logoutApi() {
  return authorizedRequest.get('/public/v1/sso/jwt-logout');
}
