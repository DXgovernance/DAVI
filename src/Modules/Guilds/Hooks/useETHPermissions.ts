import PermissionRegistry from 'contracts/PermissionRegistry.json';
import { useContractRead } from 'wagmi';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import { Permission } from 'components/ActionsBuilder/types';
import { useMemo } from 'react';
const FROM_TIME = 1;

export const useETHPermissions = (permissionArgs: Permission) => {
  const { guildId } = useTypedParams();
  const { data: guildConfig } = useGuildConfig(guildId);

  const {
    data: permission,
    isError,
    isLoading,
  } = useContractRead({
    address: guildConfig?.permissionRegistry,
    abi: PermissionRegistry.abi,
    functionName: 'getETHPermission(address,address,bytes4)',
    args: [
      permissionArgs.from,
      permissionArgs.to,
      permissionArgs.functionSignature,
    ],
    watch: true,
  });

  const parsed = useMemo(() => {
    if (!permission) return null;
    if (permissionArgs.callType === 'NATIVE_TRANSFER') {
      return {
        data: 'true',
        isError,
        isLoading,
      };
    }
    return {
      data: permission[FROM_TIME].toString(),
      isError,
      isLoading,
    };
  }, [permission, permissionArgs.callType, isError, isLoading]);

  return parsed;
};
