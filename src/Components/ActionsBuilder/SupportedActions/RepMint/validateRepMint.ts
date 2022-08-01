import { TFunction } from 'react-i18next';

interface validateRepMintValues {
  repPercent: string;
}

interface Context {
  t: TFunction;
}

const validateRepMint = (values: validateRepMintValues, { t }: Context) => {
  const repPercent = Number(values.repPercent || 0);
  let errors = {
    repPercent: null,
  };

  if (repPercent > 100) {
    errors.repPercent = t('reputationPercentageTooHigh');
  }

  if (repPercent === 0) {
    errors.repPercent = t('reputationPercentIsRequired');
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
