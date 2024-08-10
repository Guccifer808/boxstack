'use client'

import { FadeIn, FadeInStagger } from './FadeIn'
import { Button } from './Button'
import { Container } from './Container'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { SectionIntro } from './SectionIntro'
import { constructHref } from '@/lib/constructHref'
import BrandsCard from './BrandsCard'

function BrandsSection({ brands, params }) {
  const t = useTranslation(params.lang)

  return (
    <>
      <SectionIntro
        eyebrow={t('header.brands')}
        title={t('homePage.brandsTitle')}
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>{t('homePage.brandsSubtitle')}</p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {brands?.map((brand) => (
            <FadeIn key={brand.href} className="flex">
              <BrandsCard brand={brand} t={t} lang={params.lang} />
            </FadeIn>
          ))}
        </FadeInStagger>
        <div className="mt-16 flex items-center justify-center">
          <Button href={constructHref(params.lang, '/brands')}>
            {t('buttons.viewAll')}
          </Button>
        </div>
      </Container>
    </>
  )
}

export default BrandsSection
