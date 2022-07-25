import {
  Control,
  ControlLabel,
  ControlRow,
} from 'components/Primitives/Forms/Control';
import Input from 'old-components/Guilds/common/Form/Input';
import { StyledTokenAmount, ToggleWrapper, ToggleLabel } from './styles';
import { ParsedDataInterface, ValidationsInterface } from './types';
import styled from 'styled-components';
import Toggle from 'old-components/Guilds/common/Form/Toggle';
import { BigNumber } from 'ethers';
import AddressInput from 'old-components/Guilds/common/Form/AddressInput';
import { useTranslation } from 'react-i18next';

const FunctionSignatureWrapper = styled.div`
  color: ${({ theme }) => theme.colors.proposalText.grey};
  margin-left: 1.5rem;
  margin-top: 0.5rem;
`;

interface FunctionCallProps {
  validations: ValidationsInterface;
  parsedData: ParsedDataInterface;
  handleCustomFunctionSignature: (value: string) => void;
  customToAddress: string;
  handleCustomAddress: (value: string) => void;
  customFunctionName: string;
  tokenInfo: any;
  customAmountValue: BigNumber;
  handleTokenAmountInputChange: (e: BigNumber) => void;
  maxValueToggled: boolean;
  handleToggleMaxValueChange: () => void;
  anyAddressToggled: boolean;
  handleToggleAnyAddressChange: () => void;
}

const FunctionCall: React.FC<FunctionCallProps> = ({
  validations,
  parsedData,
  handleCustomFunctionSignature,
  customToAddress,
  handleCustomAddress,
  customFunctionName,
  tokenInfo,
  customAmountValue,
  handleTokenAmountInputChange,
  maxValueToggled,
  handleToggleMaxValueChange,
  anyAddressToggled,
  handleToggleAnyAddressChange,
}) => {
  const { t } = useTranslation();

  // ? maybe change the input validation so it doesn't validates until blur?

  return (
    <div>
      <Control>
        <ControlLabel>{t('toAddress')}</ControlLabel>
        <ControlRow>
          <AddressInput
            value={customToAddress}
            onChange={handleCustomAddress}
            isInvalid={!validations.to}
            name="to-address"
            aria-label="to address input"
            disabled={anyAddressToggled}
            placeholder={t('ethereumAddress')}
          />
          <ToggleWrapper>
            <Toggle
              name="toggle-any-address"
              aria-label="toggle any address"
              value={anyAddressToggled}
              onChange={handleToggleAnyAddressChange}
            />
            <ToggleLabel selected={anyAddressToggled}>
              {t('anyAddress')}
            </ToggleLabel>
          </ToggleWrapper>
        </ControlRow>
      </Control>
      <Control>
        <ControlLabel>{t('functionName')}</ControlLabel>
        <ControlRow>
          <Input
            isInvalid={!validations.functionName}
            name="function-signature"
            aria-label="function signature input"
            value={customFunctionName || ''}
            placeholder={t('functionName')}
            onChange={e => handleCustomFunctionSignature(e.target.value)}
          />
        </ControlRow>
        <ControlRow>
          {customFunctionName.substring(0, 2) !== '0x' && (
            <FunctionSignatureWrapper>
              {t('functionSignature')}: {parsedData?.functionSignature}
            </FunctionSignatureWrapper>
          )}
        </ControlRow>
      </Control>
      <Control>
        <ControlLabel>{t('amount')}</ControlLabel>
        <ControlRow>
          <StyledTokenAmount
            name="amount"
            aria-label="amount input"
            decimals={tokenInfo?.decimals}
            value={customAmountValue}
            onChange={handleTokenAmountInputChange}
            disabled={maxValueToggled}
          />
          <ToggleWrapper>
            <Toggle
              name="toggle-max-value"
              aria-label="toggle max value"
              value={maxValueToggled}
              onChange={handleToggleMaxValueChange}
            />
            <ToggleLabel selected={maxValueToggled}>
              {t('maxValue')}
            </ToggleLabel>
          </ToggleWrapper>
        </ControlRow>
      </Control>
    </div>
  );
};

export default FunctionCall;
