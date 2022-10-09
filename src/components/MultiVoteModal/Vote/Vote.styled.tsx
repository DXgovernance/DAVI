import styled from 'styled-components';

export const VoteWrapper = styled.div<{ selected?: boolean }>`
  padding: 10px;
  border: ${({ selected }) =>
    selected ? '1px solid white;' : `1px solid #2f3136;`}
  border-radius: 4px;
  margin: 6px 0px;
`;

export const Title = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: #ffffff;
`;
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const DescriptionLabel = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;

  color: #a1a6b0;
`;

export const SelectedOptionBox = styled(VoteWrapper)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

