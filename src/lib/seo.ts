import type { Metadata } from 'next'

export const siteName = 'Porto Talent'
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portotalent.com.br'
export const defaultSeoDescription =
  'Consultoria de recrutamento personalizada para empresas que querem contratar com assertividade. Curadoria de candidatos e avaliação comportamental. João Pessoa e região.'
export const defaultOgImage = '/og-image.png'

type SeoConfig = {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path
  return new URL(path, siteUrl).toString()
}

export function createMetadata({
  title = 'Porto Talent | Consultoria de Recrutamento e Seleção em João Pessoa',
  description = defaultSeoDescription,
  path = '/',
  image = defaultOgImage,
  noIndex = false,
}: SeoConfig = {}): Metadata {
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(image)

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    applicationName: siteName,
    manifest: '/manifest.webmanifest',
    creator: siteName,
    publisher: siteName,
    category: 'recrutamento e seleção',
    keywords: [
      'consultoria de recrutamento',
      'recrutamento e seleção',
      'Porto Talent',
      'João Pessoa',
      'contratação assertiva',
      'curadoria de candidatos',
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: 'website',
      locale: 'pt_BR',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  }
}
