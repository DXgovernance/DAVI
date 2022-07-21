import { ActionEditorProps } from '..';
import { BigNumber, utils } from 'ethers';
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
import { MAINNET_ID, ZERO_ADDRESS } from 'utils';
import { resolveUri } from 'utils/url';
import {
  Control,
  ControlLabel,
  ControlRow,
} from 'Components/Primitives/Forms/Control';
import { useTranslation } from 'react-i18next';
import { useNetwork } from 'wagmi';

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
  destination: string;
}

const ERC20TransferEditor: React.FC<ActionEditorProps> = ({
  decodedCall,
  updateCall,
}) => {
  const { t } = useTranslation();
  const [isTokenPickerOpen, setIsTokenPickerOpen] = useState(false);
  const { chain } = useNetwork();

  // parse transfer state from calls
  const parsedData = useMemo<TransferState>(() => {
    if (!decodedCall) return null;

    const isNativeToken =
      decodedCall.value !== null && decodedCall.value._hex !== '0x00'
        ? true
        : false;

    if (isNativeToken) {
      return {
        source: decodedCall.from,
        tokenAddress: ZERO_ADDRESS,
        amount: decodedCall.value,
        destination: decodedCall.to,
      };
    } else {
      return {
        source: decodedCall.from,
        tokenAddress: decodedCall.to,
        amount: decodedCall.args._value,
        destination: decodedCall.args._to,
      };
    }
  }, [decodedCall]);

  const validations = useMemo(() => {
    return {
      tokenAddress: utils.isAddress(parsedData?.tokenAddress),
      amount: BigNumber.isBigNumber(parsedData?.amount),
      destination: utils.isAddress(parsedData?.destination),
    };
  }, [parsedData]);

  // Three states to track  changes in values
  const [receiver, setReceiver] = useState(parsedData?.destination);
  const [tokenAmount, setTokenAmount] = useState(parsedData?.amount);
  const [tokenAddress, setTokenAddress] = useState(parsedData?.tokenAddress);

  useEffect(() => {
    const isNativeToken = tokenAddress === ZERO_ADDRESS;

    if (isNativeToken) {
      updateCall({
        ...decodedCall,
        to: receiver,
        value: tokenAmount,
        args: {
          ...decodedCall.args,
          _to: '',
          _value: '',
        },
      });
    } else {
      updateCall({
        ...decodedCall,
        to: tokenAddress,
        value: BigNumber.from('0'),
        args: {
          ...decodedCall.args,
          _to: receiver,
          _value: tokenAmount,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiver, tokenAmount, tokenAddress]);

  // Get token details from the token address
  const { tokens } = useTokenList(chain?.id);
  const token = useMemo(() => {
    if (!parsedData?.tokenAddress || !tokens) return null;

    return tokens.find(({ address }) => address === parsedData.tokenAddress);
  }, [tokens, parsedData]);

  const { data: tokenInfo } = useERC20Info(parsedData?.tokenAddress);
  const { imageUrl: destinationAvatarUrl } = useENSAvatar(
    parsedData?.destination,
    MAINNET_ID
  );

  return (
    <div>
      <Control>
        <ControlLabel>{t('recipient')}</ControlLabel>
        <ControlRow>
          <Input
            value={receiver || ''}
            icon={
              <div>
                {validations.destination && (
                  <Avatar
                    src={destinationAvatarUrl}
                    defaultSeed={receiver}
                    size={24}
                  />
                )}
              </div>
            }
            iconRight={
              receiver ? (
                <ClickableIcon onClick={() => setReceiver('')}>
                  <FiX size={18} />
                </ClickableIcon>
              ) : null
            }
            placeholder={t('ethereumAddress')}
            onChange={e => setReceiver(e.target.value)}
          />
        </ControlRow>
      </Control>

      <ControlRow>
        <Control>
          <ControlLabel>{t('amount')}</ControlLabel>
          <ControlRow>
            <TokenAmountInput
              decimals={tokenInfo?.decimals}
              value={tokenAmount}
              onChange={setTokenAmount}
            />
          </ControlRow>
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
                  {tokenAddress && (
                    <Avatar
                      src={resolveUri(token?.logoURI)}
                      defaultSeed={tokenAddress}
                      size={18}
                    />
                  )}
                </div>
              }
              iconRight={<FiChevronDown size={24} />}
              readOnly
            />
          </ControlRow>
        </Control>
      </ControlRow>

      <TokenPicker
        walletAddress={parsedData?.source || ''}
        isOpen={isTokenPickerOpen}
        onClose={() => setIsTokenPickerOpen(false)}
        onSelect={tokenAddress => {
          setTokenAddress(tokenAddress);
          setIsTokenPickerOpen(false);
        }}
      />
    </div>
  );
};

export default ERC20TransferEditor;
