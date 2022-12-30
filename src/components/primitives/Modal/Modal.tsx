import ReactDOM from 'react-dom';
import { isMobile } from 'react-device-detect';
import { FiArrowLeft } from 'react-icons/fi';
import { ModalProps } from 'components/primitives/Modal';

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
import { useState } from 'react';

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
  const [clickedOnBackdrop, setClickedOnBackdrop] = useState(false);

  const handleOnMouseDownOnBackdrop = e => {
    e.stopPropagation();
    if (
      typeof e.target.className === 'string' &&
      e.target.className.includes(`backdropModal`)
    ) {
      setClickedOnBackdrop(true);
    }
  };

  const handleOnMouseUpOnBackdrop = e => {
    e.stopPropagation();
    if (
      typeof e.target.className === 'string' &&
      e.target.className.includes(`backdropModal`) &&
      clickedOnBackdrop
    ) {
      onDismiss();
    }
    setClickedOnBackdrop(false);
  };

  const modal = (
    <div data-testid={dataTestId}>
      <Backdrop
        onMouseDown={e => handleOnMouseDownOnBackdrop(e)}
        onMouseUp={e => handleOnMouseUpOnBackdrop(e)}
        zIndex={zIndex}
        className={`backdropModal`}
      >
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
      </Backdrop>
    </div>
  );

  return isOpen ? ReactDOM.createPortal(modal, document.body) : null;
};
