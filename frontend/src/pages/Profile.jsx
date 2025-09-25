import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      nav("/login");
      return;
    }

    axios
      .get("http://localhost:4000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
        // token expired or invalid — remove it and redirect to login
        localStorage.removeItem("token");
        nav("/login");
      })
      .finally(() => setLoading(false));
  }, [nav]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  if (loading) return <div className="card">Loading profile…</div>;
  if (!user) return <div className="card">No user found</div>;

  return (
    <section className="card profile-card">
      <div className="profile-header">
        <div className="avatar">{user.name?.[0]?.toUpperCase()}</div>
        <div>
          <h3 className="card-title">{user.name}</h3>
          <p className="muted">{user.email}</p>
        </div>
      </div>

      <div className="profile-body">
        <p><strong>User ID</strong><br />{user._id}</p>
        <p><strong>Joined</strong><br />{new Date(user.createdAt).toLocaleString()}</p>
      </div>

      <div className="profile-actions">
        <button className="btn ghost" onClick={handleLogout}>Sign out</button>
      </div>
    </section>
  );
}
