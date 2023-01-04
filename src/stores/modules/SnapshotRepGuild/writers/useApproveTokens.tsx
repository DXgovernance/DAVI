import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { WriterHooksInteface } from 'stores/types';

type UseApproveTokensInterface = WriterHooksInteface['useApproveTokens'];

export const useApproveTokens: UseApproveTokensInterface = (
  tokenAddress: string
) => {
  const { t } = useTranslation();

  const methodNotSupported = useCallback(
    async (daoTokenVault: string, amount?: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        reject(t('hookStoreErrors.methodNotSupported'));
      });
    },
    [t]
  );

  return methodNotSupported;
};
