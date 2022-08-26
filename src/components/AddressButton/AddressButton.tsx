import { isDesktop } from 'react-device-detect';
import React from 'react';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { Avatar } from 'components/Avatar';
import { shortenAddress } from 'utils';
import { Badge } from 'components/Badge';
import { Loading } from 'components/primitives/Loading';
import { AddressButtonProps } from 'components/AddressButton/types';
import {
  IconHolder,
  StyledAddressButton,
  AddressText,
} from 'components/AddressButton/AddressButton.styled';

const AddressButton: React.FC<AddressButtonProps> = ({
  address,
  transactionsCounter,
  onClick,
  showFullAddress = false,
  type = 'submit',
}) => {
  const { ensName, imageUrl } = useENSAvatar(address, 1);

  return (
    <StyledAddressButton
      variant="secondary"
      onClick={onClick}
      iconLeft
      type={type}
    >
      <IconHolder>
        <Avatar src={imageUrl} defaultSeed={address} size={24} />
      </IconHolder>
      {isDesktop && (
        <AddressText>
          {ensName || address ? (
            showFullAddress ? (
              address
            ) : (
              shortenAddress(address)
            )
          ) : (
            <Loading loading text />
          )}
        </AddressText>
      )}
      {transactionsCounter ? (
        <Badge size={25}>{transactionsCounter}</Badge>
      ) : null}
    </StyledAddressButton>
  );
};

export default AddressButton;
