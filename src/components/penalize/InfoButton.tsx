import React, {Fragment, FC, useState} from 'react';

import {TouchableOpacity} from 'components/ui';
import IconInformationActive from 'assets/images/penalize/ic_information_active.svg';
import IconInformationInactive from 'assets/images/penalize/ic_information_inactive.svg';
import ContinueEnforceInfo from './ContinueEnforceInfo';

interface Props {
  data: Array<{
    id: number;
    type: number;
    prevType: number;
    prevTypeStr: string;
    createdBy: string;
    createdDate: string;
    info: string;
  }>;
}

const InfoButton: FC<Props> = ({data}) => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <Fragment>
      <TouchableOpacity onPress={() => setActive(p => !p)}>
        {active ? <IconInformationActive /> : <IconInformationInactive />}
      </TouchableOpacity>
      <ContinueEnforceInfo
        detail={data}
        visible={active}
        setVisible={setActive}
      />
    </Fragment>
  );
};

export default InfoButton;
