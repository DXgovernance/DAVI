import { ProposalDescriptionProps } from './types';

export const withMetadata: ProposalDescriptionProps = {
  metadata: {
    description: 'This is the description of the proposal',
  },
};

export const noMetadata: ProposalDescriptionProps = {};

export const errorMetadata: ProposalDescriptionProps = {
  error: 'error',
};
