import authorizedRequest from 'utils/request/authorizedRequest';

interface ConstantsResponse {
  PENALIZE_DECISION_STATUS: Array<{id: number; value: string}>;
  DECISION_PENALIZE_ATTACHMENT_TYPE: Array<{id: number; value: string}>;
}

export function getConstantsApi() {
  return authorizedRequest.get<ConstantsResponse>('/api/v1/common/constants');
}

export interface ApplyTypeResponse {
  id: number;
  name: string;
}

export function getApplyTypesApi(params: {type: number}) {
  return authorizedRequest.get<Array<ApplyTypeResponse>>(
    '/api/v1/system/administrative-sanction/all-active-by-type',
    {params},
  );
}

export interface ViolationFieldResponse {
  id: number;
  name: string;
  code: string;
}

export function getViolationFieldsApi() {
  return authorizedRequest.get<Array<ViolationFieldResponse>>(
    '/api/v1/common/all-violation-field',
  );
}

export interface ChildrenUnitResponse {
  id: number;
  unitName: string | null;
}

export function getChildrenUnitsApi(id: number) {
  return authorizedRequest.get<Array<ChildrenUnitResponse>>(
    '/api/v1/system/unit/get-childrent-unit',
    {params: {id}},
  );
}

export interface UnitResponse {
  id: number;
  unitName: string;
}

export function getAllUnitsApi() {
  return authorizedRequest.get<Array<ChildrenUnitResponse>>(
    '/api/v1/common/all-unit',
  );
}
