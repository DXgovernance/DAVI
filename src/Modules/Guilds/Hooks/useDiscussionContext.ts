const useDiscussionContext = (guildId: string, subId: string) => {
  const prefix = 'projectDaviTest-';
  const context = `${prefix}${guildId}-${subId}`;
  return { context };
};

export default useDiscussionContext;
