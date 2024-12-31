import { randomUUID } from "node:crypto";
import { genKeyPairHex, sharedKey } from "./KeyPair.js";
import { encrypt, decrypt } from "./enc_dec.js";
import { generateKeyPEMFile } from "./generateKeyPEMFile.js";
import { signature, checkSignature } from "./signature.js";
import { alice, bob } from "./alice_and_bob.js";

const generateUUID = () => randomUUID();

export {
  generateKeyPEMFile,
  generateUUID,
  genKeyPairHex,
  sharedKey,
  encrypt,
  decrypt,
  signature,
  checkSignature,
  alice,
  bob
};

export default {
  generateKeyPEMFile,
  generateUUID,
  genKeyPairHex,
  sharedKey,
  encrypt,
  decrypt,
  signature,
  checkSignature,
  alice,
  bob
};
