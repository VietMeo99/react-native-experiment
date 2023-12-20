import {Alert as RNAlert} from 'react-native';
import {t} from 'i18next';

const Alert = {
  currentConfig: {
    only: true,
  },
  opened: false,

  alert(
    title: string = '',
    message: string = '',
    buttons?: Array<{text: string; onPress: () => void}>,
  ) {
    if (
      (this.currentConfig.only && this.opened === false) ||
      !this.currentConfig.only
    ) {
      this.opened = true;
      RNAlert.alert(
        title,
        message,
        buttons || [
          {
            text: t('common:ok'),
            onPress: () => {
              this.opened = false;
            },
          },
        ],
      );
    }
  },

  config(newConfig: Partial<{only: boolean}> = {}) {
    this.currentConfig = {...this.currentConfig, ...newConfig};
    return this.alert;
  },
};

export default Alert;
