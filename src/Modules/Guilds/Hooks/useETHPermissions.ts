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
  console.log({
    permissionRegistryAddress,
    from,
    to,
    functionSignature,
  });
  const { data, ...rest } = useContractRead({
    addressOrName: permissionRegistryAddress,
    contractInterface: PermissionRegistry.abi,
    functionName: 'getETHPermission(address,address,bytes4)',
    args: [from, to, functionSignature],
    onSuccess(data) {
      console.log('data', data);
    },
    onError(error) {
      console.log('error', error);
    },
    onSettled(data, error) {
      console.log('data', data);
      console.log('error', error);
    },
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
