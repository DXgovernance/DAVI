import { useGetETHPermission } from 'Modules/Guilds/Hooks/useETHPermissions';
import {
  MOCK_CONTRACT_ADDRESS,
  MOCK_GUILD_ADDRESS,
  MOCK_USER_ADDRESS,
  MOCK_VALID_PERMISSION,
} from 'Modules/Guilds/Hooks/fixtures';
jest.mock('Modules/Guilds/Hooks/useETHPermissions', () => ({
  useGetETHPermission: () => ({
    data: MOCK_VALID_PERMISSION,
    isError: false,
    isLoading: false,
  }),
}));

describe('useGetETHPermission', () => {
  it('should return the permission from the permission registry', () => {
    const { data, isError, isLoading } = useGetETHPermission({
      permissionRegistryAddress: MOCK_CONTRACT_ADDRESS,
      from: MOCK_GUILD_ADDRESS,
      to: MOCK_USER_ADDRESS,
      callType: 'NATIVE_TRANSFER',
      functionSignature: '0x',
    });
    expect(data).toMatchInlineSnapshot(`"500000, 500000"`);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });
});
