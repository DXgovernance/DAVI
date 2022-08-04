import { Orbis } from '@orbisclub/orbis-sdk';
import type { Orbis as OrbisType } from '@orbisclub/orbis-sdk';

let orbis: OrbisType = new Orbis();

export async function connect() {
  let res = await orbis.connect();
  if (res.status === 200) {
    console.log('Connected to Ceramic with: ', res.did);
    return res.did;
  } else {
    console.error('Error connecting to Ceramic: ', res.error);
  }
}
