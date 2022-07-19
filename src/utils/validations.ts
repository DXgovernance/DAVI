import { BigNumber } from 'ethers';
export const isValidProposal = ({
  toArray,
  dataArray,
  valueArray,
  totalActions,
  title,
}: {
  toArray: string[];
  dataArray: string[];
  valueArray: BigNumber[];
  totalActions: number;
  title: string;
}): { isValid: boolean; error?: string } => {
  if (!title) {
    return {
      isValid: false,
      error: 'Title is required',
    };
  }
  if (totalActions === 0) {
    return {
      isValid: false,
      error: 'At least one Option is required',
    };
  }
  if (
    toArray.length === 0 ||
    dataArray.length === 0 ||
    valueArray.length === 0
  ) {
    return {
      isValid: false,
      error: 'At least one action per option is required',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};
