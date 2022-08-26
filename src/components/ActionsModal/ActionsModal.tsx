import React, { useEffect } from 'react';
import { BigNumber } from 'ethers';
import { useTranslation } from 'react-i18next';

import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { RichContractData } from 'hooks/Guilds/contracts/useRichContractRegistry';
import {
  defaultValues,
  getEditor,
  supportedActions,
  displaySubmit,
} from 'components/ActionsBuilder/SupportedActions';
import { Button } from 'components/primitives/Button';

import {
  DecodedAction,
  DecodedCall,
  SupportedAction,
} from 'components/ActionsBuilder/types';
import { Modal } from 'components/primitives/Modal';
import {
  ContractActionsList,
  ApproveSpendTokens,
  ContractsList,
  ParamsForm,
} from './components';
import { EditorWrapper } from './ActionsModal.styled';
import { ActionModalProps } from './types';
import { TokenSpendApproval } from './components/ApproveSpendTokens/ApproveSpendTokens';
import { useAccount } from 'wagmi';
import { useGuildConfig } from 'hooks/Guilds/ether-swr/guild/useGuildConfig';

const ActionModal: React.FC<ActionModalProps> = ({
  action,
  isOpen,
  setIsOpen,
  onAddAction,
}) => {
  const { t } = useTranslation();
  const { guildId } = useTypedParams();
  const { address: walletAddress } = useAccount();
  const { data: guildConfig } = useGuildConfig(guildId);
  // Supported Actions
  const [selectedAction, setSelectedAction] =
    React.useState<SupportedAction>(null);

  // Generic calls
  const [selectedContract, setSelectedContract] =
    React.useState<RichContractData>(null);
  const [selectedFunction, setSelectedFunction] = React.useState<string>(null);

  const [data, setData] = React.useState<DecodedCall>(null);
  const [showTokenApprovalForm, setShowTokenApprovalForm] =
    React.useState(false);
  const [payableFnData, setPayableFnData] =
    React.useState<TokenSpendApproval>(null);

  useEffect(() => {
    if (!action?.decodedCall) return;

    if (action.decodedCall.callType === SupportedAction.GENERIC_CALL) {
      setSelectedContract(action.decodedCall.richData);
      setSelectedFunction(action.decodedCall.function.name);
    } else {
      setSelectedAction(action.decodedCall.callType);
    }

    setData(action.decodedCall);
    setPayableFnData(action.approval);
    setShowTokenApprovalForm(action.approval ? true : false);
  }, [action]);

  function getHeader() {
    if (selectedFunction) {
      return selectedContract.functions.find(
        fn => fn.functionName === selectedFunction
      )?.title;
    }

    if (selectedContract) {
      return selectedContract?.title;
    }

    if (selectedAction) {
      return supportedActions[selectedAction].title;
    }

    return t('addAction');
  }

  function getContent() {
    if (selectedFunction) {
      const contractInterface = selectedContract.contractInterface;
      const contractId = selectedContract.contractAddress;
      const fn = selectedContract.functions.find(
        fn => fn.functionName === selectedFunction
      );
      const isPayable: boolean = fn?.spendsTokens;
      // Return approval form if function is marked with spendsTokens=true
      if (showTokenApprovalForm || (isPayable && !payableFnData)) {
        return (
          <ApproveSpendTokens
            defaultValue={payableFnData}
            onConfirm={values => {
              setPayableFnData(values);
              setShowTokenApprovalForm(false);
            }}
          />
        );
      }

      return (
        <ParamsForm
          fn={fn}
          defaultValues={data?.args}
          onSubmit={args => {
            onAddAction({
              id: `action-${Math.random()}`,
              contract: contractInterface,
              decodedCall: {
                callType: SupportedAction.GENERIC_CALL,
                from: guildId,
                to: contractId,
                function: contractInterface.getFunction(selectedFunction),
                value: BigNumber.from(0),
                args,
                richData: selectedContract,
              },
              approval: payableFnData,
            });
            handleClose();
          }}
        />
      );
    }

    if (selectedContract) {
      return (
        <ContractActionsList
          contract={selectedContract}
          onSelect={setSelectedFunction}
        />
      );
    }

    if (selectedAction) {
      const Editor = getEditor(selectedAction);

      return (
        <EditorWrapper data-testid="actions-modal-editor">
          <Editor
            decodedCall={data}
            updateCall={setData}
            onSubmit={saveSupportedAction}
          />
          {displaySubmit(selectedAction) && (
            <Button
              m="1rem 0 0"
              fullWidth
              onClick={() => saveSupportedAction()}
            >
              {t('saveAction')}
            </Button>
          )}
        </EditorWrapper>
      );
    }

    return (
      <ContractsList
        onSelect={setSelectedContract}
        onSupportedActionSelect={setSupportedAction}
      />
    );
  }

  function goBack() {
    if (selectedFunction) {
      setSelectedFunction(null);
      setPayableFnData(null);
    } else if (selectedContract) {
      setSelectedContract(null);
    } else if (selectedAction) {
      setSelectedAction(null);
    }

    setData(null);
  }

  function setSupportedAction(action: SupportedAction) {
    const defaultDecodedAction = defaultValues[action];
    if (!defaultDecodedAction) return null;

    defaultDecodedAction.decodedCall.from = guildId;
    defaultDecodedAction.decodedCall.callType = action;
    switch (action) {
      case SupportedAction.REP_MINT:
        defaultDecodedAction.decodedCall.args.to = walletAddress;
        break;
      case SupportedAction.SET_PERMISSIONS:
        defaultDecodedAction.decodedCall.args.from = guildId;
        defaultDecodedAction.decodedCall.to = guildConfig?.permissionRegistry;
        break;
    }
    setData(defaultDecodedAction.decodedCall);
    setSelectedAction(action);
  }

  function saveSupportedAction(call?: DecodedCall) {
    const decodedCall = call ?? data;

    const defaultDecodedAction = defaultValues[decodedCall.callType];

    if (!selectedAction || !decodedCall) return;

    const decodedAction: DecodedAction = {
      id: `action-${Math.random()}`,
      decodedCall,
      contract: defaultDecodedAction.contract,
    };

    onAddAction(decodedAction);
    handleClose();
  }

  const handleClose = () => {
    setSelectedFunction(null);
    setSelectedContract(null);
    setSelectedAction(null);
    setPayableFnData(null);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={handleClose}
      header={getHeader()}
      maxWidth={300}
      backnCross={!action && (!!selectedAction || !!selectedContract)}
      prevContent={goBack}
    >
      {getContent()}
    </Modal>
  );
};

export default ActionModal;
