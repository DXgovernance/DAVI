import { useTranslation } from 'react-i18next';

export const useApproveTokens = (
  tokenAddress: string,
  daoTokenVault: string,
  amount?: string
) => {
  const { t } = useTranslation();

  const methodNotSupported = async () =>
    Promise.reject(t('hookStoreErrors.methodNotSupported'));

  return methodNotSupported;
};
