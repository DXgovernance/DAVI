import { ProposalDescriptionProps } from './types';

export const withMetadata: ProposalDescriptionProps = {
  metadata: {
    description: 'This is the description of the proposal',
  },
  t: key => key,
};

export const noMetadata: ProposalDescriptionProps = {
  t: key => key,
};

export const errorMetadata: ProposalDescriptionProps = {
  error: 'error',
  t: key => key,
};
