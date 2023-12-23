import React, {useState, useCallback, useEffect} from 'react';
import {RefreshControl, StyleSheet, ScrollView, PixelRatio} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FileViewer from 'react-native-file-viewer';

import {Colors} from 'themes/colors';
import {TouchableOpacity, View} from 'components/ui';
import {Caption1, SmallText, Title2} from 'components/ui/text/Typography';
import IconPaperClipPrimary from 'assets/images/search/ic_paper_clip_primary.svg';
import {getViolationCriminallyByIdApi} from 'apis/search.api';
import Alert from 'utils/alertManager';
import {getMessageFromError} from 'utils/common/common.util';
import {ScreenWidth} from 'themes/size';
import LoadingModal from 'components/ui/LoadingModal';
import {downloadFileApi, getFileByObjectApi} from 'apis/file.api';
import {ObjectType, StorageType} from 'models/file.model';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral1,
    paddingTop: 24,
  },
});

const ViewCriminalHandlingViolation = () => {
  const {params} = useRoute<any>();
  const {t} = useTranslation('search');
  const [loading, setLoading] = useState<boolean>(true);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [detail, setDetail] = useState<{
    id: number;
    status: string;
    violationCode: string;
    content: string;
    description: string;
    files: Array<{id: string; name: string; type: string}>;
  }>({
    id: 0,
    status: '',
    violationCode: '',
    content: '',
    description: '',
    files: [],
  });

  const getViolationDetail = useCallback(async () => {
    try {
      setLoading(true);
      const detailResponse = await getViolationCriminallyByIdApi(params.id);
      const fileResponse = await getFileByObjectApi({
        objectId: params.id,
        objectType: ObjectType.HandlingCriminalAttach,
        storageType: StorageType.HandlingCriminalAttach,
      });
      setDetail({
        id: detailResponse?.id,
        status: detailResponse?.statusStr,
        violationCode: detailResponse?.code,
        content: detailResponse?.content,
        description: detailResponse?.description,
        files:
          fileResponse?.map(item => ({
            id: item.id,
            name: item.fileName,
            type: item.contentType,
          })) || [],
      });
    } catch (e) {
      Alert.alert(t('notification', {ns: 'common'}), getMessageFromError(e));
    } finally {
      setLoading(false);
    }
  }, [params.id, t]);

  useEffect(() => {
    getViolationDetail();
  }, [getViolationDetail]);

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
        <RefreshControl refreshing={loading} onRefresh={getViolationDetail} />
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
              <Caption1>{t('idViolationContentXLHS')}</Caption1>
              <Title2>{detail.violationCode}</Title2>
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
            <Caption1>{t('violationContent')}</Caption1>
            <Title2>{detail.content}</Title2>
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
            <Caption1>{t('description')}</Caption1>
            <Title2>{detail.description}</Title2>
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
      <View mb={35} />
    </ScrollView>
  );
};

export default ViewCriminalHandlingViolation;
