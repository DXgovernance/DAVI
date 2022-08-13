import type { Orbis as OrbisType } from '@orbisclub/orbis-sdk';

export async function connect(orbis: OrbisType) {
  let res = await orbis.connect();
  if (res.status === 200) {
    console.log('Connected to Ceramic with: ', res.did);
    return res.did;
  } else {
    console.error('Error connecting to Ceramic: ', res.error);
  }
}
export const isConnected = async (orbis: OrbisType) => {
  let res = await orbis.isConnected();
  if (res.status === 200) {
    return res.did;
  } else {
    console.error('Error connecting to Ceramic: ', res.error);
  }
};
