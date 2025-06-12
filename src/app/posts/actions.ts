'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    platforms: formData.getAll('platforms') as string[],
    user_id: user.id,
  }

  const { error } = await supabase.from('posts').insert(data)

  if (error) {
    console.error('Error creating post:', error)
    // Optionally, redirect with an error message
    return redirect('/posts/new?error=Could not create post')
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
} 