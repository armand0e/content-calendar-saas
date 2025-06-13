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

  // Process hashtags
  const hashtagsInput = formData.get('hashtags') as string
  const hashtags = hashtagsInput 
    ? hashtagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    : []

  // Process scheduling
  const scheduledDate = formData.get('scheduled_date') as string
  const scheduledTime = formData.get('scheduled_time') as string
  let scheduledAt = null
  let status = 'draft'

  if (scheduledDate && scheduledTime) {
    scheduledAt = new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
    status = 'scheduled'
  }

  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    platforms: formData.getAll('platforms') as string[],
    hashtags,
    scheduled_at: scheduledAt,
    status,
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

export async function updatePost(postId: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Process hashtags
  const hashtagsInput = formData.get('hashtags') as string
  const hashtags = hashtagsInput 
    ? hashtagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    : []

  // Process scheduling
  const scheduledDate = formData.get('scheduled_date') as string
  const scheduledTime = formData.get('scheduled_time') as string
  let scheduledAt = null
  let status = 'draft'

  if (scheduledDate && scheduledTime) {
    scheduledAt = new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
    status = 'scheduled'
  } else if (scheduledDate) {
    scheduledAt = new Date(`${scheduledDate}T09:00`).toISOString()
    status = 'scheduled'
  }

  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    platforms: formData.getAll('platforms') as string[],
    hashtags,
    scheduled_at: scheduledAt,
    status,
    updated_at: new Date().toISOString()
  }

  const { error } = await supabase
    .from('posts')
    .update(data)
    .eq('id', postId)
    .eq('user_id', user.id) // Ensure user can only update their own posts

  if (error) {
    console.error('Error updating post:', error)
    throw new Error('Failed to update post')
  }

  revalidatePath('/posts')
}

export async function deletePost(postId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)
    .eq('user_id', user.id) // Ensure user can only delete their own posts

  if (error) {
    console.error('Error deleting post:', error)
    throw new Error('Failed to delete post')
  }

  revalidatePath('/posts')
}

export async function duplicatePost(postId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // First, get the original post
  const { data: originalPost, error: fetchError } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .eq('user_id', user.id)
    .single()

  if (fetchError || !originalPost) {
    console.error('Error fetching post for duplication:', fetchError)
    throw new Error('Failed to fetch post for duplication')
  }

  // Create a duplicate with modified title
  const { error: insertError } = await supabase
    .from('posts')
    .insert({
      title: `${originalPost.title} (Copy)`,
      content: originalPost.content,
      platforms: originalPost.platforms,
      hashtags: originalPost.hashtags,
      status: 'draft', // Always create duplicates as drafts
      scheduled_at: null, // Clear scheduling for duplicates
      user_id: user.id
    })

  if (insertError) {
    console.error('Error duplicating post:', insertError)
    throw new Error('Failed to duplicate post')
  }

  revalidatePath('/posts')
} 