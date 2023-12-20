import {t} from 'i18next';

const numberArray: Array<string> = [
  t('common:0'),
  t('common:1'),
  t('common:2'),
  t('common:3'),
  t('common:4'),
  t('common:5'),
  t('common:6'),
  t('common:7'),
  t('common:8'),
  t('common:9'),
];

function translateTen(num: number, showFull: boolean) {
  let str: string = '';
  const ten: number = Math.floor(num / 10);
  const unit: number = num % 10;
  if (ten > 1) {
    str = ' ' + numberArray[ten] + ` ${t('common:ten')}`;
    if (unit === 1) {
      str += ` ${t('common:one')}`;
    }
  } else if (ten === 1) {
    str = ` ${t('common:ten')}`;
    if (unit === 1) {
      str += ` ${t('common:1')}`;
    }
  } else if (showFull && unit > 0) {
    str = ` ${t('common:odd')}`;
  }
  if (unit === 5 && ten > 1) {
    str += ` ${t('common:five')}`;
  } else if (unit > 1 || (unit === 1 && ten === 0)) {
    str += ` ${numberArray[unit]}`;
  }
  return str;
}

function translateHundred(num: number, showFull: boolean) {
  let str: string = '';
  const hundred: number = Math.floor(num / 100);
  const newNum: number = num % 100;
  if (showFull || hundred > 0) {
    str = ` ${numberArray[hundred]} ${t('common:hundred')}`;
    str += translateTen(newNum, true);
  } else {
    str = translateTen(newNum, false);
  }
  return str;
}

function translateMillion(num: number, showFull: boolean) {
  let str: string = '';
  const million: number = Math.floor(num / 1000000);
  const newNumMillion: number = num % 1000000;
  let newShowFull: boolean = showFull;
  if (million > 0) {
    str = `${translateHundred(million, newShowFull)} ${t('common:million')}`;
    newShowFull = true;
  }
  const thousand: number = Math.floor(newNumMillion / 1000);
  const newNumThousand: number = newNumMillion % 1000;
  if (thousand > 0) {
    str += `${translateHundred(thousand, newShowFull)} ${t('common:thousand')}`;
    newShowFull = true;
  }
  if (newNumThousand > 0) {
    str += translateHundred(newNumThousand, newShowFull);
  }
  return str;
}

export function translateNumber(num: number) {
  if (num === 0) {
    return numberArray[0];
  }
  let str: string = '';
  let subStr: string = '';
  let newNum = num;
  do {
    const billion: number = newNum % 1000000000;
    newNum = Math.floor(newNum / 1000000000);
    if (newNum > 0) {
      str = translateMillion(billion, true) + subStr + str;
    } else {
      str = translateMillion(billion, false) + subStr + str;
    }
    subStr = ` ${t('common:billion')}`;
  } while (newNum > 0);
  return str.trim();
}
