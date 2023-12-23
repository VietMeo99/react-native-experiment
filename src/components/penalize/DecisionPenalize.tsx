import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  PixelRatio,
} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import uniqBy from 'lodash/uniqBy';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';

import {Colors} from 'themes/colors';
import Empty from 'components/Empty';
import {TouchableOpacity, View} from 'components/ui';
import {H2, Overline, SmallText, Title1} from 'components/ui/text/Typography';
import {AppRouter} from 'constants/router';
import {getDecisionPenalizesApi} from 'apis/penalize.api';
import Alert from 'utils/alertManager';
import {getMessageFromError} from 'utils/common/common.util';
import useCachedParams from 'hooks/useCachedParams';
import {ScreenHeight} from 'themes/size';
import BottomSheet from 'components/ui/bottom-sheet/BottomSheet';
import IconBarsArrowUp from 'assets/images/common/ic_bars_arrow_up.svg';
import IconArrowUpBgPrimary from 'assets/images/common/ic_arrow_up_bg_primary.svg';
import useSearch from 'hooks/useSearch';

const styles = StyleSheet.create({
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

interface Props {
  isSearch?: boolean;
}

const DecisionPenalize: FC<Props> = ({isSearch}) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {params} = useRoute<any>();
  const {t} = useTranslation('penalize');
  const {setCachedParams} = useCachedParams();
  const {search} = useSearch();
  const [data, setData] = useState<
    Array<{
      id: number;
      decisionNumber: string;
      idNumber: string;
      name: string;
      status: string;
    }>
  >([]);
  const [sort, setSort] = useState<undefined | '1' | '9' | 'A' | 'Z'>(
    undefined,
  );
  const [page, setPage] = useState<number>(0);
  const [end, setEnd] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const listRef = useRef<FlatList>(null);

  const filteredData = useMemo(() => {
    return uniqBy(data, 'id');
  }, [data]);

  useEffect(() => {
    setCachedParams(AppRouter.PENALIZE, params);
    setCachedParams(AppRouter.SEARCH_VIOLATION_INFO, params);
  }, [params, setCachedParams]);

  const getDecisionPenalizes = useCallback(async () => {
    setLoading(page === 0);
    let sortTemp;
    switch (sort) {
      case '1':
        sortTemp = 'decisionNumber,asc';
        break;

      case '9':
        sortTemp = 'decisionNumber,desc';
        break;

      case 'A':
        sortTemp = 'name,asc';
        break;

      case 'Z':
        sortTemp = 'name,desc';
        break;
    }
    try {
      const response = await getDecisionPenalizesApi({
        searchType: isSearch ? 0 : 4,
        page,
        size: 20,
        sort: sortTemp,
        keyword: search,
        fromTime: params?.createdDateStart
          ? startOfDay(params.createdDateStart).getTime()
          : undefined,
        toTime: params?.createdDateEnd
          ? endOfDay(params.createdDateEnd).getTime()
          : undefined,
        decisionNumber: params?.decisionNumber,
        name: params?.name,
        idNumber: params?.idNumber,
        type: params?.type,
        violationPlace: params?.violationPlace,
        violationFromTime: params?.violationTimeStart
          ? startOfDay(params.violationTimeStart).getTime()
          : undefined,
        violationToTime: params?.violationTimeEnd
          ? endOfDay(params.violationTimeEnd).getTime()
          : undefined,
        attachmentTypes: params?.additionalDecisionType
          ? [params.additionalDecisionType]
          : undefined,
        violationField: params?.violationField,
        status: params?.status,
        postStatus: params?.postStatus,
        postedUnit: params?.postedUnit,
      });
      const mappedResponse =
        response?.content?.map(item => {
          const idNumbers = [];
          const names = [];

          item.decisionPenalizeViolatorInfos?.forEach(i => {
            idNumbers.push(i.businessCodeOrIdentityNumber as never);
            names.push(i.name as never);
          });
          return {
            id: item.id,
            decisionNumber: item.decisionNumber || '',
            name: names.length ? names.join('\n') : '',
            idNumber: idNumbers.length ? idNumbers.join('\n') : '',
            status: item.statusDecisionStr || '',
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
    } catch (e: any) {
      Alert.alert(t('notification', {ns: 'common'}), getMessageFromError(e));
    } finally {
      setLoading(false);
    }
  }, [isSearch, page, params, search, sort, t]);

  useEffect(() => {
    if (isFocused) {
      getDecisionPenalizes();
    }
  }, [isFocused, getDecisionPenalizes]);

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
            navigation.navigate(AppRouter.VIEW_PENALIZE_INFO, {
              id: item.id,
            })
          }>
          <View style={styles.border} flex={1} px={2} py={2.5}>
            <SmallText
              numberOfLines={3}
              ellipsizeMode={'tail'}
              style={styles.columnText}>
              {item.decisionNumber}
            </SmallText>
          </View>
          <View style={styles.border} flex={2} px={2} py={2.5}>
            <SmallText
              numberOfLines={3}
              ellipsizeMode={'tail'}
              style={styles.columnText}>
              {item.name}
            </SmallText>
          </View>
          <View style={styles.border} flex={1} px={2} py={2.5}>
            <SmallText
              numberOfLines={3}
              ellipsizeMode={'tail'}
              style={styles.columnText}>
              {item.idNumber}
            </SmallText>
          </View>
          <View
            style={[styles.border, {borderRightWidth: 0}]}
            flex={1}
            px={2}
            py={2.5}>
            <SmallText
              numberOfLines={3}
              ellipsizeMode={'tail'}
              style={styles.columnText}>
              {item.status}
            </SmallText>
          </View>
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  return (
    <View flex={1} pt={2} style={{position: 'relative'}}>
      <View flexRow>
        <View style={styles.tableHead} flex={1} px={2} py={1.5}>
          <Overline
            style={styles.columnTitle}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {t('decisionNumber')}
          </Overline>
        </View>
        <View style={styles.tableHead} flex={2} px={2} py={1.5}>
          <Overline
            style={styles.columnTitle}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {t('enterprisePersonal')}
          </Overline>
        </View>
        <View style={styles.tableHead} flex={1} px={2} py={1.5}>
          <Overline
            style={styles.columnTitle}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {t('idPersonal')}
          </Overline>
        </View>
        <View style={styles.tableHead} flex={1} px={2} py={1.5}>
          <Overline
            style={styles.columnTitle}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {t('status')}
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
              {t('sortPenalizeDecision')}
            </H2>
            <TouchableOpacity
              style={[styles.field, {borderTopWidth: 1}]}
              onPress={() => {
                setSort('A');
                onClose();
              }}>
              <Title1>{t('personalFromAToZ')}</Title1>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.field}
              onPress={() => {
                setSort('Z');
                onClose();
              }}>
              <Title1>{t('personalFromZToA')}</Title1>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.field}
              onPress={() => {
                setSort('1');
                onClose();
              }}>
              <Title1>{t('decisionNumberFrom1To9')}</Title1>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.field}
              onPress={() => {
                setSort('9');
                onClose();
              }}>
              <Title1>{t('decisionNumberFrom9To1')}</Title1>
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

export default DecisionPenalize;
