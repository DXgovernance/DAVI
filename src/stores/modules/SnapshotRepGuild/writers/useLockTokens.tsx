import { BigNumber } from 'ethers';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { WriterHooksInteface } from 'stores/types';

type UseLockTokensInterface = WriterHooksInteface['useLockTokens'];

export const useLockTokens: UseLockTokensInterface = (guildAddress: string) => {
  const { t } = useTranslation();

  const methodNotSupported = useCallback(
    async (
      stakeAmount: BigNumber,
      decimals: number = 18,
      symbol: string = ''
    ): Promise<void> => {
      return new Promise((resolve, reject) => {
        reject(t('hookStoreErrors.methodNotSupported'));
      });
    },
    [t]
  );

  return methodNotSupported;
};
