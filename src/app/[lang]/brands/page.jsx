import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Testimonial } from '@/components/Testimonial'
import logoMSG from '@/images/logoMSG.svg'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { constructHref } from '@/lib/constructHref'
import LogoTypography from '@/components/LogoTypography'
import { loadBrandData } from '@/lib/loadBrandsData'
import Image from 'next/image'

function CaseStudies({ caseStudies, params }) {
  const t = useTranslation(params.lang)
  return (
    <Container className="mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          {t('brandsPage.brandsSectionHeading')}
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
        {caseStudies?.map((caseStudy) => (
          <FadeIn key={caseStudy?.client}>
            <article>
              <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
                <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                  <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                    <Link href={constructHref(params.lang, caseStudy?.href)}>
                      {/* <LogoTypography>{caseStudy?.logo}</LogoTypography> */}
                      <Image
                        {...caseStudy.logo}
                        className="object-contain"
                        alt={caseStudy?.client}
                      />
                    </Link>
                    <h3 className="mt-6 text-sm font-semibold text-neutral-950 sm:mt-0 lg:mt-8">
                      <Link href={constructHref(params.lang, caseStudy?.href)}>
                        {t(caseStudy?.client)}
                      </Link>
                    </h3>
                  </div>
                  <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                    <p className="text-sm tracking-tight text-neutral-950 after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden">
                      {t(caseStudy?.service)}
                    </p>
                    <p className="text-sm tracking-tight text-neutral-950 after:ml-4 after:font-semibold after:text-neutral-300 lg:mt-2 ">
                      {t(caseStudy?.date)}
                    </p>
                  </div>
                </div>
                <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
                  <p className="font-display text-4xl font-medium text-neutral-950">
                    <Link href={constructHref(params.lang, caseStudy?.href)}>
                      {/* {t(caseStudy.title)} */}
                    </Link>
                  </p>
                  <div className="mt-6 line-clamp-3 space-y-6 text-base text-neutral-600">
                    <p>{t(caseStudy?.overview)}</p>
                  </div>
                  <div className="mt-8 flex">
                    <Button
                      href={constructHref(params.lang, caseStudy?.href)}
                      aria-label={`Read case study: ${caseStudy?.client}`}
                    >
                      {t('brandsPage.buttonReadMore')}
                    </Button>
                  </div>
                </div>
              </Border>
            </article>
          </FadeIn>
        ))}
      </div>
    </Container>
  )
}

const clients = await loadBrandData('names')

function Clients({ params }) {
  const t = useTranslation(params.lang)
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40 ">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          {t('brandsHeading')}
        </h2>
      </FadeIn>
      <FadeInStagger className="mt-10" faster>
        <Border as={FadeIn} />
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
        >
          {clients.map(([client]) => (
            <li key={client} className="group">
              <FadeIn className="overflow-hidden">
                <Border className="pt-12 group-[&:nth-child(-n+2)]:-mt-px sm:group-[&:nth-child(3)]:-mt-px lg:group-[&:nth-child(4)]:-mt-px">
                  <LogoTypography>{client}</LogoTypography>
                </Border>
              </FadeIn>
            </li>
          ))}
        </ul>
      </FadeInStagger>
    </Container>
  )
}

export const metadata = {
  title: 'Our Brands',
  description: 'Brands we work with',
}

export default async function Work({ params }) {
  let caseStudies = await loadBrandData('data')
  const t = useTranslation(params.lang)
  return (
    <>
      <title>{t('metadata.brandsPageMetaTitle')}</title>
      <PageIntro
        eyebrow={t('brandsPage.brands')}
        title={t('brandsPage.brandsHeading')}
      >
        <p>{t('brandsPage.brandsDesc')}</p>
      </PageIntro>

      <CaseStudies caseStudies={caseStudies} params={params} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ logo: logoMSG }}
      >
        {t('testimonial')}
      </Testimonial>

      {/* <Clients params={params} /> */}

      <ContactSection params={params} />
    </>
  )
}
