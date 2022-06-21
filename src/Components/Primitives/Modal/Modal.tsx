import ReactDOM from 'react-dom';
import { isMobile } from 'react-device-detect';
import { FiArrowLeft } from 'react-icons/fi';
import { ModalProps } from 'Components/Primitives/Modal';

import {
  Wrapper,
  Backdrop,
  StyledModal,
  Header,
  SecondaryHeader,
  HeaderText,
  Content,
  Footer,
  ModalButton,
  CloseIcon,
  LeftArrowContainer,
  BackButton,
  SecondaryCloseIcon,
} from './Modal.styled';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
  header,
  contentHeader,
  confirmText = 'Confirm',
  cancelText,
  onConfirm,
  onCancel,
  hideHeader,
  children,
  maxWidth,
  showSecondaryHeader,
  cross,
  zIndex = 500,
  backnCross,
  prevContent,
  leftIcon = true,
  dataTestId,
}) => {
  const modal = (
    <div data-testid={dataTestId}>
      <Backdrop onClick={onDismiss} zIndex={zIndex} />
      <Wrapper maxWidth={maxWidth} zIndex={zIndex + 1}>
        <StyledModal>
          {isMobile && (
            <Header onClick={onDismiss}>
              {cross ? leftIcon ? <CloseIcon /> : <FiArrowLeft /> : null}
              <HeaderText>{header}</HeaderText>
            </Header>
          )}{' '}
          {!hideHeader && !isMobile && (
            <Header>
              {!backnCross && (
                <>
                  <HeaderText>{header}</HeaderText>
                  <CloseIcon onClick={onDismiss} />
                </>
              )}
              {backnCross && (
                <>
                  <LeftArrowContainer>
                    <BackButton onClick={prevContent} />
                    <HeaderText>{header}</HeaderText>
                  </LeftArrowContainer>
                  <CloseIcon onClick={onDismiss} />
                </>
              )}
            </Header>
          )}
          {showSecondaryHeader && (
            <SecondaryHeader>
              <HeaderText>{contentHeader}</HeaderText>
              {!isMobile && <SecondaryCloseIcon onClick={onDismiss} />}
            </SecondaryHeader>
          )}
          <Content modal={cross ? true : false}>{children}</Content>
          {(onCancel || onConfirm) && (
            <Footer modal={cross ? true : false}>
              {cancelText && (
                <ModalButton
                  variant={cross ? 'secondary' : 'primary'}
                  onClick={() => {
                    onCancel();
                    onDismiss();
                  }}
                >
                  {cancelText}
                </ModalButton>
              )}
              {onConfirm && (
                <ModalButton variant="secondary" onClick={onConfirm}>
                  {confirmText}
                </ModalButton>
              )}
            </Footer>
          )}
        </StyledModal>
      </Wrapper>
    </div>
  );

  return isOpen ? ReactDOM.createPortal(modal, document.body) : null;
};
