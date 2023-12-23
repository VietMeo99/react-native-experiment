import React, {useCallback, useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

import {TouchableOpacity, View} from 'components/ui';
import {Overline} from 'components/ui/text/Typography';
import {navigationService} from 'utils/navigation.util';
import {AppRouter} from 'constants/router';
import IconBell from 'assets/images/notification/ic_bell.svg';
import {getTotalUnreadNotificationsApi} from 'apis/notification.api';
import {Colors} from 'themes/colors';

const Bell = () => {
  const isFocused = useIsFocused();
  const [unread, setUnread] = useState<number>(0);

  const getTotalUnreadNotifications = useCallback(async () => {
    try {
      const response = await getTotalUnreadNotificationsApi();
      setUnread(response);
    } catch (e) {
      // TODO: Show Error
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      getTotalUnreadNotifications();
    }
  }, [isFocused, getTotalUnreadNotifications]);

  return (
    <TouchableOpacity
      style={{marginRight: 20, position: 'relative'}}
      onPress={() =>
        navigationService.navigator?.navigate(AppRouter.NOTIFICATIONS)
      }>
      <IconBell />
      {!!unread && (
        <View
          style={{
            position: 'absolute',
            top: -4,
            right: -4,
            backgroundColor: Colors.secondary1,
            borderRadius: 4,
            width: 16,
            height: 16,
          }}
          center>
          <Overline style={{color: Colors.neutral1}}>{unread}</Overline>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Bell;
