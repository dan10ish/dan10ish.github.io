import 'server-only'
import { unstable_cache, revalidateTag } from 'next/cache'
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

const fetchTILEntries = async (): Promise<TILEntry[]> => {
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

export const getTILEntries = unstable_cache(fetchTILEntries, ['til-entries'], {
    revalidate: 300,
    tags: ['til-entries'],
})

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
    revalidateTag('til-entries', 'max')
    return data
}
