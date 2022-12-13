const useDiscussionContext = (customContext: string) => {
  // Add prefix to avoid conflicts with other contexts
  const prefix = 'projectDaviTest-';
  const context = `${prefix}${customContext}`;
  return { context };
};

export default useDiscussionContext;
