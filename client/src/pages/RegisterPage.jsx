import { useState } from 'react';
import { registerUser } from '../api';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', phoneNumber: '', registerNumber: '' });
  const [msg, setMsg] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault(); setMsg('');
    try {
      const { data } = await registerUser(form);
      setMsg(`${data.message} ✔️`);
      setForm({ name: '', phoneNumber: '', registerNumber: '' });
    } catch (err) {
      const m = err?.response?.data?.message || err.message;
      setMsg(`❌ ${m}`);
      console.error('register error:', err?.response || err);
    }
  };

  return (
    <div className="container">
      <h2>Register User</h2>
      <form onSubmit={onSubmit} className="card">
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
        <input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={onChange} required />
        <input name="registerNumber" placeholder="Register Number" value={form.registerNumber} onChange={onChange} required />
        <button>Register</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
