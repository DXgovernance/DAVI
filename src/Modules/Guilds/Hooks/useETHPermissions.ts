import PermissionRegistry from 'contracts/PermissionRegistry.json';
import { useContractReads } from 'wagmi';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useGuildConfig } from 'Modules/Guilds/Hooks/useGuildConfig';
import { Permission } from 'components/ActionsBuilder/types';

export const useETHPermissions = (permissionArgsArray: Permission[]) => {
  const { guildId } = useTypedParams();
  const { data: guildConfig } = useGuildConfig(guildId);

  let contractArray = [];

  permissionArgsArray.forEach(permissionArg => {
    const contract = {
      address: guildConfig?.permissionRegistry,
      abi: PermissionRegistry.abi,
      functionName: 'getETHPermission(address,address,bytes4)',
      args: [
        permissionArg.from,
        permissionArg.to,
        permissionArg.functionSignature,
      ],
      watch: true,
    };
    contractArray.push(contract);
  });

  const { data: permissions, ...rest } = useContractReads({
    contracts: contractArray,
  });

  let parsedPermissionsArray = [];

  permissions?.forEach((permission, index) => {
    const parsed = getParsed(permission, permissionArgsArray, rest, index);
    parsedPermissionsArray.push(parsed);
  });
  return parsedPermissionsArray;
};

const getParsed = (permission, permissionArgsArray, rest, index: number) => {
  if (!permission) return null;
  if (permissionArgsArray[index].callType === 'NATIVE_TRANSFER') {
    return {
      data: 'true',
      ...rest,
    };
  }
  return {
    data: permission.toString(),
    ...rest,
  };
};
