import { Call, DecodedCall, Option } from 'Components/ActionsBuilder/types';
import ERC20ABI from 'abis/ERC20.json';
import { utils, BigNumber } from 'ethers';

export const encodeCall = (
  decodedCall: DecodedCall,
  contractInterface: utils.Interface
) => {
  if (!contractInterface || !decodedCall.function || !decodedCall.args)
    return utils.hexlify([0]);

  const args = contractInterface
    .getFunction(decodedCall.function.name)
    .inputs.map(input => decodedCall.args[input.name]);
  return contractInterface.encodeFunctionData(decodedCall.function, args);
};

export const encodeApprovalCall = (
  spender: string,
  amount: BigNumber
): string => {
  const ERC20Contract = new utils.Interface(ERC20ABI);
  return ERC20Contract.encodeFunctionData('approve', [spender, amount]);
};

export const bulkEncodeCallsFromOptions = (options: Option[]): Option[] => {
  return options.map(option => {
    const { decodedActions } = option;
    const encodedCalls: Call[] = decodedActions?.reduce(
      (acc, decodedAction) => {
        const actionCall = {
          from: decodedAction.decodedCall.from,
          to: decodedAction.decodedCall.to,
          data: encodeCall(decodedAction.decodedCall, decodedAction.contract),
          value: decodedAction.decodedCall.value,
        };
        if (!!decodedAction.approval) {
          const approvalCall = {
            from: decodedAction.decodedCall.from, // Guild address
            to: decodedAction.approval?.token, // Token address
            data: encodeApprovalCall(
              decodedAction.decodedCall.to, // Spender: Contract we are doing the actual spending call to
              decodedAction.approval?.amount // Value: Amount of tokens to approve
            ),
            value: BigNumber.from('0'), // No native tokens to send on approval call
          };
          return [...acc, approvalCall, actionCall];
        }
        return [...acc, actionCall];
      },
      []
    );
    return {
      ...option,
      actions: encodedCalls,
    };
  });
};

export const useEncodedCall = (
  decodedCall: DecodedCall,
  contractInterface: utils.Interface
) => {
  return encodeCall(decodedCall, contractInterface);
};
