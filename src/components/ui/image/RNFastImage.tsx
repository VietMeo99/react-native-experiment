// import ImageSkeleton from '@components/sekeleton/ImageSkeleton';
import React, {FC, ReactElement, useState} from 'react';
import {StyleSheet} from 'react-native';
import FastImage, {FastImageProps, Source} from 'react-native-fast-image';
import View from '../view/View';

interface Props {
  source: Source;
  renderLoading?: () => ReactElement;
  renderError?: () => ReactElement;
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: '100%',
    height: '100%',
  },
});

const RNFastImage: FC<Props & FastImageProps> = ({
  source,
  renderLoading,
  renderError,
  ...other
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  return (
    <View style={styles.container}>
      {/* {isLoading && <ImageSkeleton isLoading={isLoading} />} */}
      {loading && !error && renderLoading && <View>{renderLoading()}</View>}
      {error && renderError && <View>{renderError()}</View>}
      <FastImage
        source={source}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => setError(true)}
        style={styles.image}
        {...other}
      />
    </View>
  );
};

export default RNFastImage;
