const useDiscussionContext = (customContext: string) => {
  const prefix = 'projectDaviTest-';
  const context = `${prefix}${customContext}`;
  return { context };
};

export default useDiscussionContext;
