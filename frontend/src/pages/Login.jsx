import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setMsg({ type: "success", text: "Logged in — redirecting…" });
      setTimeout(() => nav("/profile"), 700);
    } catch (err) {
      setMsg({ type: "error", text: err.response?.data?.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2 className="card-title">Welcome back</h2>
      <p className="card-sub">Sign in to access your profile</p>

      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span className="label">Email</span>
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@company.com" required />
        </label>

        <label className="field">
          <span className="label">Password</span>
          <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="••••••••" required />
        </label>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>

        {msg && <div className={`msg ${msg.type === "error" ? "msg-error" : "msg-success"}`}>{msg.text}</div>}
      </form>

      <div className="help-row">
        <small>
          New here? <a href="/register">Create an account</a>
        </small>
      </div>
    </section>
  );
}
