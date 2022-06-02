import { getChains } from 'provider/connectors';
import { getBlockchainLink } from 'utils';
import { Circle, Flex } from 'Components/Primitives/Layout';
import { ContainerText } from 'Components/Primitives/Layout/Text';
import { Modal } from 'old-components/Guilds/common/Modal';
import { useWeb3React } from '@web3-react/core';
import PendingCircle from 'old-components/common/PendingCircle';
import { useMemo } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { FiX } from 'react-icons/fi';

import { TransactionModalView, TransactionModalProps } from './types';
import {
  //  ModalButton,
  Container,
  Header,
} from './TransactionModal.styled';

const TransactionModal: React.FC<TransactionModalProps> = ({
  message,
  transactionHash,
  txCancelled,
  onCancel,
}) => {
  const { chainId } = useWeb3React();
  const modalView = useMemo<TransactionModalView>(() => {
    if (txCancelled) {
      return TransactionModalView.Reject;
    } else if (transactionHash) {
      return TransactionModalView.Submit;
    } else {
      return TransactionModalView.Confirm;
    }
  }, [txCancelled, transactionHash]);

  const [header, children, footerText] = useMemo(() => {
    let header: JSX.Element, children: JSX.Element, footerText: string;

    switch (modalView) {
      case TransactionModalView.Confirm:
        header = (
          <Header>
            <PendingCircle height="86px" width="86px" color="black" />
          </Header>
        );
        children = (
          <Flex>
            <Container>
              <ContainerText variant="bold">
                Waiting For Confirmation
              </ContainerText>
              <ContainerText variant="medium">{message}</ContainerText>
            </Container>
            <ContainerText variant="medium" color="grey">
              Confirm this Transaction in your Wallet
            </ContainerText>
          </Flex>
        );
        break;
      case TransactionModalView.Submit:
        header = (
          <Header>
            <Circle>
              <AiOutlineArrowUp size={40} />
            </Circle>
          </Header>
        );

        const networkName = getChains().find(
          chain => chain.id === chainId
        ).name;
        children = (
          <Flex>
            <ContainerText variant="bold">Transaction Submitted</ContainerText>
            <Container>
              <ContainerText
                as="a"
                variant="regular"
                color="grey"
                href={getBlockchainLink(transactionHash, networkName)}
                target="_blank"
              >
                View on Block Explorer
              </ContainerText>
            </Container>
          </Flex>
        );
        footerText = 'Close';
        break;
      case TransactionModalView.Reject:
        header = (
          <Header>
            <Circle>
              <FiX size={40} />
            </Circle>
          </Header>
        );
        children = (
          <Flex>
            <ContainerText variant="bold">Transaction Rejected</ContainerText>
          </Flex>
        );
        footerText = 'Dismiss';
        break;
    }

    return [header, children, footerText];
  }, [modalView, chainId, message, transactionHash]);

  return (
    <Modal
      isOpen={!!message}
      onDismiss={onCancel}
      children={children}
      contentHeader={header}
      cross
      hideHeader
      showSecondaryHeader
      onCancel={onCancel}
      maxWidth={300}
      cancelText={footerText}
      zIndex={1000}
    />
  );
};

export default TransactionModal;
