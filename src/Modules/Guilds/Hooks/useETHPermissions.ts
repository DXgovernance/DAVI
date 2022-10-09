import PermissionRegistry from 'contracts/PermissionRegistry.json';
import { useContractRead } from 'wagmi';
import { useMemo } from 'react';

interface useGetETHPermissionProps {
  permissionRegistryAddress: string;
  from: string;
  to: string;
  functionSignature: string;
}

export const useGetETHPermission = ({
  permissionRegistryAddress,
  from,
  to,
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
    return {
      data: data.toString(),
      ...rest,
    };
  }, [data, rest]);
  return parsed;
};
