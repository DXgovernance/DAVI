import { BigNumber } from 'ethers';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { WriterHooksInteface } from 'stores/types';

type UseWithdrawTokensInterface = WriterHooksInteface['useWithdrawTokens'];

export const useWithdrawTokens: UseWithdrawTokensInterface = (
  daoAddress: string
) => {
  const { t } = useTranslation();

  const methodNotSupported = useCallback(
    async (
      amount: BigNumber,
      tokenDecimals?: number,
      tokenSymbol?: string
    ): Promise<void> => {
      return new Promise((resolve, reject) => {
        reject(t('hookStoreErrors.methodNotSupported'));
      });
    },
    [t]
  );

  return methodNotSupported;
};
