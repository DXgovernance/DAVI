import { Circle, Flex } from 'Components/Primitives/Layout';
import { ContainerText } from 'Components/Primitives/Layout/Text';
import { Modal } from 'Components';
import PendingCircle from 'Components/Primitives/PendingCircle';
import { useMemo } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { TransactionModalView, TransactionModalProps } from './types';
import { Container, Header } from './TransactionModal.styled';
import { getBlockExplorerUrl } from 'provider';
import { useNetwork } from 'wagmi';

const TransactionModal: React.FC<TransactionModalProps> = ({
  message,
  transactionHash,
  txCancelled,
  onCancel,
}) => {
  const { t } = useTranslation();
  const { chain } = useNetwork();
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
                {t('waitingForConfirmation')}
              </ContainerText>
              <ContainerText variant="medium">{message}</ContainerText>
            </Container>
            <ContainerText variant="medium" color="grey">
              {t('confirmThisTransactionInYourWallet')}
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

        children = (
          <Flex>
            <ContainerText variant="bold">
              {t('transactionSubmitted')}
            </ContainerText>
            <Container>
              <ContainerText
                as="a"
                variant="regular"
                color="grey"
                href={getBlockExplorerUrl(chain, transactionHash, 'tx')}
                target="_blank"
              >
                {t('viewOnBlockExplorer')}
              </ContainerText>
            </Container>
          </Flex>
        );
        footerText = t('close');
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
            <ContainerText variant="bold">
              {t('transactionRejected')}
            </ContainerText>
          </Flex>
        );
        footerText = t('dismiss');
        break;
    }

    return [header, children, footerText];
  }, [modalView, chain, message, transactionHash, t]);

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
