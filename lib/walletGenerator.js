import { mnemonicNew, mnemonicToWalletKey } from 'ton-crypto';
import { WalletContractV4 } from 'ton';

export async function generateWallets(count) {
  const wallets = [];

  for (let i = 0; i < count; i++) {
    const mnemonic = await mnemonicNew();
    const key = await mnemonicToWalletKey(mnemonic);
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

    wallets.push({
      mnemonic: mnemonic.join(' '),
      address: wallet.address.toString(),
      privateKey: key.secretKey.toString('hex')
    });
  }

  return wallets;
}