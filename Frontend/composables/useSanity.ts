import type {
  SanityPage,
  SanityPost,
  SanitySiteSettings,
} from '~/types/sanity'

export const useSanityPage = (slug: string) => {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    metadata{
      title,
      description,
      keywords,
      openGraph{
        title,
        description,
        locale,
        image{ alt, "url": asset->url }
      }
    },
    pageBuilder[]{
      _key,
      _type,
      title,
      tag,
      size,
      align,
      subtext,
      accentText,
      buttons[]{
        _key,
        _type,
        text,
        link,
        openInNewTab,
        size,
        variant
      },
      button{
        _key,
        text,
        link,
        openInNewTab,
        size,
        variant
      },
      text,
      sectionHeading,
      cards[]{
        _key,
        title,
        text,
        image{ alt, "url": asset->url },
        button{ text, link, openInNewTab, size, variant }
      },
      heading,
      supportingText,
      variant,
      actions[]{
        _key,
        _type,
        text,
        link,
        size,
        variant
      }
    }
  }`

  const { data: page, pending, error, refresh } = useSanityQuery<SanityPage>(query, { slug })

  return { page, pending, error, refresh }
}

export const useSanitySiteSettings = () => {
  const query = `*[_type == "siteSettings"][0]{
    siteName,
    "logoPath": coalesce(logo.asset->url, logoPath),
    "logoAlt": coalesce(logo.alt, logoAlt),
    mainNavigation[]{ label, url, isExternal },
    headerSocialLinks[]{ platform, url },
    headerCtaText,
    headerCtaLink,
    footerDescription,
    footerColumns[]{ title, links[]{ label, url, isExternal } },
    footerSocialLinks[]{ platform, url },
    "footerBadgeImage": coalesce(footerBadgeImage.asset->url, footerBadgeImage),
    footerCopyright
  }`

  const { data: siteSettings, pending, error, refresh } = useSanityQuery<SanitySiteSettings>(query)

  return { siteSettings, pending, error, refresh }
}

export const useSanityData = () => {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    category,
    author,
    "authorImage": authorImage.asset->url,
    mainImage { asset-> { _id, url }, alt },
    publishedAt,
    excerpt
  }`
  const { data: posts, pending, error, refresh } = useLazySanityQuery<SanityPost[]>(query)
  return { posts, pending, error, refresh }
}

export const useSanityPost = (slug: string) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    category,
    author,
    "authorImage": authorImage.asset->url,
    mainImage { asset-> { _id, url }, alt },
    publishedAt,
    excerpt,
    body[] {
      ...,
      _type == 'image' => { ..., asset-> }
    }
  }`
  const { data: post, pending, error } = useSanityQuery<SanityPost>(query, { slug })
  return { post, pending, error }
}
