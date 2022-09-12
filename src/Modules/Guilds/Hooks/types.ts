// TODO: Wagmi current version (0.5.6) does not have types for useContractRead hook. Use wagmi type in when is ready and remove this.
export type WagmiUseContractReadResponse<T> = {
  data: T;
  error: any;
  isError: boolean;
  isFetched: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isRefetching: boolean;
  isSuccess: boolean;
  refetch: (options?: any) => Promise<any>;
  status: 'error' | 'success' | 'idle' | 'loading';
  fetchStatus: 'fetching' | 'paused' | 'idle';
};
