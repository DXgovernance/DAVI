import { StakeTokensModal } from "Components/StakeTokensModal";
import { useERC20Info } from '../../../hooks/Guilds/ether-swr/erc20/useERC20Info';
import { useGuildConfig } from '../../../hooks/Guilds/ether-swr/guild/useGuildConfig';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';


const StakeTokensModalWrapper = ({ isOpen, onDismiss}) => {
    const { guildId: guildAddress } = useTypedParams();
    const { data } = useGuildConfig(guildAddress);
    const { data: token } = useERC20Info(data?.token);

    return (<StakeTokensModal token={token} isOpen={isOpen} onDismiss={onDismiss}/>)
}

export default StakeTokensModalWrapper;