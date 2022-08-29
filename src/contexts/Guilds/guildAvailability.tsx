import { MultichainContext } from 'contexts/MultichainProvider';
import { ButtonIcon, IconButton } from 'components/primitives/Button';
import { Box } from 'components/primitives/Layout/Box';
import { Result, ResultState } from 'components/Result';
import { UnstyledLink } from 'components/primitives/Links';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import styled from 'styled-components';
import { getNetworkById, getChainIcon } from 'utils';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useNetwork } from 'wagmi';
import useSwitchNetwork from 'hooks/Guilds/web3/useSwitchNetwork';
import { useTranslation } from 'react-i18next';

interface ContractAvailability {
  [chainId: number]: boolean;
}

interface GuildAvailabilityContextInterface {
  availability?: ContractAvailability;
  isLoading?: boolean;
}

const GreyText = styled(Box)`
  margin-top: 2rem;
  margin-bottom: 0.3rem;
  color: ${({ theme }) => theme.colors.proposalText.lightGrey};
`;

const NetworkIconButton = styled(IconButton)`
  margin-bottom: 0.5rem;
`;

export const GuildAvailabilityContext =
  createContext<GuildAvailabilityContextInterface>({});

// TODO: Refactor this to not use the MultichainContext.
// We should remove the MultichainContext as we no longer need it.
const GuildAvailabilityProvider = ({ children }) => {
  const { guildId, chainName } = useTypedParams();
  const { providers: multichainProviders } = useContext(MultichainContext);
  const [availability, setAvailability] = useState<ContractAvailability>({});
  const { chain: currentChain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { t } = useTranslation();

  const currentChainId = useMemo(() => currentChain?.id, [currentChain]);

  useEffect(() => {
    if (!guildId || !multichainProviders) {
      setAvailability({});
      return;
    }

    async function getAvailability() {
      let providers = Object.entries(multichainProviders);

      providers.forEach(async ([chainId, provider]) => {
        provider
          .getCode(guildId)
          .then(code => code !== '0x')
          .then(result => {
            setAvailability(prev => ({
              ...prev,
              [chainId]: result,
            }));
          })
          .catch(() => {
            setAvailability(prev => ({
              ...prev,
              [chainId]: false,
            }));
          });
      });
    }

    getAvailability();
  }, [guildId, multichainProviders]);

  const isLoading = useMemo(
    () => !Object.keys(availability).includes(String(currentChainId)),
    [availability, currentChainId]
  );

  if (!isLoading && !availability?.[currentChainId]) {
    return (
      <Result
        state={ResultState.ERROR}
        title={t('guildNotAvailable')}
        subtitle={
          Object.values(availability).includes(true)
            ? t('guildNotAvailableOnThisNetwork')
            : t('noGuildInThisAddress')
        }
        extra={
          Object.values(availability).includes(true) ? (
            <>
              <GreyText>Access it on</GreyText>
              <div>
                {Object.keys(availability).map(chainId => {
                  if (!availability[chainId]) return null;
                  const chainConfig = getNetworkById(Number(chainId));
                  return (
                    <div key={chainConfig?.id}>
                      <NetworkIconButton
                        iconLeft
                        onClick={() =>
                          switchNetwork ? switchNetwork(chainConfig?.id) : null
                        }
                      >
                        <ButtonIcon
                          src={getChainIcon(chainConfig?.id)}
                          alt={chainConfig?.name}
                        />{' '}
                        {chainConfig?.displayName}
                      </NetworkIconButton>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <UnstyledLink to={`/${chainName}`}>
              <IconButton iconLeft>
                <FiArrowLeft /> {t('takeMeHome')}
              </IconButton>
            </UnstyledLink>
          )
        }
      />
    );
  }

  return (
    <GuildAvailabilityContext.Provider
      value={{
        availability,
        isLoading,
      }}
    >
      {children}
    </GuildAvailabilityContext.Provider>
  );
};

export default GuildAvailabilityProvider;
