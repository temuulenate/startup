import { useState } from 'react';
import { topUp } from '../api';

export default function TopUpPage() {
  const [phoneNumber, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault(); setMsg('');
    try {
      const { data } = await topUp({ phoneNumber: phoneNumber.trim(), amount: Number(amount) });
      setMsg(`✅ ${data.message}. New balance: ${Number(data.walletBalance||0).toLocaleString()} MNT`);
      setAmount('');
    } catch (err) {
      setMsg(`❌ ${err?.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="container">
      <h2>Top Up Wallet</h2>
      <form onSubmit={submit} className="card">
        <input placeholder="Phone Number" value={phoneNumber} onChange={(e)=>setPhone(e.target.value)} required />
        <input type="number" min="1" placeholder="Amount (MNT)" value={amount} onChange={(e)=>setAmount(e.target.value)} required />
        <button>Top Up</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
