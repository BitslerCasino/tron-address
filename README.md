# tron-address
Generate hd address and mnemonic that is compatible with tronlink wallet

## Installation
- `yarn add tron-address` or `npm install tron-address`

## Usage
- Generate 12-word mnemonic. (WARNING: This wallet only stores the seed in-memory, restarting the application will also remove it from memory, make sure to backup!)
```
import Address from 'tron-address';
const mnemonic = Address.generateMnemonic();
console.log(mnemonic);
// will show you the 12-word mnemonic seed
```

- Initiating class(Mnemonic seed is required)
```
import Address from 'tron-address';
const mnemonic = Address.generateMnemonic();
const address = new Address(mnemonic, 0);
// 2nd argument is optional and defaults to 0, this corresponds to the last index used to generate an address
```

- Get the master address (NOTE: master address represents the index 0 of the derivation path);
```
console.log(address.master)
```

- Get the master address full info (NOTE: Becareful when showing your mnemonic seed)
```
console.log(address.masterInfo)
```

- Create new Address
```
console.log(address.createAddress())
```

- Get Address by index
```
console.log(address.getAddress(1));
console.log(address.getAddress(0));
// using index 0 to getAddress is also the same as address.master
```

- Get Address full info (NOTE: Becareful when showing your private key)
```
console.log(address.getAddressInfo(1))
```

- Get the mnemonic seed (WARNING: Becareful when showing your mnemonic seed)
```
console.log(address.mnemonic)
// will return the mnemonic seed
```

### NOTE
This module does not keep track of your addresses or your indices. The user must keep track or store the address indices and keys.