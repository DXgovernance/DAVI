import PermissionRegistry from 'contracts/PermissionRegistry.json';
import { useContractRead } from 'wagmi';
import { useMemo } from 'react';

interface useGetETHPermissionProps {
  permissionRegistryAddress: string;
  from: string;
  to: string;
  callType: string;
  functionSignature: string;
}

export const useGetETHPermission = ({
  permissionRegistryAddress,
  from,
  to,
  callType,
  functionSignature,
}: useGetETHPermissionProps) => {
  const { data, ...rest } = useContractRead({
    addressOrName: permissionRegistryAddress,
    contractInterface: PermissionRegistry.abi,
    functionName: 'getETHPermission(address,address,bytes4)',
    args: [from, to, functionSignature],
    watch: true,
  });
  const parsed = useMemo(() => {
    if (!data) return null;
    if (callType === 'NATIVE_TRANSFER') {
      return {
        data: 'true',
        ...rest,
      };
    }
    return {
      data: data.toString(),
      ...rest,
    };
  }, [data, rest, callType]);
  return parsed;
};
