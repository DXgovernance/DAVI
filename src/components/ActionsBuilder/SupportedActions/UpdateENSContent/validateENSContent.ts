import { removeNullValues } from 'utils';
import { isEnsName, isIpfsHash } from 'utils/validations';
import { ENSContentForm } from './types';

const validateENSContent = (values: ENSContentForm) => {
  const { ensName, ipfsHash } = values;

  const errors = {
    ensName: null,
    ipfsHash: null,
  };

  const ensValidation = isEnsName(ensName);
  const ipfsValidation = isIpfsHash(ipfsHash);

  errors.ensName = ensValidation.validationError;
  errors.ipfsHash = ipfsValidation.validationError;

  return {
    errors: removeNullValues(errors),
    values,
  };
};

export default validateENSContent;
