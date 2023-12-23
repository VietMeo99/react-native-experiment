import React, {Fragment, FC, useState, useCallback, useEffect} from 'react';
import {Modal, PixelRatio} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import {useTranslation} from 'react-i18next';
import upperFirst from 'lodash/upperFirst';

import {Colors} from 'themes/colors';
import {Button, TouchableOpacity, View} from 'components/ui';
import {ScreenWidth} from 'themes/size';
import {Body1, Caption1, H2, Overline} from 'components/ui/text/Typography';
import LoadingModal from 'components/ui/LoadingModal';
import IconArrowRight from 'assets/images/penalize/ic_arrow_right.svg';
import IconUser from 'assets/images/penalize/ic_user.svg';
import IconCalendar from 'assets/images/penalize/ic_calendar.svg';
import IconPaperClipPrimary from 'assets/images/search/ic_paper_clip_primary.svg';
import {downloadFileApi, getFileByObjectApi} from 'apis/file.api';
import Alert from 'utils/alertManager';
import {getMessageFromError} from 'utils/common/common.util';
import {ObjectType, StorageType} from 'models/file.model';

interface Props {
  detail: Array<{
    id: number;
    type: number;
    prevType: number;
    prevTypeStr: string;
    createdBy: string;
    createdDate: string;
    info: string;
  }>;
  visible: boolean;
  setVisible: (v: boolean) => void;
}

const ContinueEnforceInfo: FC<Props> = ({detail, visible, setVisible}) => {
  const {t} = useTranslation('handle');
  const [downloading, setDownloading] = useState<boolean>(false);
  const [files, setFiles] = useState<
    Array<Array<{id: string; name: string; type: string}>>
  >([]);

  const getFiles = useCallback(async () => {
    try {
      const response = await Promise.all(
        detail.map(item =>
          getFileByObjectApi({
            objectId: String(item.id),
            objectType: ObjectType.HandlingAttach,
            storageType: StorageType.AdditionalPenalizeAttach,
          }),
        ),
      );
      setFiles(
        response?.map(
          item =>
            item?.map(i => ({
              id: i.id,
              name: i.fileName,
              type: i.contentType,
            })) || [],
        ) || [],
      );
    } catch (e: any) {
      Alert.alert(t('notification', {ns: 'common'}), getMessageFromError(e));
    }
  }, [detail, t]);

  useEffect(() => {
    getFiles();
  }, [getFiles]);

  const downloadFile = useCallback(
    async (file: {id: string; name: string}) => {
      try {
        setDownloading(true);
        const response: any = await downloadFileApi(file);
        setDownloading(false);
        setTimeout(async () => {
          await FileViewer.open(response?.path(), {showOpenWithDialog: true});
        }, 50);
      } catch (e: any) {
        setDownloading(false);
        Alert.alert(t('notification', {ns: 'common'}), getMessageFromError(e));
      }
    },
    [t],
  );

  return (
    <Fragment>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View
          flex={1}
          alignCenter
          justifyCenter
          style={{backgroundColor: 'rgba(17,17,17, 0.3)'}}>
          <View
            style={{
              width: ScreenWidth - 48,
              backgroundColor: Colors.neutral1,
              borderWidth: PixelRatio.roundToNearestPixel(1),
              borderColor: Colors.neutral3,
              borderRadius: 16,
            }}
            py={10}>
            <H2 center style={{marginBottom: 16}}>
              {t('continueEnforceInfo')}
            </H2>
            {detail.map((item, index) => (
              <View
                key={item.id}
                px={5}
                py={2}
                style={{
                  borderBottomWidth: index < detail.length - 1 ? 1 : 0,
                  borderColor: Colors.neutral3,
                }}>
                <View flexRow alignCenter justifySpaceBetween>
                  <View flexRow flex={222} alignCenter>
                    <View
                      mr={1}
                      px={1.5}
                      py={0.5}
                      style={{
                        backgroundColor: Colors.secondaryLight1,
                        borderRadius: 4,
                      }}
                      flexShrink={1}>
                      <Overline
                        style={{color: Colors.secondary1}}
                        numberOfLines={2}>
                        {upperFirst(
                          item.prevTypeStr.replace('Quyết định ', ''),
                        )}
                      </Overline>
                    </View>
                    <IconArrowRight />
                    <View
                      ml={1}
                      px={1.5}
                      py={0.5}
                      style={{
                        backgroundColor: Colors.primaryLighten,
                        borderRadius: 4,
                      }}>
                      <Overline
                        style={{color: Colors.primary}}
                        numberOfLines={2}>
                        {t('enforce')}
                      </Overline>
                    </View>
                  </View>
                  <View flex={100} ml={1} alignEnd>
                    <View flexRow justifyEnd mb={1}>
                      <Overline>{item.createdBy}</Overline>
                      <IconUser />
                    </View>
                    <View flexRow justifyEnd>
                      <Overline>{item.createdDate}</Overline>
                      <IconCalendar />
                    </View>
                  </View>
                </View>
                <Caption1 mt={2.5} mb={1}>
                  {t('continueEnforceDecisionInfo')}
                </Caption1>
                <Body1 style={{color: Colors.neutral6}} mb={4}>
                  {item.info}
                </Body1>
                <Caption1 mb={1}>{t('relatedDocument')}</Caption1>
                {files?.[index]?.map(i => (
                  <TouchableOpacity
                    key={i.id}
                    style={{flexDirection: 'row', marginBottom: 8}}
                    onPress={() => downloadFile({id: i.id, name: i.name})}>
                    <IconPaperClipPrimary />
                    <Body1
                      style={{
                        color: Colors.primary,
                        marginLeft: 4,
                      }}>
                      {i.name}
                    </Body1>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
            <View mt={6} justifyCenter alignCenter>
              <Button
                style={{width: 120}}
                variant={'secondary'}
                onPress={() => setVisible(false)}>
                {t('close')}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <LoadingModal
        visible={downloading}
        text={t('openingFile', {ns: 'common'})}
      />
    </Fragment>
  );
};

export default ContinueEnforceInfo;
