import { useProvider } from 'wagmi';

export default function useJsonRpcProvider() {
  const provider = useProvider();
  return provider;
}
