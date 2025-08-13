import { useState } from 'react';
import { transfer } from '../api';

export default function TransferPage() {
  const [form, setForm] = useState({ fromPhone: '', toPhone: '', amount: '' });
  const [msg, setMsg] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault(); setMsg('');
    try {
      const payload = { ...form, amount: Number(form.amount) };
      const { data } = await transfer(payload);
      setMsg(`✅ ${data.message}. From: ${Number(data.fromBalance||0).toLocaleString()} | To: ${Number(data.toBalance||0).toLocaleString()}`);
      setForm({ ...form, amount: '' });
    } catch (err) {
      setMsg(`❌ ${err?.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="container">
      <h2>Send Money</h2>
      <form onSubmit={submit} className="card">
        <input name="fromPhone" placeholder="From Phone" value={form.fromPhone} onChange={onChange} required />
        <input name="toPhone" placeholder="To Phone" value={form.toPhone} onChange={onChange} required />
        <input name="amount" type="number" min="1" placeholder="Amount (MNT)" value={form.amount} onChange={onChange} required />
        <button>Send</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
