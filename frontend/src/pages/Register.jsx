import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", form);
      localStorage.setItem("token", res.data.token);
      setMsg({ type: "success", text: "Registered — token saved. Redirecting…" });
      setTimeout(() => nav("/profile"), 900);
    } catch (err) {
      setMsg({ type: "error", text: err.response?.data?.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2 className="card-title">Create an account</h2>
      <p className="card-sub">Fast signup — secure JWT authentication</p>

      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span className="label">Full name</span>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" required />
        </label>

        <label className="field">
          <span className="label">Email</span>
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@company.com" required />
        </label>

        <label className="field">
          <span className="label">Password</span>
          <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="••••••••" minLength={6} required />
        </label>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </button>

        {msg && <div className={`msg ${msg.type === "error" ? "msg-error" : "msg-success"}`}>{msg.text}</div>}
      </form>

      <div className="help-row">
        <small>
          Already got an account? <a href="/login">Login</a>
        </small>
      </div>
    </section>
  );
}
