import { utils } from 'ethers';
import { Buffer } from 'buffer';

window.Buffer = Buffer;

export const toEthSignedMessageHash = function (messageHex) {
  const messageBuffer = Buffer.from(messageHex.substring(2), 'hex');
  const prefix = Buffer.from(
    `\u0019Ethereum Signed Message:\n${messageBuffer.length}`
  );
  return utils.keccak256(Buffer.concat([prefix, messageBuffer]));
};
