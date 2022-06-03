import StakeTokensModal from 'old-components/Guilds/StakeTokensModal';
import WalletModal from 'old-components/Guilds/Web3Modals/WalletModal';
import { useWeb3React } from '@web3-react/core';
import { Button } from 'old-components/Guilds/common/Button';
import { useState } from 'react';

export const GuestActions = () => {
  const { account } = useWeb3React();
  const [showJoin, setShowJoin] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  return (
    <>
      {account ? (
        <Button
          data-testid="open-stake-tokens-modal-btn"
          variant="secondary"
          onClick={() => setShowJoin(true)}
        >
          Join
        </Button>
      ) : (
        <Button variant="secondary" onClick={() => setIsWalletModalOpen(true)}>
          Connect Wallet
        </Button>
      )}

      <StakeTokensModal
        isOpen={showJoin}
        onDismiss={() => setShowJoin(false)}
      />
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </>
  );
};
