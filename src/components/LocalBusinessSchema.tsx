import { absoluteUrl, siteName } from '@/lib/seo'

export default function LocalBusinessSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteName,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/brand/porto-talent-logo.png'),
    image: absoluteUrl('/og-image.png'),
    telephone: '+55 83 8752-3450',
    areaServed: ['João Pessoa', 'Paraíba', 'Brasil'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Manoel Medeiros Guedes, 12, sala 201, Manaíra',
      addressLocality: 'João Pessoa',
      addressRegion: 'PB',
      postalCode: '58038-360',
      addressCountry: 'BR',
    },
    sameAs: ['https://wa.me/558387523450'],
    serviceType: 'Consultoria de recrutamento e seleção',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
