import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {View, Button} from 'components/ui';
import FormikInput from 'components/ui/input/FormikInput';
import {Caption1} from 'components/ui/text/Typography';
import BoxShadow from 'components/ui/view/BoxShadow';
import {Colors} from 'themes/colors';
import {AppRouter} from 'constants/router';
import IconArrowPath from 'assets/images/common/ic_arrow_path.svg';
import useCachedParams from 'hooks/useCachedParams';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral1,
  },
  wrapper: {flex: 1},
  full: {width: '100%'},
});

interface Filters {
  code: string;
  content: string;
}

const CriminalHandlingViolationFilter = () => {
  const {cachedParams} = useCachedParams();
  const navigation = useNavigation();
  const {t} = useTranslation('search');

  const onSubmit = (values: Filters) => {
    Keyboard.dismiss();
    navigation.navigate(AppRouter.CRIMINAL_HANDLING_VIOLATION_LIST, values);
  };

  return (
    <View style={styles.container} flex={1}>
      <Formik
        initialValues={{
          code:
            cachedParams[AppRouter.CRIMINAL_HANDLING_VIOLATION_LIST]?.code ||
            '',
          content:
            cachedParams[AppRouter.CRIMINAL_HANDLING_VIOLATION_LIST]?.content ||
            '',
        }}
        enableReinitialize={true}
        onSubmit={onSubmit}>
        {({handleSubmit, handleReset, setValues}) => (
          <>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
              <KeyboardAvoidingView behavior={'padding'} style={styles.wrapper}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View flex={1} pt={6} px={6}>
                    <View mb={6} style={styles.full}>
                      <Caption1 style={[styles.full, {marginBottom: 4}]}>
                        {t('idViolationXLHSFull')}
                      </Caption1>
                      <FormikInput
                        name={'code'}
                        style={styles.full}
                        maxLength={200}
                      />
                    </View>
                    <View mb={6} style={styles.full}>
                      <Caption1 style={[styles.full, {marginBottom: 4}]}>
                        {t('violationContent')}
                      </Caption1>
                      <FormikInput
                        name={'content'}
                        style={styles.full}
                        maxLength={200}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </ScrollView>
            <BoxShadow style={styles.full} flexRow center px={6} pt={4} pb={8}>
              <Button
                style={[styles.wrapper, {marginRight: 8}]}
                variant="secondary"
                onPress={() => {
                  handleReset();
                  setValues({code: '', content: ''});
                }}>
                <IconArrowPath />
                <Caption1 style={{flex: 1}} center>
                  {t('reset')}
                </Caption1>
              </Button>
              <Button
                style={[styles.wrapper, {marginLeft: 8}]}
                onPress={handleSubmit}>
                {t('search')}
              </Button>
            </BoxShadow>
          </>
        )}
      </Formik>
    </View>
  );
};

export default CriminalHandlingViolationFilter;
