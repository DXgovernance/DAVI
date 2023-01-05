import { DaoIcon, Content, DaoTitle } from './GuildCardContent.styled';
import dxDaoIcon from 'assets/images/dxdao-icon.svg';
import { Loading } from 'components/primitives/Loading';
import { GuildCardContentProps } from './types';

export const GuildCardContent: React.FC<GuildCardContentProps> = ({
  isLoading,
  ensName,
  data,
}) => {
  return (
    <Content data-testid="guild-name">
      <DaoIcon src={dxDaoIcon} />
      {isLoading ? (
        <Loading
          skeletonProps={{ width: 100, height: 20 }}
          style={{ marginTop: 20 }}
          text
          loading
        />
      ) : (
        <DaoTitle size={2}>{ensName ?? data?.name}</DaoTitle>
      )}
    </Content>
  );
};
