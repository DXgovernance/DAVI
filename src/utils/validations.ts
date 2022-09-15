import { BigNumber } from 'ethers';
import i18next from 'i18next';
import isIPFS from 'is-ipfs';

export const isValidProposal = ({
  toArray,
  dataArray,
  valueArray,
  totalActions,
  title,
}: {
  toArray: string[];
  dataArray: string[];
  valueArray: BigNumber[];
  totalActions: number;
  title: string;
}): { isValid: boolean; error?: string } => {
  if (!title) {
    return {
      isValid: false,
      error: 'Title is required',
    };
  }
  if (totalActions === 0) {
    return {
      isValid: false,
      error: 'At least one Option is required',
    };
  }
  if (
    toArray.length === 0 ||
    dataArray.length === 0 ||
    valueArray.length === 0
  ) {
    return {
      isValid: false,
      error: 'At least one action per option is required',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

export const isEnsName = (
  name: string
): { isValid: boolean; validationError: string } => {
  let isValid = true;
  let validationError = null;

  if (!name) {
    validationError = i18next.t('ens.validation.nameCannotBeEmpty');
    isValid = false;
    return { isValid, validationError };
  }

  let labelArray = name.split('.');

  let numberOfInvalidLabels = labelArray.filter(
    element => element.length === 0
  );
  if (numberOfInvalidLabels.length > 0) {
    validationError = i18next.t('ens.validation.domainNameInvalidLength');
    isValid = false;
  }

  if (name.includes(' ')) {
    validationError = i18next.t('ens.validation.domainNameCannotIncludeSpaces');
    isValid = false;
  }

  if (labelArray.length > 3) {
    validationError = i18next.t(
      'ens.validation.domainCannotBeMoreThanThreeLevels'
    );
    isValid = false;
  }

  return { isValid, validationError };
};

export const isIpfsHash = (
  hash: string
): { isValid: boolean; validationError: string } => {
  let isValid = true;
  let validationError = null;

  if (hash.substring(0, 2) !== 'Qm') {
    validationError = i18next.t('ens.validation.onlyCidV0Supported');
    isValid = false;
    return { isValid, validationError };
  }

  if (!isIPFS.cid(hash)) {
    validationError = i18next.t('ens.validation.ipfsHashNotValid');
    isValid = false;
  }

  return { isValid, validationError };
};
