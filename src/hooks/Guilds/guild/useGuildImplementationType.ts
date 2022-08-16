import { useMemo, useEffect, useState } from 'react';
import { utils } from 'ethers';
import { GuildImplementationType } from '../../../types/types.guilds.d';
import deployedHashedBytecodes from '../../../bytecodes/config.json';
import { useProvider } from 'wagmi';

const defaultImplementation = deployedHashedBytecodes.find(
  ({ type }) => type === GuildImplementationType.IERC20Guild
) ?? {
  type: GuildImplementationType.IERC20Guild,
  features: [],
  bytecode_hash: '',
};

interface ImplementationTypeConfig {
  type: string;
  features: string[];
  bytecode_hash: string;
}

interface ImplementationTypeConfigReturn extends ImplementationTypeConfig {
  isRepGuild: boolean;
  isSnapshotGuild: boolean;
}
const parseConfig = (
  config: ImplementationTypeConfig
): ImplementationTypeConfigReturn => {
  console.log({ config });
  return {
    ...config,
    isRepGuild: config.features.includes('REP'),
    isSnapshotGuild: config.features.includes('SNAPSHOT'),
  };
};

/**
 * @function useGuildImplementationType
 * @param {string} guildAddress
 * @returns {ImplementationTypeConfigReturn}
 */
export default function useGuildImplementationTypeConfig(
  guildAddress: string
): ImplementationTypeConfigReturn {
  const [guildBytecode, setGuildBytecode] = useState<string>('');
  const provider = useProvider();
  useEffect(() => {
    const getBytecode = async () => {
      const btcode = await provider.getCode(guildAddress);
      const hashedBytecode = utils.sha256(btcode);
      setGuildBytecode(hashedBytecode);
    };
    getBytecode();
  }, [guildAddress, provider]);

  const implementationTypeConfig: ImplementationTypeConfig = useMemo(() => {
    if (!guildBytecode) return defaultImplementation;
    console.log({ guildBytecode });
    const match = deployedHashedBytecodes.find(
      ({ bytecode_hash }) => guildBytecode === bytecode_hash
    );
    console.log({ match });
    return match ?? defaultImplementation; // default to IERC20Guild
  }, [guildBytecode]);
  return parseConfig(implementationTypeConfig);
}
