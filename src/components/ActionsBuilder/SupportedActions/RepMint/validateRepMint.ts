import { TFunction } from 'react-i18next';
import { utils } from 'ethers';

interface validateRepMintValues {
  repPercent: string;
  recipient: string;
}

interface Context {
  t: TFunction;
}

const validateRepMint = (values: validateRepMintValues, { t }: Context) => {
  const repPercent = Number(values.repPercent || 0);
  const { recipient } = values;
  let errors = {
    repPercent: null,
    recipient: null,
  };

  if (repPercent > 100) {
    errors.repPercent = t('reputationPercentageTooHigh');
  }

  if (repPercent === 0) {
    errors.repPercent = t('reputationPercentIsRequired');
  }

  if (!utils.isAddress(recipient)) {
    errors.recipient = t('invalidRecipientAddress');
  }
  if (!recipient) {
    errors.recipient = t('recipientAddressIsRequired');
  }

  return {
    errors: Object.entries(errors).reduce((acc, [key, value]) => {
      return {
        ...acc,
        ...(!!value && { [key]: value }), // remove keys that has no error value
      };
    }, {}),
    values,
  };
};

export default validateRepMint;
