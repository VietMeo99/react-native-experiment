import React, {useState, useCallback, useEffect} from 'react';
import {RefreshControl, StyleSheet, ScrollView, PixelRatio} from 'react-native';
import {useTranslation} from 'react-i18next';
import format from 'date-fns/format';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FileViewer from 'react-native-file-viewer';

import {Colors} from 'themes/colors';
import {TouchableOpacity, View} from 'components/ui';
import {Caption1, SmallText, Title2} from 'components/ui/text/Typography';
import IconPaperClipPrimary from 'assets/images/search/ic_paper_clip_primary.svg';
import {useRoute} from '@react-navigation/native';
import Alert from 'utils/alertManager';
import {getMessageFromError} from 'utils/common/common.util';
import {downloadFileApi, getFileByObjectApi} from 'apis/file.api';
import {getBasicDocumentByIdApi} from 'apis/search.api';
import {ScreenWidth} from 'themes/size';
import LoadingModal from 'components/ui/LoadingModal';
import {ObjectType, StorageType} from 'models/file.model';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral1,
    paddingTop: 24,
  },
});

const ViewDocument = () => {
  const {params} = useRoute<any>();
  const {t} = useTranslation('search');
  const [loading, setLoading] = useState<boolean>(true);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [detail, setDetail] = useState<{
    id: number;
    status: string;
    documentCode: string;
    numberSymbol: string;
    quoteContent: string;
    issuedDate: string;
    effectiveDate: string;
    agencyIssued: string;
    files: Array<{id: string; name: string; type: string}>;
    note: string;
  }>({
    id: 0,
    status: '',
    documentCode: '',
    numberSymbol: '',
    quoteContent: '',
    issuedDate: '',
    effectiveDate: '',
    agencyIssued: '',
    files: [],
    note: '',
  });

  const getDocumentDetail = useCallback(async () => {
    try {
      setLoading(true);
      const detailResponse = await getBasicDocumentByIdApi(params.id);
      const fileResponse = await getFileByObjectApi({
        objectId: params.id,
        objectType: ObjectType.Document,
        storageType: StorageType.Document,
      });
      setDetail({
        id: detailResponse?.id,
        status: detailResponse?.statusStr,
        documentCode: detailResponse?.documentCode,
        numberSymbol: detailResponse?.documentNumber,
        quoteContent: detailResponse?.content,
        issuedDate: detailResponse?.issuedDate
          ? format(new Date(detailResponse?.issuedDate), 'dd/MM/yyyy')
          : '',
        effectiveDate: detailResponse?.effectiveDate
          ? format(new Date(detailResponse?.effectiveDate), 'dd/MM/yyyy')
          : '',
        agencyIssued: detailResponse?.agencyIssued,
        files:
          fileResponse?.map(item => ({
            id: item.id,
            name: item.fileName,
            type: item.contentType,
          })) || [],
        note: detailResponse?.note,
      });
    } catch (e) {
      Alert.alert(t('notification', {ns: 'common'}), getMessageFromError(e));
    } finally {
      setLoading(false);
    }
  }, [params.id, t]);

  useEffect(() => {
    getDocumentDetail();
  }, [getDocumentDetail]);

  const downloadFile = useCallback(
    async (file: {id: string; name: string}) => {
      try {
        setDownloading(true);
        const response = await downloadFileApi(file);
        setDownloading(false);
        setTimeout(async () => {
          await FileViewer.open(response?.path(), {showOpenWithDialog: true});
        }, 50);
      } catch (e) {
        setDownloading(false);
        Alert.alert(t('notification', {ns: 'common'}), getMessageFromError(e));
      }
    },
    [t],
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getDocumentDetail} />
      }>
      <View flexRow mb={6} mx={6}>
        <View flex={1} mr={4}>
          {loading ? (
            <SkeletonPlaceholder borderRadius={16}>
              <>
                <SkeletonPlaceholder.Item width={80} height={20} />
                <SkeletonPlaceholder.Item
                  width={ScreenWidth - 160}
                  height={20}
                />
              </>
            </SkeletonPlaceholder>
          ) : (
            <>
              <Caption1>{t('documentCodeFull')}</Caption1>
              <Title2>{detail.documentCode}</Title2>
            </>
          )}
        </View>
        {loading ? (
          <SkeletonPlaceholder borderRadius={16}>
            <SkeletonPlaceholder.Item width={60} height={28} />
          </SkeletonPlaceholder>
        ) : (
          <View
            style={{
              maxHeight: 28,
              borderWidth: PixelRatio.roundToNearestPixel(1),
              borderColor: Colors.neutral4,
              backgroundColor: Colors.neutral2,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
            }}>
            <SmallText style={{color: Colors.neutral5}}>
              {detail.status}
            </SmallText>
          </View>
        )}
      </View>
      <View mb={6} mx={6}>
        {loading ? (
          <SkeletonPlaceholder borderRadius={16}>
            <>
              <SkeletonPlaceholder.Item width={80} height={20} />
              <SkeletonPlaceholder.Item width={ScreenWidth - 160} height={20} />
            </>
          </SkeletonPlaceholder>
        ) : (
          <>
            <Caption1>{t('numberSymbol')}</Caption1>
            <Title2>{detail.numberSymbol}</Title2>
          </>
        )}
      </View>
      <View mb={6} mx={6}>
        {loading ? (
          <SkeletonPlaceholder borderRadius={16}>
            <>
              <SkeletonPlaceholder.Item width={80} height={20} />
              <SkeletonPlaceholder.Item width={ScreenWidth - 160} height={20} />
            </>
          </SkeletonPlaceholder>
        ) : (
          <>
            <Caption1>{t('quoteContent')}</Caption1>
            <Title2>{detail.quoteContent}</Title2>
          </>
        )}
      </View>
      <View mb={6} mx={6}>
        {loading ? (
          <SkeletonPlaceholder borderRadius={16}>
            <>
              <SkeletonPlaceholder.Item width={80} height={20} />
              <SkeletonPlaceholder.Item width={ScreenWidth - 160} height={20} />
            </>
          </SkeletonPlaceholder>
        ) : (
          <>
            <Caption1>{t('dateIssued')}</Caption1>
            <Title2>{detail.issuedDate}</Title2>
          </>
        )}
      </View>
      <View mb={6} mx={6}>
        {loading ? (
          <SkeletonPlaceholder borderRadius={16}>
            <>
              <SkeletonPlaceholder.Item width={80} height={20} />
              <SkeletonPlaceholder.Item width={ScreenWidth - 160} height={20} />
            </>
          </SkeletonPlaceholder>
        ) : (
          <>
            <Caption1>{t('dateActive')}</Caption1>
            <Title2>{detail.effectiveDate}</Title2>
          </>
        )}
      </View>
      <View mb={6} mx={6}>
        {loading ? (
          <SkeletonPlaceholder borderRadius={16}>
            <>
              <SkeletonPlaceholder.Item width={80} height={20} />
              <SkeletonPlaceholder.Item width={ScreenWidth - 160} height={20} />
            </>
          </SkeletonPlaceholder>
        ) : (
          <>
            <Caption1>{t('agencyIssued')}</Caption1>
            <Title2>{detail.agencyIssued}</Title2>
          </>
        )}
      </View>
      <View mb={6} mx={6}>
        {loading ? (
          <SkeletonPlaceholder borderRadius={16}>
            <>
              <SkeletonPlaceholder.Item width={80} height={20} />
              <SkeletonPlaceholder.Item width={ScreenWidth - 160} height={20} />
            </>
          </SkeletonPlaceholder>
        ) : (
          <>
            <Caption1>{t('attachFile')}</Caption1>
            {detail.files.map(item => (
              <TouchableOpacity
                key={item.id}
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => downloadFile({id: item.id, name: item.name})}>
                <IconPaperClipPrimary />
                <Title2 style={{color: Colors.primary, marginLeft: 4}}>
                  {item.name}
                </Title2>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>
      <LoadingModal
        visible={downloading}
        text={t('openingFile', {ns: 'common'})}
      />
      <View mb={8} mx={6}>
        {loading ? (
          <SkeletonPlaceholder borderRadius={16}>
            <>
              <SkeletonPlaceholder.Item width={80} height={20} />
              <SkeletonPlaceholder.Item width={ScreenWidth - 160} height={20} />
            </>
          </SkeletonPlaceholder>
        ) : (
          <>
            <Caption1>{t('note')}</Caption1>
            <Title2>{detail.note}</Title2>
          </>
        )}
      </View>
      <View mb={35} />
    </ScrollView>
  );
};

export default ViewDocument;
