import React, {FC, ReactElement, useState} from 'react';
import {Image as RNImage, ImageProps, StyleSheet} from 'react-native';
import View from '../view/View';

interface Props extends ImageProps {
  renderLoading?: () => ReactElement;
  renderError?: () => ReactElement;
}

const Image: FC<Props> = ({source, renderLoading, renderError, ...other}) => {
  // useEffect(() => {
  //   if (source.uri) {
  //     RNImage.prefetch(source.uri)
  //       .then(() => {
  //         setLoading(false);
  //       })
  //       .catch(() => {
  //         setError(true);
  //       });
  //   }
  // }, [source.uri]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  return (
    <>
      {loading && !error && renderLoading && (
        <View style={StyleSheet.absoluteFill}>{renderLoading()}</View>
      )}
      {error && renderError && (
        <View style={StyleSheet.absoluteFill}>{renderError()}</View>
      )}
      <RNImage
        {...other}
        source={source}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => setError(true)}
      />
    </>
  );
};

export default Image;
