export interface SanityImage {
  _type?: 'image' | 'seoImage'
  _key?: string
  alt?: string
  url?: string
  asset?: { _ref?: string; _type?: string; url?: string }
}

export interface SanityButton {
  _key: string
  _type?: 'button'
  text?: string
  link?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'orange' | 'white' | 'ghost' | 'black'
}

export interface HeroSection {
  _type: 'hero'
  _key: string
  title?: string
  subtext?: string
  accentText?: string
  buttons?: SanityButton[]
}

export interface ContentBlockHeading {
  _type: 'contentBlockHeading'
  _key: string
  title?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  align?: 'left' | 'center' | 'right'
}

export interface ContentBlockText {
  _type: 'contentBlockText'
  _key: string
  text?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'left' | 'center' | 'right'
}

export interface ContentBlockButton {
  _type: 'contentBlockButton'
  _key: string
  align?: 'left' | 'center' | 'right'
  button?: {
    text?: string
    link?: string
    openInNewTab?: boolean
    size?: 'sm' | 'md' | 'lg' | 'xl'
    variant?: string
  }
}

export interface ContentBlockCard {
  _type: 'contentBlockCard'
  _key?: string
  title?: string
  text?: string
  image?: { url?: string; alt?: string }
  button?: {
    text?: string
    link?: string
    openInNewTab?: boolean
    size?: string
    variant?: string
  }
}

export interface ContentBlockCards {
  _type: 'contentBlockCards'
  _key: string
  sectionHeading?: string
  cards?: ContentBlockCard[]
}

export interface CallToActionSection {
  _type: 'callToAction'
  _key: string
  heading?: string
  supportingText?: string
  variant?: 'primary' | 'secondary'
  actions?: SanityButton[]
}

export type PageBuilderSection =
  | HeroSection
  | ContentBlockHeading
  | ContentBlockText
  | ContentBlockButton
  | ContentBlockCard
  | ContentBlockCards
  | CallToActionSection

export interface SanityMetadata {
  title?: string
  description?: string
  keywords?: string[]
  openGraph?: {
    title?: string
    description?: string
    locale?: string
    image?: SanityImage
  }
}

export interface SanityPage {
  _id: string
  _type: 'page'
  name?: string
  slug?: { current: string }
  pageBuilder?: PageBuilderSection[]
  metadata?: SanityMetadata
}

export interface SanityPost {
  _id: string
  _type: 'post'
  title?: string
  slug?: { current: string }
  category?: string
  author?: string
  authorImage?: string
  mainImage?: {
    asset?: { _ref?: string; _type?: string; url?: string }
    alt?: string
  }
  publishedAt?: string
  excerpt?: string
  body?: unknown[]
}

export interface NavItem {
  label?: string
  url?: string
  isExternal?: boolean
}

export interface SocialLink {
  platform?: string
  url?: string
}

export interface FooterColumn {
  title?: string
  links?: NavItem[]
}

export interface SanitySiteSettings {
  siteName?: string
  logoPath?: string
  logoAlt?: string
  mainNavigation?: NavItem[]
  headerSocialLinks?: SocialLink[]
  headerCtaText?: string
  headerCtaLink?: string
  footerDescription?: string
  footerColumns?: FooterColumn[]
  footerSocialLinks?: SocialLink[]
  footerBadgeImage?: string
  footerCopyright?: string
}
