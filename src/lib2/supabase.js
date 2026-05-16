import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://jkvlzbdvpkfxbjnxgeil.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprdHVwdmd6dGZ6Z25hd3ZsYXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4ODg4NjYsImV4cCI6MjA5NDQ2NDg2Nn0.2OEApGXkW8pu3yyzkyO4DhubazKOOp-Gflhj8yerNwE'
)