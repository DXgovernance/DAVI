import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';

export const useLockTokens = (
  guildAddress: string,
  stakeAmount: BigNumber,
  decimals: number = 18,
  symbol: string = ''
) => {
  const { t } = useTranslation();

  const methodNotSupported = async () =>
    Promise.reject(t('hookStoreErrors.methodNotSupported'));

  return methodNotSupported;
};
