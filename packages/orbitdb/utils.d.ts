interface OrbitDBAddress {
  protocol: string;
  hash: string;
  address: string;
  toString: () => string;
}

declare function isValidAddress(address: OrbitDBAddress | string): boolean;
declare function parseAddress(address: OrbitDBAddress | string): OrbitDBAddress;

export {
  OrbitDBAddress,

  isValidAddress,
  parseAddress,
}
