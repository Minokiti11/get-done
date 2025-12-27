import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase環境変数が設定されていません。.envファイルを作成してください。');
  console.warn('REACT_APP_SUPABASE_URL:', supabaseUrl || '未設定');
  console.warn('REACT_APP_SUPABASE_ANON_KEY:', supabaseAnonKey ? '設定済み' : '未設定');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

