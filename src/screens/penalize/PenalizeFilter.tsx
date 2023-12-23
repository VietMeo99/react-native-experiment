import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {AppRouter} from 'constants/router';
import DecisionPenalizeFilter from 'components/penalize/DecisionPenalizeFilter';

const PenalizeFilter = () => {
  const navigation = useNavigation();

  return (
    <DecisionPenalizeFilter
      callback={values => {
        navigation.navigate(AppRouter.PENALIZE, {
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

export default PenalizeFilter;
