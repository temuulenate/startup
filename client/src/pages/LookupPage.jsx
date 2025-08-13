import { useState } from 'react';
import { getUserByPhone } from '../api';

export default function LookupPage() {
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState('');

  const fetchUser = async (e) => {
    e.preventDefault(); setMsg(''); setUser(null);
    try {
      const { data } = await getUserByPhone(phone.trim());
      setUser(data);
    } catch (err) {
      setMsg(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container">
      <h2>Lookup User</h2>
      <form onSubmit={fetchUser} className="card">
        <input placeholder="Phone Number" value={phone} onChange={(e)=>setPhone(e.target.value)} required />
        <button>Lookup</button>
      </form>
      {user && (
        <div className="card">
          <div><b>Name:</b> {user.name}</div>
          <div><b>Phone:</b> {user.phoneNumber}</div>
          <div><b>Register #:</b> {user.registerNumber}</div>
          <div><b>Wallet:</b> {Number(user.walletBalance||0).toLocaleString()} MNT</div>
          <div><b>Score:</b> {user.creditScore}</div>
        </div>
      )}
      {msg && <p>❌ {msg}</p>}
    </div>
  );
}
