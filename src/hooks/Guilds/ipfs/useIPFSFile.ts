import useSWRImmutable from 'swr/immutable';

async function ipfsContentFetcher<T>(hash: string) {
  async function fetcher(url: string): Promise<T> {
    const response = await fetch(url);
    if (response.ok) {
      return response.json() as Promise<T>;
    } else {
      throw new Error('Unable to get content.');
    }
  }

  const response = await Promise.any([
    fetcher('https://davi.mypinata.cloud/ipfs/' + hash),
    fetcher('https://gateway.pinata.cloud/ipfs/' + hash),
    fetcher('https://ipfs.io/ipfs/' + hash),
    fetcher('https://gateway.ipfs.io/ipfs/' + hash),
    fetcher('https://cloudflare-ipfs.com/ipfs/' + hash),
    fetcher('https://dweb.link/ipfs/' + hash),
  ]);

  return response;
}

export default function useIPFSFile<T>(contentHash: string) {
  const { data, error } = useSWRImmutable<T>(contentHash, ipfsContentFetcher);

  if (!contentHash) return {};
  return { data, error };
}
