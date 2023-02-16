import { getHuddleClient } from "@huddle01/huddle01-client";
import { create } from "ipfs-http-client";

export const huddleClient = getHuddleClient(
  "78bdd193c8cd9b7d766f37cc640893dea83ef3e1c89c45821fbf7ffa41278709"
);

export const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");

export const GATEWAY = 'https://nftstorage.link/ipfs/'
