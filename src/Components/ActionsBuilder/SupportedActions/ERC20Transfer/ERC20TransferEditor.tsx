import { ActionEditorProps } from '..';
import { BigNumber } from 'ethers';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { useERC20Info } from 'hooks/Guilds/ether-swr/erc20/useERC20Info';
import { useTokenList } from 'hooks/Guilds/tokens/useTokenList';
import Avatar from 'old-components/Guilds/Avatar';
import { TokenPicker } from 'Components/TokenPicker';
import Input from 'old-components/Guilds/common/Form/Input';
import TokenAmountInput from 'old-components/Guilds/common/Form/TokenAmountInput';
import { Box } from 'Components/Primitives/Layout';
import { useEffect, useMemo, useState } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';
import styled from 'styled-components';
import { MAINNET_ID } from 'utils';
import { resolveUri } from 'utils/url';
import {
  Control,
  ControlLabel,
  ControlRow,
} from 'Components/Primitives/Forms/Control';
import { useTranslation } from 'react-i18next';
import { useNetwork } from 'wagmi';
import validateERC20Transfer from './validateERC20Transfer';

const Error = styled(Box)`
  color: ${({ theme }) => theme.colors.red};
`;

const Spacer = styled(Box)`
  margin-right: 1rem;
`;

const ClickableIcon = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

interface TransferState {
  source: string;
  tokenAddress: string;
  amount: BigNumber;
  recipientAddress: string;
}

const ERC20TransferEditor: React.FC<ActionEditorProps> = ({
  decodedCall,
  updateCall,
  toggleDisableSaveBtn,
}) => {
  const { t } = useTranslation();
  const [isTokenPickerOpen, setIsTokenPickerOpen] = useState(false);

  const { chain } = useNetwork();

  const [touched, setTouched] = useState({
    tokenAddress: false,
    amount: false,
    recipientAddress: false,
  });

  // parse transfer state from calls
  const parsedData = useMemo<TransferState>(() => {
    if (!decodedCall) return null;
    return {
      source: decodedCall.from,
      tokenAddress: decodedCall.to,
      amount: decodedCall.args._value,
      recipientAddress: decodedCall.args._to,
    };
  }, [decodedCall]);

  const validations = validateERC20Transfer({ ...parsedData });

  useEffect(() => {
    if (validations.isValid) return toggleDisableSaveBtn(false);
    return toggleDisableSaveBtn(true);
  }, [validations]); // eslint-disable-line react-hooks/exhaustive-deps

  // Get token details from the token address
  const { tokens } = useTokenList(chain?.id);
  const token = useMemo(() => {
    if (!parsedData?.tokenAddress || !tokens) return null;

    return tokens.find(({ address }) => address === parsedData.tokenAddress);
  }, [tokens, parsedData]);

  const { data: tokenInfo } = useERC20Info(parsedData?.tokenAddress);
  const { imageUrl: destinationAvatarUrl } = useENSAvatar(
    parsedData?.recipientAddress,
    MAINNET_ID
  );

  const setTransferAddress = (recipientAddress: string) => {
    if (!touched.recipientAddress)
      setTouched(t => ({ ...t, recipientAddress: true }));
    updateCall({
      ...decodedCall,
      args: {
        ...decodedCall.args,
        _to: recipientAddress,
      },
    });
  };

  const setToken = (tokenAddress: string) => {
    if (!touched.tokenAddress) setTouched(t => ({ ...t, tokenAddress: true }));
    updateCall({
      ...decodedCall,
      to: tokenAddress,
    });
  };

  const setAmount = (value: BigNumber) => {
    if (!touched.amount) setTouched(t => ({ ...t, amount: true }));
    updateCall({
      ...decodedCall,
      args: {
        ...decodedCall.args,
        _value: value,
      },
    });
  };

  return (
    <div>
      <Control>
        <ControlLabel>{t('recipient')}</ControlLabel>
        <ControlRow>
          <Input
            value={parsedData.recipientAddress || ''}
            icon={
              <div>
                {validations.recipientAddress.isValid && (
                  <Avatar
                    src={destinationAvatarUrl}
                    defaultSeed={parsedData.recipientAddress}
                    size={24}
                  />
                )}
              </div>
            }
            iconRight={
              parsedData?.recipientAddress ? (
                <ClickableIcon onClick={() => setTransferAddress('')}>
                  <FiX size={18} />
                </ClickableIcon>
              ) : null
            }
            placeholder={t('ethereumAddress')}
            onChange={e => setTransferAddress(e.target.value)}
          />
        </ControlRow>
        {touched.recipientAddress &&
          !validations?.recipientAddress?.isValid && (
            <Error>{validations?.recipientAddress?.msg}</Error>
          )}
      </Control>

      <ControlRow>
        <Control>
          <ControlLabel>{t('amount')}</ControlLabel>
          <ControlRow>
            <TokenAmountInput
              decimals={tokenInfo?.decimals}
              value={parsedData?.amount}
              onChange={setAmount}
            />
          </ControlRow>
          {touched.amount && !validations?.amount?.isValid && (
            <Error>{validations?.amount?.msg}</Error>
          )}
        </Control>

        <Spacer />

        <Control>
          <ControlLabel>{t('asset')}</ControlLabel>
          <ControlRow onClick={() => setIsTokenPickerOpen(true)}>
            <Input
              value={tokenInfo?.symbol || ''}
              placeholder={t('token')}
              icon={
                <div>
                  {parsedData?.tokenAddress && (
                    <Avatar
                      src={resolveUri(token?.logoURI)}
                      defaultSeed={parsedData?.tokenAddress}
                      size={18}
                    />
                  )}
                </div>
              }
              iconRight={<FiChevronDown size={24} />}
              readOnly
            />
          </ControlRow>
          {touched.tokenAddress && !validations?.tokenAddress?.isValid && (
            <Error>{validations?.tokenAddress?.msg}</Error>
          )}
        </Control>
      </ControlRow>

      <TokenPicker
        walletAddress={parsedData?.source || ''}
        isOpen={isTokenPickerOpen}
        onClose={() => setIsTokenPickerOpen(false)}
        onSelect={tokenAddress => {
          setToken(tokenAddress);
          setIsTokenPickerOpen(false);
        }}
      />
    </div>
  );
};

export default ERC20TransferEditor;
