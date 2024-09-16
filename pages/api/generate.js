import { generateWallets } from '../../lib/walletGenerator';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { count } = req.body;
    console.log(`Generating ${count} wallets`); // 添加日志
    try {
      const wallets = await generateWallets(count);
      console.log(`Generated ${wallets.length} wallets successfully`); // 添加日志
      res.status(200).json(wallets);
    } catch (error) {
      console.error(`Error generating wallets: ${error.message}`); // 添加错误日志
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}