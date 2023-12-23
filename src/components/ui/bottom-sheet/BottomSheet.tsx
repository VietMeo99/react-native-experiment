import React, {
  ReactNode,
  FC,
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import {StyleSheet} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  // useBottomSheetDynamicSnapPoints,
  // BottomSheetModalProps,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import View from '../view/View';
import {boxShadowStyles} from '../view/BoxShadow';
import {Colors} from 'themes/colors';

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  indicator: {width: 100, backgroundColor: Colors.neutral3},
});

interface IProps {
  children: (props: {
    opened: boolean;
    onOpen: () => void;
    onClose: () => void;
  }) => ReactNode;
  renderContent: (props: {
    opened: boolean;
    onOpen: () => void;
    onClose: () => void;
  }) => ReactNode;
}

const BottomSheet: FC<any> = ({
  // const BottomSheet: FC<IProps> = ({
  // const BottomSheet: FC<IProps & Partial<BottomSheetModalProps>> = ({
  children,
  renderContent,
  ...other
}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // const snapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // const {
  //   animatedHandleHeight,
  //   animatedSnapPoints,
  //   animatedContentHeight,
  //   handleContentLayout,
  // } = useBottomSheetDynamicSnapPoints(snapPoints);
  const handleContentLayout = () => {};

  const onOpen = useCallback(() => {
    setOpened(true);
    bottomSheetModalRef.current?.present();
  }, []);

  const onClose = useCallback(() => {
    setOpened(false);
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.1}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        enableTouchThrough={true}
      />
    ),
    [],
  );

  return (
    <>
      {children({opened, onOpen, onClose})}
      {/* <BottomSheetModalProvider>
        <View>
          <BottomSheetModal
            snapPoints={snapPoints}
            // handleHeight={animatedHandleHeight}
            // contentHeight={animatedContentHeight}
            backgroundStyle={[boxShadowStyles.all, styles.container]}
            handleIndicatorStyle={styles.indicator}
            topInset={150}
            {...other} 
            onDismiss={() => {
              setOpened(false);
              other?.onDismiss?.();
            }}
            ref={bottomSheetModalRef}
            backdropComponent={renderBackdrop}>
            <View flex={1} onLayout={handleContentLayout}>
              {renderContent({opened, onOpen, onClose})}
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider> */}
    </>
  );
};

export default BottomSheet;
