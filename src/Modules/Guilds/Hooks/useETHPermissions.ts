import PermissionRegistry from 'contracts/PermissionRegistry.json';
import { useContractRead } from 'wagmi';
import { useMemo } from 'react';

interface useGetETHPermissionProps {
  guildAddress: string;
  from: string;
  to: string;
  funcSign: string;
}

export const useGetETHPermission = ({
  guildAddress,
  from,
  to,
  funcSign,
}: useGetETHPermissionProps) => {
  const { data, ...rest } = useContractRead({
    addressOrName: guildAddress,
    contractInterface: PermissionRegistry.abi,
    functionName: 'getETHPermission',
    args: [from, to, funcSign],
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
