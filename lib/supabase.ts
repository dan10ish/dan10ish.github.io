import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface TILEntry {
  id: string
  date: string
  content_type: 'tweet' | 'text' | 'link' | 'youtube' | 'book' | 'image'
  content: string
  metadata?: {
    title?: string
    author?: string
    description?: string
    image?: string
  }
  created_at: string
}

export async function getTILEntries(): Promise<TILEntry[]> {
  const { data, error } = await supabase
    .from('til_entries')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching TIL entries:', error)
    return []
  }
  
  return data || []
}

export async function addTILEntry(entry: Omit<TILEntry, 'id' | 'created_at'>): Promise<TILEntry | null> {
  const { data, error } = await supabase
    .from('til_entries')
    .insert([entry])
    .select()
    .single()
  
  if (error) {
    console.error('Error adding TIL entry:', error)
    return null
  }
  
  return data
}

