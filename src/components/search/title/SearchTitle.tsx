import React, {useState, useRef, useMemo, useEffect} from 'react';
import {StyleSheet, Platform, Animated, Easing, TextInput} from 'react-native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import HeaderTitle from '@react-navigation/elements/src/Header/HeaderTitle';

import {Colors} from 'themes/colors';
import {TouchableOpacity, View} from 'components/ui';
import IconMagnifyingGlass from 'assets/images/common/ic_magnifying_glass.svg';
import useSearch from 'hooks/useSearch';

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    backgroundColor: Colors.white,
    height: 40,
    justifyContent: 'center',
    borderRadius: 8,
    marginLeft: 'auto',
  },
  searchInput: {
    paddingLeft: 40,
    paddingRight: 10,
    color: Colors.neutral6,
  },
  searchIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: 0,
  },
});

const SearchTitle = ({
  title,
  titleStyle = {},
  tabHeaderShown = false,
  headerRightShown = false,
}) => {
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const [expanded, setExpanded] = useState<boolean>(false);
  const animatedSearch = useRef(new Animated.Value(0)).current;
  const animatedSearchWidth = useRef(new Animated.Value(40)).current;
  const inputRef = useRef<any>();
  const timer = useRef<NodeJS.Timeout>();
  const {setSearch} = useSearch();

  const maxWidth = useMemo(() => {
    return (
      frame.width -
      (headerRightShown
        ? Platform.select({ios: 32, default: 48})
        : 64 + Math.max(insets.left, insets.right)) *
        2
    );
  }, [frame.width, insets.left, insets.right, headerRightShown]);

  useEffect(() => {
    return () => {
      timer?.current && clearTimeout(timer.current);
    };
  }, []);

  const expandSearch = () => {
    setExpanded(true);
    Animated.timing(animatedSearch, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      timer?.current && clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        Animated.timing(animatedSearchWidth, {
          toValue: maxWidth,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(() => {
          inputRef?.current?.focus();
        });
      }, 125);
    });
  };

  const collapseSearch = () => {
    setSearch('');
    Animated.timing(animatedSearchWidth, {
      toValue: 40,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      timer?.current && clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        Animated.timing(animatedSearch, {
          toValue: 0,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(() => {
          setExpanded(false);
        });
      }, 125);
    });
  };

  return (
    <View
      style={{
        position: 'relative',
        maxWidth,
        width: maxWidth,
        left: Platform.select({
          ios: tabHeaderShown ? -18 : 0,
          default: tabHeaderShown ? 4 : 0,
        }),
      }}
      flexRow
      alignCenter
      justifySpaceBetween>
      {expanded ? (
        <Animated.View
          style={[
            styles.searchContainer,
            {
              transform: [{scaleX: animatedSearch}, {scaleY: animatedSearch}],
              opacity: animatedSearch,
              width: animatedSearchWidth,
              borderWidth: animatedSearch,
              borderColor: animatedSearch ? Colors.primary : Colors.transparent,
            },
          ]}>
          <>
            <TextInput
              ref={ref => (inputRef.current = ref)}
              style={styles.searchInput}
              onChangeText={v => setSearch(v)}
              onEndEditing={collapseSearch}
            />
            <View style={styles.searchIcon} center>
              <IconMagnifyingGlass />
            </View>
          </>
        </Animated.View>
      ) : (
        <>
          {Platform.OS === 'ios' && <View style={styles.button} />}
          <HeaderTitle
            style={{
              color: Colors.neutral5,
              fontSize: 14,
              lineHeight: 20,
              textAlign: 'center',
              marginRight: headerRightShown
                ? Platform.select({ios: 32, default: 48})
                : 0,
              ...titleStyle,
            }}>
            {title}
          </HeaderTitle>
          <TouchableOpacity style={styles.button} onPress={expandSearch}>
            <IconMagnifyingGlass />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default SearchTitle;
