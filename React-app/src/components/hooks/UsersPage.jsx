import { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

function UsersPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const [profile, setProfile] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const buildPageUrl = (pageNumber) => `${API_BASE_URL}/users/?page=${pageNumber}`;

  const loadUsers = async (pageNumberOrUrl = 1) => {
    const target = typeof pageNumberOrUrl === 'string' ? pageNumberOrUrl : buildPageUrl(pageNumberOrUrl);
    setLoading(true);
    setStatus('');
    try {
      const response = await fetch(target);
      if (!response.ok) throw new Error('Request failed');
      const data = await response.json();
      setUsers(data.results);
      setCount(data.count);
      setPage(data.page ?? (typeof pageNumberOrUrl === 'number' ? pageNumberOrUrl : page));
      setPageSize(data.page_size || 5);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
    } catch (error) {
      setStatus('Could not fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) throw new Error('bad credentials');
      const data = await response.json();
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      setStatus('Tokens ready! Click "Fetch my profile".');
    } catch (error) {
      setStatus('Wrong username or password');
      setAccessToken('');
      setRefreshToken('');
    } finally {
      setLoading(false);
    }
  };

  const loadProfile = async () => {
    if (!accessToken) {
      setStatus('Generate tokens first.');
      return;
    }

    setLoading(true);
    setStatus('');
    try {
      const response = await fetch(`${API_BASE_URL}/users/me/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error('bad token');
      const data = await response.json();
      setProfile(data);
    } catch (_error) {
      setStatus('Access token expired or invalid');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(1);
  }, []);

  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  return (
    <div style={{ padding: '1rem' }}>
      <h2>React ↔ Django demo</h2>
      <p>This page keeps the flow short: get a token, fetch your profile, list users.</p>

      <form onSubmit={handleLogin} style={{ marginBottom: '1rem' }}>
        <h3>1. Get a token</h3>
        <label>
          Username:
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit" disabled={loading}>Login</button>
        {accessToken && (
          <p>
            Access token (truncated): {accessToken.slice(0, 24)}…
          </p>
        )}
      </form>

      <div style={{ marginBottom: '1rem' }}>
        <h3>2. Use that token</h3>
        <button type="button" onClick={loadProfile} disabled={loading}>
          Fetch my profile
        </button>
        {profile && (
          <pre style={{ background: '#f3f3f3', padding: '0.5rem' }}>
            {JSON.stringify(profile, null, 2)}
          </pre>
        )}
      </div>

      <div>
        <h3>3. Paginated users</h3>
        <button
          type="button"
          onClick={() => loadUsers(prevUrl || buildPageUrl(page - 1))}
          disabled={loading || (!prevUrl && page === 1)}
        >
          Prev
        </button>
        <span style={{ margin: '0 0.5rem' }}>
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => loadUsers(nextUrl || buildPageUrl(page + 1))}
          disabled={loading || !nextUrl}
        >
          Next
        </button>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              #{user.id} {user.username} ({user.email || 'no email'})
            </li>
          ))}
        </ul>
      </div>

      {status && <p>{status}</p>}
    </div>
  );
}

export default UsersPage;