import { DecodedAction } from './types';
import { Permission } from './types';
import Web3 from 'web3';

const web3 = new Web3();

export const permissionChecks = (
  decodedActions: DecodedAction[]
): Permission[] => {
  const permissions = decodedActions.map(decodedAction => {
    const functionInputs = decodedAction?.decodedCall?.function?.inputs?.map(
      input => input.type
    );
    const functionName = decodedAction?.decodedCall?.function?.name;
    const functionSignature = web3.eth.abi.encodeFunctionSignature(
      `${functionName}(${functionInputs.join(',')})`
    );
    return {
      from: decodedAction?.decodedCall?.from,
      to: decodedAction?.decodedCall?.to,
      functionSignature,
    };
  });
  return permissions;
};
