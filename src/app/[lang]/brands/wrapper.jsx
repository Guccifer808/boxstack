import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import {
  GrayscaleTransitionImage,
  ImageSlider,
} from '@/components/GrayscaleTransitionImage'
import { TypographyBrands } from '@/components/MDXComponents'
import { PageIntro } from '@/components/PageIntro'
import { TagList, TagListItem } from '@/components/TagList'
import { loadBrandData } from '@/lib/loadBrandsData'
import { useTranslation } from '@/lib/hooks/useTranslation'
import SimpleSlider from '@/components/SimpleSlider'

export default async function caseStudyLayout({ children, _segments, params }) {
  let id = _segments.at(-2)

  // let moreCaseStudies = allCaseStudies
  //   .filter((caseStudy) => caseStudy.id !== id)
  //   .slice(0, 2)

  const allBrands = await loadBrandData('data')

  let caseStudy =
    allBrands && allBrands.find((caseStudy) => caseStudy.id === id)
  const t = useTranslation(params.lang)

  return (
    <>
      <article className="mt-24 sm:mt-32 lg:mt-40">
        <header>
          <PageIntro
            eyebrow={t(caseStudy?.service)}
            title={t(caseStudy?.title)}
            centered
          ></PageIntro>

          <FadeIn>
            <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40">
              <Container>
                <div className="mx-auto max-w-5xl">
                  <dl className="-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-3">
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">{t('brandsPage.brand')}</dt>
                      <dd>{t(caseStudy?.client)}</dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">{t('brandsPage.since')}</dt>
                      <dd>
                        <time dateTime={`${caseStudy?.date}`}>
                          {`${caseStudy?.date}`}
                        </time>
                      </dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">{t(caseStudy?.type)}</dt>
                      <dd>{t(`${caseStudy?.service}`)}</dd>
                    </div>
                  </dl>
                </div>
              </Container>
            </div>

            <div className="border-y border-neutral-200 bg-neutral-100">
              <div className="-my-px mx-auto max-w-[76rem] bg-neutral-100">
                {/* <ImageSlider images={[...caseStudy?.imagesSlider]} /> */}
                {caseStudy?.imagesSlider ? (
                  <SimpleSlider
                    slides={[...caseStudy?.imagesSlider]}
                    showDots={true}
                    showArrows={false}
                  />
                ) : (
                  <GrayscaleTransitionImage
                    {...caseStudy?.image}
                    quality={90}
                    className="w-full"
                    sizes="(min-width: 1216px) 76rem, 100vw"
                    priority
                  />
                )}

                {/* <ImageSlider images={[...caseStudy?.imagesSlider]} /> */}
              </div>
            </div>
          </FadeIn>
        </header>

        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            {/* <MDXComponents.wrapper>{children}</MDXComponents.wrapper> */}
            <TypographyBrands>{t(caseStudy?.overview)}</TypographyBrands>
            <TagList className="my-6">
              {caseStudy?.tags?.map((tag) => (
                <TagListItem key={tag}>{t(tag)}</TagListItem>
              ))}
            </TagList>
          </FadeIn>
        </Container>
      </article>

      <ContactSection params={params} />
    </>
  )
}
