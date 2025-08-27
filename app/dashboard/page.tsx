'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ProductUploadForm from '../components/ProductUploadForm';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      } else {
        router.push('/login');
      }
    });
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 800, margin: 'auto' }}>
      <h1>Welcome, {user.email}</h1>
      <ProductUploadForm user={user} />
    </div>
  );
}
