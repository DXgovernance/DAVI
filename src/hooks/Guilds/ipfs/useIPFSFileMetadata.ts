import useSWRImmutable from 'swr';

async function ipfsFileMetadataFetcher(hash: string) {
  async function fetcher(url: string) {
    const res = await fetch(url, { method: 'HEAD' });
    if (!res.ok) throw new Error("Couldn't get file size");

    const contentLength =
      res.headers.get('x-ipfs-datasize') || res.headers.get('Content-Length');
    const contentType = res.headers.get('Content-Type');

    if (!contentLength || !contentType) throw new Error('No metadata');

    return { fileSize: Number.parseInt(contentLength), mime: contentType };
  }

  const response = await Promise.any([
    fetcher('https://ipfs.io/ipfs/' + hash),
    fetcher('https://gateway.ipfs.io/ipfs/' + hash),
    fetcher('https://gateway.pinata.cloud/ipfs/' + hash),
    fetcher('https://dweb.link/ipfs/' + hash),
    fetcher('https://infura-ipfs.io/ipfs/' + hash),
    fetcher('https://cloudflare-ipfs.com/ipfs/' + hash),
  ]);

  return response;
}

export default function useIPFSFileMetadata(contentHash: string) {
  const { data, error } = useSWRImmutable(
    [contentHash, 'metadata'],
    ipfsFileMetadataFetcher
  );
  return { data, error };
}
