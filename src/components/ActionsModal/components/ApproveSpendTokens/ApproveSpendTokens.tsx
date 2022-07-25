import { useState, useMemo, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';

import Input from 'old-components/Guilds/common/Form/Input';
import Avatar from 'old-components/Guilds/Avatar';
import { TokenPicker } from 'components/TokenPicker';
import TokenAmountInput from 'old-components/Guilds/common/Form/TokenAmountInput';
import { useERC20Info } from 'hooks/Guilds/ether-swr/erc20/useERC20Info';
import { useTokenList } from 'hooks/Guilds/tokens/useTokenList';
import { resolveUri } from 'utils/url';
import {
  SectionTitle,
  SectionWrapper,
  Wrapper,
  BlockButton,
} from '../../ActionsModal.styled';
import {
  ControlRow,
  Control,
  ControlLabel,
  Spacer,
} from './ApproveSpendTokens.styled';
import { useNetwork } from 'wagmi';

export interface TokenSpendApproval {
  amount: BigNumber;
  token: string;
}

interface ApproveSpendTokensProps {
  defaultValue?: TokenSpendApproval;
  onConfirm: (args: TokenSpendApproval) => void;
}

const ApproveSpendTokens: React.FC<ApproveSpendTokensProps> = ({
  defaultValue,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const { chain } = useNetwork();

  const [isTokenPickerOpen, setIsTokenPickerOpen] = useState(false);
  const [amount, setAmount] = useState<BigNumber>(null);
  const [token, setToken] = useState<string>(null);

  const { tokens } = useTokenList(chain?.id);
  const selectedToken = useMemo(() => {
    if (!token || !tokens) return null;

    return tokens.find(({ address }) => address === token);
  }, [tokens, token]);

  const { data: tokenInfo } = useERC20Info(token);

  useEffect(() => {
    if (defaultValue) {
      setAmount(defaultValue.amount);
      setToken(defaultValue.token);
    }
  }, [defaultValue]);

  const confirm = () => {
    if (!amount || !token) return; // TODO: validate
    onConfirm({
      amount,
      token,
    });
  };

  return (
    <Wrapper>
      <SectionWrapper>
        <SectionTitle>{t('selectTokensToSpend')}</SectionTitle>
        <ControlRow>
          <Control>
            <ControlLabel>{t('amount')}</ControlLabel>
            <ControlRow>
              <TokenAmountInput
                decimals={tokenInfo?.decimals}
                value={amount}
                onChange={setAmount}
              />
            </ControlRow>
          </Control>

          <Spacer />

          <Control>
            <ControlLabel>{t('asset')}</ControlLabel>
            <ControlRow onClick={() => setIsTokenPickerOpen(true)}>
              <Input
                value={tokenInfo?.symbol || ''}
                placeholder="Token"
                icon={
                  <div>
                    {token && (
                      <Avatar
                        src={resolveUri(selectedToken?.logoURI)}
                        defaultSeed={token}
                        size={18}
                      />
                    )}
                  </div>
                }
                iconRight={<FiChevronDown size={24} />}
              />
            </ControlRow>
          </Control>
        </ControlRow>

        <TokenPicker
          isOpen={isTokenPickerOpen}
          onClose={() => setIsTokenPickerOpen(false)}
          onSelect={tokenAddress => {
            setToken(tokenAddress);
            setIsTokenPickerOpen(false);
          }}
        />

        <BlockButton
          variant="primary"
          onClick={confirm}
          disabled={!amount || !token}
        >
          {t('approve')}
        </BlockButton>
      </SectionWrapper>
    </Wrapper>
  );
};

export default ApproveSpendTokens;
