import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {Colors} from 'themes/colors';
import {Button, View} from 'components/ui';
import {Title2} from 'components/ui/text/Typography';
import IconChevronRight from 'assets/images/common/ic_chevron_right.svg';
import IconMagnifyingGlassCircle from 'assets/images/search/ic_magnifying_glass_circle.svg';
import IconBookOpen from 'assets/images/search/ic_book_open.svg';
import IconBookmarkSlash from 'assets/images/search/ic_bookmark_slash.svg';
import {AppRouter} from 'constants/router';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {flex: 1, marginHorizontal: 12, color: Colors.neutral5},
});

const Search = () => {
  const navigation = useNavigation();
  const {t} = useTranslation('search');

  return (
    <View style={styles.container} flex={1} px={6} pt={6}>
      <Button
        style={styles.button}
        variant="secondary"
        onPress={() => navigation.navigate(AppRouter.SEARCH_VIOLATION_INFO)}>
        <IconMagnifyingGlassCircle />
        <Title2 style={styles.title}>{t('searchViolationInfo')}</Title2>
        <IconChevronRight />
      </Button>
      <Button
        style={styles.button}
        variant="secondary"
        onPress={() => navigation.navigate(AppRouter.DOCUMENT_LIST)}>
        <IconBookOpen />
        <Title2 style={styles.title}>{t('documentList')}</Title2>
        <IconChevronRight />
      </Button>
      <Button
        style={styles.button}
        variant="secondary"
        onPress={() =>
          navigation.navigate(AppRouter.CRIMINAL_HANDLING_VIOLATION_LIST)
        }>
        <IconBookmarkSlash />
        <Title2 style={styles.title}>
          {t('criminalHandlingViolationList')}
        </Title2>
        <IconChevronRight />
      </Button>
    </View>
  );
};

export default Search;
