import { getPermissionArgs } from './utils';
import { SupportedAction } from 'components/ActionsBuilder/types';
import { utils } from 'ethers';

const mockDecodedActions = [
  {
    id: '0',
    decodedCall: {
      callType: 'NATIVE_TRANSFER' as SupportedAction,
      from: '0x0000000000000000000000000000000000000000',
      to: '0x0000000000000000000000000000000000000000',
      value: '0',
      args: {},
    },
    contract: utils.Interface,
  },
  {
    id: '1',
    contract: utils.Interface,
    decodedCall: {
      callType: 'CONTRACT_CALL' as SupportedAction,
      from: '0x0000000000000000000000000000000000000000',
      to: '0x0000000000000000000000000000000000000000',
      function: {
        name: 'foo',
        inputs: [
          {
            type: 'uint256',
          },
        ],
      },
      value: '0',
      args: {},
    },
  },
];

describe('getPermissionArgs', () => {
  it('should return the permission arguments for the decoded actions', () => {
    const permissionArgs = getPermissionArgs(mockDecodedActions as any);
    expect(permissionArgs).toMatchInlineSnapshot(`
      Array [
        Object {
          "callType": "NATIVE_TRANSFER",
          "from": "0x0000000000000000000000000000000000000000",
          "functionSignature": "0x00000000",
          "to": "0x0000000000000000000000000000000000000000",
        },
        Object {
          "callType": "CONTRACT_CALL",
          "from": "0x0000000000000000000000000000000000000000",
          "functionSignature": "0x2fbebd38",
          "to": "0x0000000000000000000000000000000000000000",
        },
      ]
    `);
  });
});
