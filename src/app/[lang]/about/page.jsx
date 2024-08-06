import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'

import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'

import { getYearsOfService } from '@/lib/getYearsOfService'
import { useTranslation } from '@/lib/hooks/useTranslation'

export function Culture({ params }) {
  const t = useTranslation(params.lang)
  return (
    <div className="mt-24 rounded-4xl bg-blue-950 py-24 sm:mt-32 lg:mt-20 lg:py-32">
      <SectionIntro
        eyebrow={t('aboutPage.weGuarantee')}
        title={t('aboutPage.weGuaranteeTitle')}
        invert
      >
        <p>{t('aboutPage.weGuaranteeSubtitle')}</p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title={t('aboutPage.weGuaranteeItemOne')} invert>
            {/* {t('aboutPage.weGuaranteeItemOneDesc} */}
            {t('aboutPage.weGuaranteeItemOneDesc')}
          </GridListItem>
          <GridListItem title={t('aboutPage.weGuaranteeItemTwo')} invert>
            {t('aboutPage.weGuaranteeItemTwoDesc')}
          </GridListItem>
          <GridListItem title={t('aboutPage.weGuaranteeItemThree')} invert>
            {t('aboutPage.weGuaranteeItemThreeDesc')}
          </GridListItem>
          <GridListItem title={t('aboutPage.weGuaranteeItemFour')} invert>
            {t('aboutPage.weGuaranteeItemFourDesc')}
          </GridListItem>
          <GridListItem title={t('aboutPage.weGuaranteeItemFive')} invert>
            {t('aboutPage.weGuaranteeItemFiveDesc')}
          </GridListItem>
          <GridListItem title={t('aboutPage.weGuaranteeItemSix')} invert>
            {t('aboutPage.weGuaranteeItemSixDesc')}
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

// export const metadata = {
//   title: 'Про нас',
//   // title: useTranslation('metadata.aboutPageMetaTitle'),
//   description: 'Ваш надійний партнер у сфері передових медичних технологій',
// }

export default async function About({ params }) {
  // let blogArticles = (await loadMDXMetadata('blog')).slice(0, 2)
  const yearsOfService = getYearsOfService()

  const t = useTranslation(params.lang)

  return (
    <>
      <title>{t('metadata.aboutPageMetaTitle')}</title>
      <PageIntro
        eyebrow={t('aboutPage.aboutUs')}
        title={t('aboutPage.aboutHeading')}
      >
        <p>{t('aboutPage.aboutSubHeading')}</p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>{t('aboutPage.aboutDescOne')}</p>
          <p>{t('aboutPage.aboutDescTwo')}</p>
        </div>
      </PageIntro>
      <Container className="mt-16">
        <StatList>
          <StatListItem
            value={yearsOfService}
            label={t('aboutPage.yearsOfService')}
          />
          <StatListItem value="100+" label={t('aboutPage.amountOfProjects')} />
          <StatListItem
            value="1000+"
            label={t('aboutPage.numberOfInstallations')}
          />
        </StatList>
      </Container>

      <Culture params={params} />

      {/* <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="From the blog"
        intro="Our team of experienced designers and developers has just one thing on their mind; working on your ideas to draw a smile on the face of your users worldwide. From conducting Brand Sprints to UX Design."
        pages={blogArticles}
      /> */}

      <ContactSection params={params} />
    </>
  )
}
