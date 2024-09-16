import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [count, setCount] = useState(1);
  const [result, setResult] = useState('');

  async function generateWallets() {
    setResult('正在生成钱包...');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: parseInt(count) })
      });
      const wallets = await response.json();
      
      let output = '<h2>生成的钱包:</h2>';
      wallets.forEach((wallet, index) => {
        output += `<h3>钱包 ${index + 1}</h3>`;
        output += `<p>助记词: ${wallet.mnemonic}</p>`;
        output += `<p>地址: ${wallet.address}</p>`;
        output += `<p>私钥: ${wallet.privateKey}</p>`;
      });

      setResult(output);
    } catch (error) {
      setResult(`错误: ${error.message}`);
    }
  }

  return (
    <div>
      <Head>
        <title>TON 钱包批量生成工具</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <h1>TON 钱包批量生成工具</h1>
      <label htmlFor="count">生成数量:</label>
      <input
        type="number"
        id="count"
        min="1"
        value={count}
        onChange={(e) => setCount(e.target.value)}
      />
      <button onClick={generateWallets}>生成钱包</button>
      <div dangerouslySetInnerHTML={{ __html: result }} />
    </div>
  );
}