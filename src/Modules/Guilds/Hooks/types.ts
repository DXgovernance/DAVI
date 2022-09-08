export type WagmiUseContractReadResponse<T> = Pick<
  import('react-query').QueryObserverResult<
    import('ethers/lib/utils').Result,
    Error
  >,
  | 'error'
  | 'fetchStatus'
  | 'isError'
  | 'isFetched'
  | 'isFetching'
  | 'isLoading'
  | 'isRefetching'
  | 'isSuccess'
  | 'refetch'
> & {
  isIdle: boolean;
  status: 'error' | 'success' | 'idle' | 'loading' /** Subscribe to changes */;
  internal: Pick<
    import('react-query').QueryObserverResult<unknown, unknown>,
    | 'dataUpdatedAt'
    | 'errorUpdatedAt'
    | 'failureCount'
    | 'isFetchedAfterMount'
    | 'isLoadingError'
    | 'isPaused'
    | 'isPlaceholderData'
    | 'isPreviousData'
    | 'isRefetchError'
    | 'isStale'
    | 'remove'
  >;
} & { data: T };
