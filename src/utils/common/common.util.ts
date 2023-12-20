import {AxiosError} from 'axios';
import {COMMON_MESSAGES} from 'constants/common';
import {addMinutes, endOfDay, format, startOfDay} from 'date-fns';
import {t} from 'i18next';
import {LegacyRef, MutableRefObject, RefCallback} from 'react';
import {InteractionManager} from 'react-native';

export function getMessageFromError(error: string | AxiosError) {
  if (typeof error === 'string') {
    return error;
  }
  if (error.response) {
    if (error.response?.status === 401) {
      return t('common:tokenExpired');
    }
    if (error.response?.status === 403) {
      return t('common:youDoNotHavePermission');
    }
    return (
      (error?.response?.data as any)?.message ||
      t('common:somethingWentWrong') ||
      COMMON_MESSAGES
    );
  }
  return error.message || t('common:somethingWentWrong') || COMMON_MESSAGES;
}

export function formatLocalStringDate(date?: string, options?: string) {
  if (!date) {
    return '';
  } else {
    if (!options) {
      return format(new Date(date), 'yyyy-MM-dd 23:59:59');
    }
    if (options === 'startOfDay') {
      const startDay = startOfDay(new Date(date));
      return format(startDay, 'yyyy-MM-dd HH:mm:ss');
    }
    if (options === 'endOfDay') {
      const endDay = endOfDay(new Date(date));
      return format(endDay, 'yyyy-MM-dd HH:mm:ss');
    }
    return '';
  }
}

function withPad(number: number, pad: number) {
  return number.toString().padStart(pad, '0');
}

export const formatDurationToMinutes = (duration: number /*second*/) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${withPad(minutes, 2)}:${withPad(seconds, 2)}`;
};

function createDate(weekDay) {
  const date = new Date(2020, 0, 4);
  const week = 1;
  const offset = (date.getDay() || 7) - weekDay;
  date.setDate(week * 7 - offset - 3);
  return date;
}

export function formatWeekdaySelected(weekdays: number[]) {
  if (
    weekdays.length === 7 &&
    [1, 2, 3, 4, 5, 6, 7].every(i => weekdays.includes(i))
  ) {
    return 'Daily';
  }
  if (
    weekdays.length === 5 &&
    [1, 2, 3, 4, 5].every(i => weekdays.includes(i))
  ) {
    return 'Weekdays';
  }
  const a: number[][] = [];
  for (let i = 1; i <= 7; i++) {
    if (weekdays.includes(i)) {
      if (a[a.length - 1]) {
        if (a[a.length - 1].length > 1) {
          a[a.length - 1].pop();
        }
        a[a.length - 1].push(i);
      } else {
        a[a.length] = [i];
      }
    } else {
      a.push([]);
    }
  }
  return a
    .filter(i => i.length > 0)
    .map(i => i.map(j => format(createDate(j), 'EEE')).join('-'))
    .join(', ');
}

export function fromUTC(date: number | Date) {
  return addMinutes(date, new Date().getTimezoneOffset());
}

export function mergeRefs<T = any>(
  refs: Array<MutableRefObject<T> | LegacyRef<T>>,
): RefCallback<T> {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export function safeRunAfterInteraction(callback: () => void, ms = 50) {
  return setTimeout(() => {
    InteractionManager.runAfterInteractions(callback);
  }, ms);
}
