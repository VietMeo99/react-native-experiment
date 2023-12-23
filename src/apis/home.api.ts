import authorizedRequest from 'utils/request/authorizedRequest';

interface OverallQuantityDecisionsResponse {
  qd_mien_chap_hanh: number;
  qd_truy_cuu_tnhs: number;
  qd_dinh_chi: number;
  qd_huy_bo: number;
  qd_cuong_che: number;
  da_ban_hanh: number;
  qd_da_hoan: number;
  qd_ket_thuc: number;
  qd_chua_ban_hanh: number;
  qd_dinh_chinh: number;
}

export function getOverallQuantityDecisionApi(
  params: Partial<{
    unitId: string;
    violationField: string;
    fromTime: string;
    toTime: string;
  }>,
) {
  const search = encodeURIComponent(
    `{"size":10,"page":0,"sort":"","unitId":${
      params.unitId || null
    },"fromDateLong":${params.fromTime || null},"toDateLong":${
      params.toTime || null
    },"fieldsType":${params.violationField || null},"type":3}`,
  );

  // return authorizedRequest.get<OverallQuantityDecisionsResponse>(
  //   `/api/v1/system/dashboard/getAll?search=${search}`,
  //   {
  //     params: {
  //       page: 0,
  //       size: 10,
  //       type: 3,
  //       unitId: params.unitId || null,
  //       fieldsType: params.violationField || null,
  //       fromDateLong: params.fromTime || null,
  //       toDateLong: params.toTime || null,
  //       sort: null,
  //     },
  //   },
  // );
  return {
    qd_mien_chap_hanh: 10,
    qd_truy_cuu_tnhs: 10,
    qd_dinh_chi: 10,
    qd_huy_bo: 10,
    qd_cuong_che: 10,
    da_ban_hanh: 10,
    qd_da_hoan: 10,
    qd_ket_thuc: 10,
    qd_chua_ban_hanh: 10,
    qd_dinh_chinh: 10,
  };
}

interface TotalQuantityDecisionsResponse {
  total: number;
  chua_ban_hanh: number;
  da_hoan: number;
  da_ban_hanh: number;
  dinh_chinh: number;
  dinh_chi: number;
  mien_chap_hanh: number;
  cuong_che: number;
  ket_thuc: number;
  huy_bo: number;
  truy_cuu_tnhs: number;
  thi_hanh: number;
}

export function getTotalQuantityDecisionApi(
  params: Partial<{
    unitId: string;
    violationField: string;
    fromTime: string;
    toTime: string;
  }>,
) {
  const search = encodeURIComponent(
    `{"size":10,"page":0,"sort":"","unitId":${
      params.unitId || null
    },"fromDateLong":${params.fromTime || null},"toDateLong":${
      params.toTime || null
    },"fieldsType":${params.violationField || null}}`,
  );

  // return authorizedRequest.get<TotalQuantityDecisionsResponse>(
  //   `/api/v1/system/dashboard/getQDXP?search=${search}`,
  //   {
  //     params: {
  //       page: 0,
  //       size: 10,
  //       type: 3,
  //       unitId: params.unitId || null,
  //       fieldsType: params.violationField || null,
  //       fromDateLong: params.fromTime || null,
  //       toDateLong: params.toTime || null,
  //       sort: null,
  //     },
  //   },
  // );
  return {
    total: 10,
    chua_ban_hanh: 10,
    da_hoan: 10,
    da_ban_hanh: 10,
    dinh_chinh: 10,
    dinh_chi: 10,
    mien_chap_hanh: 10,
    cuong_che: 10,
    ket_thuc: 10,
    huy_bo: 10,
    truy_cuu_tnhs: 10,
    thi_hanh: 10,
  };
}

interface OverallFinesResponse {
  month_year: string;
  tong_so_tien_phat_thu_duoc: number;
  tong_so_tien_phat_thu_tu_dau_gia: number;
}

export function getOverallFinesApi(
  params: Partial<{
    unitId: string;
    fromTime: string;
    toTime: string;
  }>,
) {
  const search = encodeURIComponent(
    `{"size":10,"page":0,"sort":"","unitId":${
      params.unitId || null
    },"fromDateLong":${params.fromTime || null},"toDateLong":${
      params.toTime || null
    }}`,
  );

  // return authorizedRequest.get<Array<OverallFinesResponse>>(
  //   `/api/v1/system/dashboard/getMoney?search=${search}`,
  // );
  return Array(10).fill({
    month_year: '10',
    tong_so_tien_phat_thu_duoc: 10,
    tong_so_tien_phat_thu_tu_dau_gia: 10,
  });
}
