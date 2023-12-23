import React, {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';

import {AppRouter} from 'constants/router';
import useCachedParams from 'hooks/useCachedParams';
import DecisionApplyFilter from 'components/handle/DecisionApplyFilter';
import DecisionPenalizeFilter from 'components/penalize/DecisionPenalizeFilter';

interface Filters {
  name: string;
  numberCode: string;
  violationField: string;
  violationPlace: string;
  decisionState: string;
  postingState: string;
  postingEmployment: string;
  createdAt: Date;
}

const ViolationInfoFilter = () => {
  const navigation = useNavigation();
  const {cachedParams} = useCachedParams();

  const activeDecisionApplyTab = useMemo(() => {
    return Number(cachedParams[AppRouter.SEARCH_VIOLATION_INFO]?.tab) === 1;
  }, [cachedParams]);

  return activeDecisionApplyTab ? (
    <DecisionApplyFilter
      isSearchFilter={true}
      callback={values => {
        navigation.navigate(AppRouter.SEARCH_VIOLATION_INFO, {
          name: values.name || '',
          idNumber: values.idNumber || '',
          status: values.status || '',
          violationPlace: values.violationPlace || '',
          violationTimeStart: values.violationTime?.start?.getTime() || null,
          violationTimeEnd: values.violationTime?.end?.getTime() || null,
          violationField: values.violationField || '',
          additionalDecisionType: values.additionalDecisionType || '',
          createdDateStart: values.createdDate?.start?.getTime() || null,
          createdDateEnd: values.createdDate?.end?.getTime() || null,
          postStatus: values.postStatus || '',
          postedUnit: values.postedUnit || '',
        });
      }}
    />
  ) : (
    <DecisionPenalizeFilter
      isSearchFilter={true}
      callback={values => {
        navigation.navigate(AppRouter.SEARCH_VIOLATION_INFO, {
          ...values,
          createdDateStart: values.createdDate?.start?.getTime() || null,
          createdDateEnd: values.createdDate?.end?.getTime() || null,
          violationTimeStart: values.violationTime?.start?.getTime() || null,
          violationTimeEnd: values.violationTime?.end?.getTime() || null,
        });
      }}
    />
  );
};

export default ViolationInfoFilter;
