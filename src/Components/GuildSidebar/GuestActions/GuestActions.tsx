import { Button } from 'old-components/Guilds/common/Button';

export interface GuestActionsProps {
  userWalletAddress?: string;
  onShowStakeModal?: () => void;
  onShowWalletModal?: () => void;
}

export const GuestActions: React.FC<GuestActionsProps> = ({
  userWalletAddress,
  onShowStakeModal,
  onShowWalletModal,
}) => {
  return (
    <>
      {userWalletAddress ? (
        <Button
          data-testid="open-stake-tokens-modal-btn"
          variant="secondary"
          onClick={onShowStakeModal}
        >
          Join
        </Button>
      ) : (
        <Button variant="secondary" onClick={onShowWalletModal}>
          Connect Wallet
        </Button>
      )}
    </>
  );
};
