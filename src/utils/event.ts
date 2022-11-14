export const getProposalIdFromEvent = (event): string => {
  if (!event.length) return null;

  const params = event[event.length - 1].args;
  return params.proposalId;
};
