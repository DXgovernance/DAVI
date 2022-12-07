import { Orbis } from '@orbisclub/orbis-sdk';
import { useState, useEffect, createContext } from 'react';
import { useSigner } from 'wagmi';
import { sleep } from 'utils';

export const OrbisContext = createContext(null);

export const OrbisProvider = ({ children }) => {
  const orbis = new Orbis();
  const { data: signer } = useSigner();

  const [profile, setProfile] = useState<any>(null);
  const [hasLit, setHasLit] = useState(false);

  const connectOrbis = async () => {
    const res = await orbis.connect_v2({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      provider: signer?.provider?.provider,
    });

    if (res.status !== 200) {
      await sleep(2000);
      await connectOrbis();
    } else {
      const { data } = await orbis.getProfile(res.did);
      setProfile(data);
    }
  };

  const disconnectOrbis = () => {
    const res = orbis.logout();

    if (res.status === 200) setProfile(null);
  };

  const connectLit = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await orbis.connectLit(signer?.provider?.provider);

    setHasLit(res.status === 200);
  };

  const checkOrbisConnection = async (autoConnect = false) => {
    const res = await orbis.isConnected();

    if (res.status === 200) {
      const { data } = await orbis.getProfile(res.did);
      setHasLit(res?.details?.hasLit);
      setProfile(data);
    } else if (autoConnect) {
      await connectOrbis();
    }
  };

  useEffect(() => {
    if (signer) checkOrbisConnection(true);
    // else disconnectOrbis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer]);

  return (
    <OrbisContext.Provider
      value={{
        orbis,
        profile,
        hasLit,
        connectOrbis,
        disconnectOrbis,
        connectLit,
        checkOrbisConnection,
      }}
    >
      {children}
    </OrbisContext.Provider>
  );
};
