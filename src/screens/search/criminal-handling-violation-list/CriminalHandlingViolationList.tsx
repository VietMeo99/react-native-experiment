import React, {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import {
  StyleSheet,
  FlatList,
  PixelRatio,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import uniqBy from 'lodash/uniqBy';

import {Colors} from 'themes/colors';
import {TouchableOpacity, View} from 'components/ui';
import {H2, Overline, SmallText, Title1} from 'components/ui/text/Typography';
import {AppRouter} from 'constants/router';
import Empty from 'components/Empty';
import BottomSheet from 'components/ui/bottom-sheet/BottomSheet';
import IconBarsArrowUp from 'assets/images/common/ic_bars_arrow_up.svg';
import IconArrowUpBgPrimary from 'assets/images/common/ic_arrow_up_bg_primary.svg';
import useCachedParams from 'hooks/useCachedParams';
import useSearch from 'hooks/useSearch';
import Alert from 'utils/alertManager';
import {getMessageFromError} from 'utils/common/common.util';
import {ScreenHeight} from 'themes/size';
import {getViolationCriminallyApi} from 'apis/search.api';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral1,
    position: 'relative',
  },
  tableHead: {
    backgroundColor: Colors.primaryLight,
    height: 44,
  },
  columnTitle: {
    color: Colors.primary,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  columnText: {
    color: Colors.neutral7,
  },
  border: {
    minHeight: 40,
    maxHeight: 100,
    borderColor: Colors.neutral2,
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  button: {
    position: 'absolute',
    top: ScreenHeight / 2 - 160,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 2,
    backgroundColor: Colors.primaryLight,
    borderWidth: PixelRatio.roundToNearestPixel(1),
    borderColor: Colors.primary,
    borderRadius: 100,
  },
  scrollToTop: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: Colors.neutral3,
    borderBottomWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});

const CriminalHandlingViolationList = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {t} = useTranslation('search');
  const {params} = useRoute<any>();
  const {setCachedParams} = useCachedParams();
  const {search} = useSearch();
  const [data, setData] = useState<
    Array<{id: number; code: string; content: string}>
  >([]);
  const [sort, setSort] = useState<undefined | '1' | '9' | 'A' | 'Z'>(
    undefined,
  );
  const [page, setPage] = useState<number>(0);
  const [end, setEnd] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const listRef = useRef();

  const filteredData = useMemo(() => {
    return uniqBy(data, 'id');
  }, [data]);

  useEffect(() => {
    setCachedParams(AppRouter.CRIMINAL_HANDLING_VIOLATION_LIST, params);
  }, [params, setCachedParams]);

  const getViolationList = useCallback(async () => {
    setLoading(page === 0);
    let sortTemp;
    switch (sort) {
      case '1':
        sortTemp = 'code,asc';
        break;

      case '9':
        sortTemp = 'code,desc';
        break;

      case 'A':
        sortTemp = 'content,asc';
        break;

      case 'Z':
        sortTemp = 'content,desc';
        break;
    }
    try {
      const response = await getViolationCriminallyApi({
        page,
        size: 20,
        sort: sortTemp,
        keyword: search,
        code: params?.code,
        content: params?.content,
      });
      const mappedResponse =
        response?.content?.map(item => {
          return {
            id: item.id,
            code: item.code || '',
            content: item.content || '',
          };
        }) || [];
      if (page) {
        setData(p => p.concat(mappedResponse));
      } else {
        setData(mappedResponse);
      }
      if (!response?.content?.length) {
        setEnd(true);
      }
    } catch (e) {
      Alert.alert(t('notification', {ns: 'common'}), getMessageFromError(e));
    } finally {
      setLoading(false);
    }
  }, [page, params, search, sort, t]);

  useEffect(() => {
    if (isFocused) {
      getViolationList();
    }
  }, [isFocused, getViolationList]);

  useEffect(() => {
    if (!isFocused) {
      setPage(0);
      setEnd(false);
    }
  }, [isFocused]);

  const renderItem = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          style={styles.row}
          onPress={() =>
            navigation.navigate(AppRouter.VIEW_CRIMINAL_HANDLING_VIOLATION, {
              id: item.id,
            })
          }>
          <View style={styles.border} flex={3} px={2} py={2.5}>
            <SmallText
              numberOfLines={3}
              ellipsizeMode={'tail'}
              style={styles.columnText}>
              {item.content}
            </SmallText>
          </View>
          <View
            style={[styles.border, {borderRightWidth: 0}]}
            flex={5}
            px={2}
            py={2.5}>
            <SmallText
              numberOfLines={3}
              ellipsizeMode={'tail'}
              style={styles.columnText}>
              {item.content}
            </SmallText>
          </View>
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  return (
    <View style={styles.container} flex={1} pt={6}>
      <View flexRow>
        <View style={styles.tableHead} flex={3} px={2} py={3.5}>
          <Overline style={styles.columnTitle}>{t('idViolationXLHS')}</Overline>
        </View>
        <View style={styles.tableHead} flex={5} px={2} py={3.5}>
          <Overline style={styles.columnTitle}>
            {t('violationContent')}
          </Overline>
        </View>
      </View>
      {loading || !isFocused ? (
        <View flex={1} alignCenter py={8}>
          <ActivityIndicator color={Colors.primary} size={'small'} />
        </View>
      ) : filteredData.length ? (
        <FlatList
          ref={listRef}
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          refreshing={loading}
          onRefresh={() => setPage(0)}
          onEndReached={() =>
            end || filteredData.length < 20 ? undefined : setPage(p => p + 1)
          }
          onEndReachedThreshold={0.5}
          ListFooterComponent={<View style={{height: 32}} />}
        />
      ) : (
        <Empty />
      )}
      <BottomSheet
        renderContent={({onClose}) => (
          <View flex={1} pt={5} pb={8}>
            <H2 center style={{marginBottom: 24}}>
              {t('sortCriminalHandlingViolationList')}
            </H2>
            <TouchableOpacity
              style={[styles.field, {borderTopWidth: 1}]}
              onPress={() => {
                setSort('A');
                onClose();
              }}>
              <Title1>{t('contentFromAToZ')}</Title1>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.field}
              onPress={() => {
                setSort('Z');
                onClose();
              }}>
              <Title1>{t('contentFromZToA')}</Title1>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.field}
              onPress={() => {
                setSort('1');
                onClose();
              }}>
              <Title1>{t('violationCodeFrom1To9')}</Title1>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.field}
              onPress={() => {
                setSort('9');
                onClose();
              }}>
              <Title1>{t('violationCodeFrom9To1')}</Title1>
            </TouchableOpacity>
          </View>
        )}>
        {({onOpen}) => (
          <TouchableOpacity style={styles.button} onPress={onOpen}>
            <IconBarsArrowUp />
          </TouchableOpacity>
        )}
      </BottomSheet>
      <TouchableOpacity
        style={styles.scrollToTop}
        onPress={() => {
          listRef.current?.scrollToIndex({index: 0});
        }}>
        <IconArrowUpBgPrimary />
      </TouchableOpacity>
    </View>
  );
};

export default CriminalHandlingViolationList;
