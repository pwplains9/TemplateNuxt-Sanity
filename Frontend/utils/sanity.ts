import type { SanityPost } from '~/types/sanity'

/**
 * Извлекает URL изображения из Sanity post/mainImage
 */
export function getImageUrl(post: SanityPost): string | null {
  const img = post.mainImage
  if (img?.asset?.url) return img.asset.url
  if (img && 'url' in img && typeof (img as { url?: string }).url === 'string') {
    return (img as { url: string }).url
  }
  return null
}
