import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'

const supabaseUrl = 'https://hpaoixvvpdcwykduumam.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYW9peHZ2cGRjd3lrZHV1bWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MDgzMzcsImV4cCI6MjA4ODI4NDMzN30.eSqZfP99QkAi52uZ1bVP2oPtcd2siy_eb_toWQEPIvY'

export const supabase = createClient(supabaseUrl, supabaseKey)
