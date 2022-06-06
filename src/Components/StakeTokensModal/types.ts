import { BigNumber, providers } from "ethers";
import { ERC20Info } from "hooks/Guilds/ether-swr/erc20/useERC20Info";
import { ERC20, ERC20Guild } from "types/contracts";
import { GuildConfig } from "hooks/Guilds/ether-swr/guild/useGuildConfig";
export interface StakeTokensModalProps {
    isOpen: boolean;
    onDismiss: () => void;
    token: {
        name: string;
    };
    StakeTokensForm: React.FC<StakeTokensFormsProps>
  }

export interface StakeTokensFormsProps {
    token: Token;
    userVotingPower: BigNumber;
    guild: Guild;
    createTransaction: (summary: string, txFunction: () => Promise<providers.TransactionResponse>) => void
    isRepGuild: boolean;
}
interface Guild {
    contract: ERC20Guild;
    config: GuildConfig;
}
interface Token {
    allowance: BigNumber;
    balance: BigNumber;
    info: ERC20Info
    contract: ERC20;
}
