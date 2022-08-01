import { useTranslation } from 'react-i18next';
import { ReactComponent as Mint } from 'assets/images/mint.svg';
import { ReactComponent as Vector } from 'assets/images/vector.svg';
import ENSIcon from 'assets/images/ens.svg';
import { SupportedAction } from 'Components/ActionsBuilder/types';
import StyledIcon from 'old-components/Guilds/common/SVG';
import {
  ActionsButton,
  ButtonDetail,
  ButtonLabel,
  SectionTitle,
  SectionWrapper,
  Wrapper,
} from '../../ActionsModal.styled';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import useGuildImplementationTypeConfig from 'hooks/Guilds/guild/useGuildImplementationType';
import React from 'react';
import {
  RichContractData,
  useRichContractRegistry,
} from 'hooks/Guilds/contracts/useRichContractRegistry';
import { useNetwork } from 'wagmi';
import { isAvailableOnENS } from 'Components/ActionsBuilder/SupportedActions/UpdateENSContent/utils';

interface ContractsListProps {
  onSelect: (contract: RichContractData) => void;
  onSupportedActionSelect: (actionType: SupportedAction) => void;
}

const ContractsList: React.FC<ContractsListProps> = ({
  onSelect,
  onSupportedActionSelect,
}) => {
  const { t } = useTranslation();
  const { chain } = useNetwork();
  const { contracts } = useRichContractRegistry(chain?.id);
  const { guildId: guildAddress } = useTypedParams();
  const { isRepGuild } = useGuildImplementationTypeConfig(guildAddress);
  return (
    <Wrapper data-testid="actions-modal-contract-list">
      <SectionWrapper>
        <SectionTitle>{t('core')}</SectionTitle>
        <ActionsButton
          data-testid="supported-action-erc20transfer"
          onClick={() =>
            onSupportedActionSelect(SupportedAction.ERC20_TRANSFER)
          }
        >
          <ButtonLabel>
            <StyledIcon src={Vector} />
            {t('transferAndMint')}
          </ButtonLabel>
        </ActionsButton>
        <ActionsButton
          onClick={() => {
            onSupportedActionSelect(SupportedAction.SET_PERMISSIONS);
          }}
        >
          <ButtonLabel>
            <StyledIcon src={Vector} />
            Set Permissions
          </ButtonLabel>
        </ActionsButton>
        {!isRepGuild ? (
          <ActionsButton
            onClick={() => onSupportedActionSelect(SupportedAction.REP_MINT)}
          >
            <ButtonLabel>
              <StyledIcon src={Mint} />
              {t('mintRep')}
            </ButtonLabel>
          </ActionsButton>
        ) : null}
        {isAvailableOnENS(chain.id) ? (
          <ActionsButton
            onClick={() =>
              onSupportedActionSelect(SupportedAction.ENS_UPDATE_CONTENT)
            }
          >
            <ButtonLabel>
              <StyledIcon src={ENSIcon} />
              {t('ens.updateContentCoreAction')}
            </ButtonLabel>
          </ActionsButton>
        ) : null}
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitle>{t('externalContracts')}</SectionTitle>
        {contracts?.map(contract => (
          <ActionsButton
            key={contract.title}
            onClick={() => onSelect(contract)}
          >
            <ButtonLabel>{contract.title}</ButtonLabel>
            <ButtonDetail>
              {contract.functions?.length}{' '}
              {t('actions', {
                count: contract.functions.length,
              })}
            </ButtonDetail>
          </ActionsButton>
        ))}
      </SectionWrapper>
    </Wrapper>
  );
};

export default ContractsList;
