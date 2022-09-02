import { useGuildConfig } from './useGuildConfig';
import {
  MOCK_BIG_NUMBER,
  MOCK_GUILD_ADDRESS,
  MOCK_NAME,
  MOCK_TOKEN,
  MOCK_CONTRACT_ADDRESS,
} from './fixtures';
jest.mock('./useGuildConfig', () => ({
  useGuildConfig: () => ({
    data: {
      name: MOCK_NAME,
      token: MOCK_TOKEN,
      permissionRegistry: MOCK_CONTRACT_ADDRESS,
      proposalTime: MOCK_BIG_NUMBER,
      timeForExecution: MOCK_BIG_NUMBER,
      maxActiveProposals: MOCK_BIG_NUMBER,
      votingPowerForProposalCreation: MOCK_BIG_NUMBER,
      votingPowerForProposalExecution: MOCK_BIG_NUMBER,
      tokenVault: MOCK_CONTRACT_ADDRESS,
      lockTime: MOCK_BIG_NUMBER,
    },
    isError: false,
    isLoading: false,
  }),
}));

describe('useGuildConfig', () => {
  it('should return the guild config', () => {
    const { data, isError, isLoading } = useGuildConfig(MOCK_GUILD_ADDRESS);
    expect(data).toMatchInlineSnapshot(`
      Object {
        "lockTime": Object {
          "hex": "0x01",
          "type": "BigNumber",
        },
        "maxActiveProposals": Object {
          "hex": "0x01",
          "type": "BigNumber",
        },
        "name": "wagmi",
        "permissionRegistry": "0x0000000000000000000000000000000000000001",
        "proposalTime": Object {
          "hex": "0x01",
          "type": "BigNumber",
        },
        "timeForExecution": Object {
          "hex": "0x01",
          "type": "BigNumber",
        },
        "token": "0x0000000000000000000000000000000000000003",
        "tokenVault": "0x0000000000000000000000000000000000000001",
        "votingPowerForProposalCreation": Object {
          "hex": "0x01",
          "type": "BigNumber",
        },
        "votingPowerForProposalExecution": Object {
          "hex": "0x01",
          "type": "BigNumber",
        },
      }
    `);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
