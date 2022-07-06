import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'old-components/Guilds/common/Button';
import { WalletModal } from 'Components';
import { useTransactions } from 'contexts/Guilds';
import {
  useAccount,
  //   useConnect,
  //   useDisconnect,
  //   useEnsAvatar,
  //   useEnsName,
  //   useNetwork,
} from 'wagmi';
import AddressButton from 'Components/AddressButton/AddressButton';

const WalletButton = () => {
  const { t } = useTranslation();

  const { isConnected, address } = useAccount();
  // const { chain, chains } = useNetwork();
  // const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
  // const { data: ensName } = useEnsName({ address });
  // const { connect, connectors, error, isLoading, pendingConnector } =
  //   useConnect();
  // const { disconnect } = useDisconnect();

  // const { account, chainId } = useWeb3React();
  const { transactions } = useTransactions();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // const [injectedWalletAuthorized, setInjectedWalletAuthorized] =
  //   useState(false);
  // const rpcUrls = useRpcUrls();

  // useEffect(() => {
  //   injected.isAuthorized().then(isAuthorized => {
  //     setInjectedWalletAuthorized(isAuthorized);
  //   });
  // }, []);

  const toggleWalletModal = () => {
    setIsWalletModalOpen(!isWalletModalOpen);
  };

  // const switchNetwork = async chain => {
  //   const chainIdHex = `0x${chain.id.toString(16)}`;
  //   try {
  //     await window.ethereum?.send('wallet_switchEthereumChain', [
  //       { chainId: chainIdHex },
  //     ]);
  //   } catch (e: any) {
  //     if (e?.code === 4902) {
  //       window.ethereum?.send('wallet_addEthereumChain', [
  //         {
  //           chainId: chainIdHex,
  //           chainName: chain.displayName,
  //           nativeCurrency: chain.nativeAsset,
  //           rpcUrls: [chain.rpcUrl, chain.defaultRpc],
  //           blockExplorerUrls: [chain.blockExplorer],
  //         },
  //       ]);
  //     }
  //   }
  // };

  function getWalletStatus() {
    // if (injectedWalletAuthorized && !account) {
    //   // const chains = getChains(rpcUrls);
    //   // const activeChain =
    //   //   chains.find(chain => chain.id === chainId) || chains[0];

    //   return (
    //     <Button
    //       variant="secondary"
    //       onClick={() => {
    //         // switchNetwork(activeChain)
    //       }}
    //     >
    //       {t('switchWalletTo', { chainName: chain.name })}
    //     </Button>
    //   );

    if (isConnected) {
      return (
        <AddressButton
          address={address}
          transactionsCounter={
            transactions?.filter(transaction => !transaction.receipt)?.length ??
            0
          }
          onClick={toggleWalletModal}
        />
      );
    } else {
      return (
        <Button data-testid="connectWalletBtn" onClick={toggleWalletModal}>
          {t('connectWallet')}
        </Button>
      );
    }
  }

  return (
    <>
      {getWalletStatus()}
      <WalletModal isOpen={isWalletModalOpen} onClose={toggleWalletModal} />
    </>
  );
};

export default WalletButton;
