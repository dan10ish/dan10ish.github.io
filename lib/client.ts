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

let cachedEntries: TILEntry[] | null = null
let cacheTime = 0
const CACHE_DURATION = 60000 // 1 minute

export async function getTILEntries(): Promise<TILEntry[]> {
    const now = Date.now()
    if (cachedEntries && (now - cacheTime) < CACHE_DURATION) {
        return cachedEntries
    }

    const { data, error } = await supabase
        .from('til_entries')
        .select('*')
        .order('created_at', { ascending: false })
    if (error) {
        console.error('Error fetching TIL entries:', error)
        return cachedEntries || []
    }
    cachedEntries = data || []
    cacheTime = now
    return cachedEntries
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
