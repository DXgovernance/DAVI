import PermissionRegistry from 'contracts/PermissionRegistry.json';
import { useContractRead } from 'wagmi';
import { useMemo } from 'react';

interface useGetETHPermissionProps {
  guildAddress: string;
  from: string;
  to: string;
  functionSignature: string;
}

export const useGetETHPermission = ({
  guildAddress,
  from,
  to,
  functionSignature,
}: useGetETHPermissionProps) => {
  const { data, ...rest } = useContractRead({
    addressOrName: guildAddress,
    contractInterface: PermissionRegistry.abi,
    functionName: 'getETHPermission',
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
  console.log({ data })
  const parsed = useMemo(() => {
    if (!data) return null;
    return {
      data: data.toString(),
      ...rest,
    };
  }, [data, rest]);
  return parsed;
};
