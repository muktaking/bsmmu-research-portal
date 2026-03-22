'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(
        'http://localhost:5000/authentication/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          // CRITICAL: This allows the browser to receive and store the HttpOnly cookie
          credentials: 'include',
        },
      );

      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        const errData = await response.json();
        setError(errData.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred while connecting to the server.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-96 rounded border p-8 shadow-md"
      >
        <h2 className="mb-4 text-2xl font-bold">Sign In</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border p-2 text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded border p-2 text-black"
          required
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
