interface OrbitDBAddress {
    protocol: string;
    hash: string;
    address: string;
    toString: () => string;
}

function isValidAddress(address: OrbitDBAddress | string): boolean;
function parseAddress(address: OrbitDBAddress | string): OrbitDBAddress;

export {
    OrbitDBAddress,
    isValidAddress,
    parseAddress,
}
