import styled from 'styled-components';
import { IconButton } from 'components/Primitives/Button';

export const UserActionButton = styled(IconButton)`
  border-radius: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  & > div:first-child {
    display: flex;
  }
`;

export const IconHolder = styled.span`
  display: flex;
  justify-content: center;

  @media only screen and (min-width: 768px) {
    margin-right: 0.3rem;
  }

  img {
    border-radius: 50%;
    margin-right: 0;
  }
`;

export const VotingPower = styled.div`
  background-color: #282b30;
  color: #fff;
  border-radius: 32px;
  padding: 2px 8px;
  font-weight: 500;
  font-size: 14px;
`;
