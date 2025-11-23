import { createClient } from '@supabase/supabase-js';

// Supabase Project Configuration
const SUPABASE_PROJECT_ID = 'mtgujpbdorvrtyyjvrkh';
const supabaseUrl = `https://${SUPABASE_PROJECT_ID}.supabase.co`;

// Vite environment variable kullanımı
// .env dosyasında VITE_SUPABASE_KEY tanımlayın
// Veya Render Dashboard'da environment variable olarak ekleyin
// Supabase Dashboard → Settings → API → anon/public key
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseKey) {
  console.warn('⚠️ VITE_SUPABASE_KEY environment variable set edilmemiş! Supabase client oluşturulamıyor.');
  console.warn('⚠️ .env dosyasına VITE_SUPABASE_KEY=your_anon_key ekleyin');
  console.warn('⚠️ Supabase Dashboard → Settings → API → anon/public key');
}

const supabase = supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Export project ID for reference
export { SUPABASE_PROJECT_ID };
export default supabase;

