import { WalletModal } from 'Components';
import { useWeb3React } from '@web3-react/core';
import { Button } from 'old-components/Guilds/common/Button';
import { useState } from 'react';
import StakeTokensModalWrapper from 'Modules/Guilds/Wrappers/StakeTokensModalWrapper';

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

      <StakeTokensModalWrapper
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
