import i18next from 'i18next';
import isIPFS from 'is-ipfs';

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

  if (!isIPFS.cid(hash)) {
    validationError = i18next.t('ens.validation.ipfsHashNotValid');
    isValid = false;
  }

  return { isValid, validationError };
};
