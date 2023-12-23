import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';

import {Colors} from 'themes/colors';
import GeneralNotification from 'components/home/general-notification/GeneralNotification';
// import ViolationStatistic from 'components/home/violation-statistic/ViolationStatistic';
// import FinesStatistic from 'components/home/fines-statistic/FinesStatistic';
// import PrivateNotification from 'components/home/PrivateNotification';
import useCachedParams from 'hooks/useCachedParams';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
});

const Home = () => {
  const {resetCachedParams} = useCachedParams();
  const [trigger, setTrigger] = useState<number>(new Date().getTime());
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTrigger(new Date().getTime());
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    resetCachedParams();
  }, [resetCachedParams]);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Fragment key={trigger}>
        <GeneralNotification />
        {/* <ViolationStatistic />d */}
        {/* <GeneralNotification />
        <ViolationStatistic />
        <FinesStatistic />
        <PrivateNotification /> */}
      </Fragment>
    </ScrollView>
  );
};

export default Home;
