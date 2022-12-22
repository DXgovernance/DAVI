import { useETHPermissions } from 'Modules/Guilds/Hooks/useETHPermissions';
import {
  MOCK_GUILD_ADDRESS,
  MOCK_USER_ADDRESS,
  MOCK_VALID_PERMISSION,
} from 'Modules/Guilds/Hooks/fixtures';
import { Permission } from 'components/ActionsBuilder/types';
jest.mock('Modules/Guilds/Hooks/useETHPermissions', () => ({
  useETHPermissions: () => [
    {
      data: MOCK_VALID_PERMISSION,
      isError: false,
      isLoading: false,
    },
    {
      data: MOCK_VALID_PERMISSION,
      isError: false,
      isLoading: false,
    },
  ],
}));

describe('useGetETHPermission', () => {
  it('should return the permission from the permission registry', () => {
    const permissions: Permission[] = [
      {
        from: MOCK_GUILD_ADDRESS,
        to: MOCK_USER_ADDRESS,
        callType: 'NATIVE_TRANSFER',
        functionSignature: '0x',
      },
      {
        from: MOCK_GUILD_ADDRESS,
        to: MOCK_USER_ADDRESS,
        callType: 'NATIVE_TRANSFER',
        functionSignature: '0x',
      },
    ];

    const permissionsParsedArray = useETHPermissions(permissions);

    permissionsParsedArray.forEach(parsedPermission => {
      expect(parsedPermission.data).toMatchInlineSnapshot(`"500000, 500000"`);
      expect(parsedPermission.isError).toBe(false);
      expect(parsedPermission.isLoading).toBe(false);
    });
  });
});
