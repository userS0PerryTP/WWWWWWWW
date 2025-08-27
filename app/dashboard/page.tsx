import ProductUploadForm from '../components/ProductUploadForm';
import { redirect } from 'next/navigation';
import { supabaseServer } from '../lib/supabaseServer';

export default async function DashboardPage() {
  const supabase = supabaseServer();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const user = session.user;

  return (
    <div style={{ maxWidth: 800, margin: 'auto' }}>
      <h1>Welcome, {user.email}</h1>
      <ProductUploadForm user={user} />
    </div>
  );
}
