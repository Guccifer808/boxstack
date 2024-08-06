import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoMSG from '@/images/logoMSG.svg'
import imageServices from '@/images/servicesMSGFinal.png'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { constructHref } from '@/lib/constructHref'
import { Button } from '@/components/Button'
import { loadBrandData } from '@/lib/loadBrandsData'
import Image from 'next/image'
import BrandsSection from '@/components/BrandsSection'
import { StatList, StatListItem } from '@/components/StatList'
import { Culture } from './about/page'
import { PageIntro } from '@/components/PageIntro'
import { getYearsOfService } from '@/lib/getYearsOfService'
import { GridPattern } from '@/components/GridPattern'
import SimpleSlider from '@/components/SimpleSlider'
import { allBrandsData } from '@/data/allBrandsData'

const clients = await loadBrandData('data')

function Clients({ params }) {
  const t = useTranslation(params.lang)
  return (
    <div className="mt-24 rounded-4xl bg-blue-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-md text-center font-display font-semibold tracking-wider text-white sm:text-left">
            {t('brandsHeading')}
          </h2>
          <div className="h-px flex-auto bg-blue-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {clients.map((client) => (
              <li
                key={client.id}
                className="flex flex-col items-start justify-center"
              >
                <FadeIn>
                  <Link
                    href={constructHref(params.lang, `/brands/${client.id}`)}
                  >
                    <Image
                      {...client.logo}
                      className="object-contain"
                      alt={client?.client}
                    />
                  </Link>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function Brands({ brands, params }) {
  return (
    <>
      <BrandsSection brands={brands} params={params} />
    </>
  )
}

function Services({ params }) {
  const t = useTranslation(params.lang)
  return (
    <section>
      {/* <div className="absolute inset-x-0 right-0 top-0 -z-10 h-[5084px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-white to-white lg:right-[-450px]">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div> */}
      <SectionIntro
        eyebrow={t('homePage.servicesEyebrow')}
        title={t('homePage.servicesTitle')}
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>{t('homePage.servicesSubtitle')}</p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageServices}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title={t('homePage.servicesOneTitle')}>
              {t('homePage.servicesOneDesc')}
            </ListItem>
            <ListItem title={t('homePage.servicesTwoTitle')}>
              {t('homePage.servicesTwoDesc')}
            </ListItem>
            <ListItem title={t('homePage.servicesThreeTitle')}>
              {t('homePage.servicesThreeDesc')}
            </ListItem>
            <ListItem title={t('homePage.servicesFourTitle')}>
              {t('homePage.servicesFourDesc')}
            </ListItem>
            <ListItem title={t('homePage.servicesFiveTitle')}>
              {t('homePage.servicesFiveDesc')}
            </ListItem>
            <ListItem title={t('homePage.servicesSixTitle')}>
              {t('homePage.servicesSixDesc')}
            </ListItem>
            <ListItem title={t('homePage.servicesSevenTitle')}>
              {t('homePage.servicesSevenDesc')}
            </ListItem>
          </List>
        </div>
      </Container>
    </section>
  )
}

export const metadata = {
  description:
    'Медичні інновації: обладнання для забезпечення найвищого стандарту догляду та діагностики.',
}

function Deliver() {
  return (
    <Section title="Deliver" image={{ src: imageMeeting, shape: 2 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          About halfway through the Build phase, we push each project out by 6
          weeks due to a change in{' '}
          <strong className="font-semibold text-neutral-950">
            requirements
          </strong>
          . This allows us to increase the budget a final time before launch.
        </p>
        <p>
          Despite largely using pre-built components, most of the{' '}
          <strong className="font-semibold text-neutral-950">progress</strong>{' '}
          on each project takes place in the final 24 hours. The development
          time allocated to each client is actually spent making augmented
          reality demos that go viral on Twitter.
        </p>
        <p>
          We ensure that the main pages of the site are{' '}
          <strong className="font-semibold text-neutral-950">
            fully functional
          </strong>{' '}
          at launch — the auxiliary pages will, of course, be lorem ipusm shells
          which get updated as part of our exorbitant{' '}
          <strong className="font-semibold text-neutral-950">
            maintenance
          </strong>{' '}
          retainer.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <List className="mt-8">
        <ListItem title="Testing">
          Our projects always have 100% test coverage, which would be impressive
          if our tests weren’t as porous as a sieve.
        </ListItem>
        <ListItem title="Infrastructure">
          To ensure reliability we only use the best Digital Ocean droplets that
          $4 a month can buy.
        </ListItem>
        <ListItem title="Support">
          Because we hold the API keys for every critical service your business
          uses, you can expect a lifetime of support, and invoices, from us.
        </ListItem>
      </List>
    </Section>
  )
}
function Section({ title, image, children }) {
  return (
    <Container className="group/section mt-16 [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}
function Build() {
  return (
    <Section title="Build" image={{ src: imageServices, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600 ">
        <p>
          About halfway through the Build phase, we push each project out by 6
          weeks due to a change in{' '}
          <strong className="font-semibold text-neutral-950">
            requirements
          </strong>
          . This allows us to increase the budget a final time before launch.
        </p>
        <p>
          Despite largely using pre-built components, most of the{' '}
          <strong className="font-semibold text-neutral-950">progress</strong>{' '}
          on each project takes place in the final 24 hours. The development
          time allocated to each client is actually spent making augmented
          reality demos that go viral on Twitter.
        </p>
        <p>
          We ensure that the main pages of the site are{' '}
          <strong className="font-semibold text-neutral-950">
            fully functional
          </strong>{' '}
          at launch — the auxiliary pages will, of course, be lorem ipusm shells
          which get updated as part of our exorbitant{' '}
          <strong className="font-semibold text-neutral-950">
            maintenance
          </strong>{' '}
          retainer.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <List className="mt-8">
        <ListItem title="Testing">
          Our projects always have 100% test coverage, which would be impressive
          if our tests weren’t as porous as a sieve.
        </ListItem>
        <ListItem title="Infrastructure">
          To ensure reliability we only use the best Digital Ocean droplets that
          $4 a month can buy.
        </ListItem>
        <ListItem title="Support">
          Because we hold the API keys for every critical service your business
          uses, you can expect a lifetime of support, and invoices, from us.
        </ListItem>
      </List>
    </Section>
  )
}
import novosSlide1 from '@/images/brandsImages/novosSlide1.jpg'
import medraySlide2 from '@/images/brandsImages/medraySlide2.png'
import codonicsSlide1 from '@/images/brandsImages/codonicsSlide1.png'
import novosSlide5 from '@/images/brandsImages/novosSlide5.jpg'
import aeonmedSlide1 from '@/images/brandsImages/aeonmedSlide1.png'
import prunusSlide1 from '@/images/brandsImages/prunusSlide1.png'

export default async function Home({ params }) {
  const t = useTranslation(params.lang)
  const allBrands = await loadBrandData('data')
  const brands = allBrands.slice(0, 6)
  const yearsOfService = getYearsOfService()

  const slides = [
    novosSlide1,
    novosSlide5,
    medraySlide2,
    codonicsSlide1,
    aeonmedSlide1,
    prunusSlide1,
  ]
  return (
    <>
      <section className="h-1000">
        <Container className="mb-14 mt-24 sm:mt-32 md:mb-72 md:mt-56">
          <FadeIn className=" max-w-4xl">
            <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
              {t('homePage.heroTitle')}
            </h1>
            <p className="mt-6 text-xl text-neutral-600">
              {t('homePage.heroSubtitle')}
            </p>
          </FadeIn>
        </Container>
        <SimpleSlider
          slides={slides}
          className="relative -mb-14 mt-10 rounded rounded-b-lg bg-blue-950 sm:-mb-20 sm:mt-14 md:-mt-24"
          showArrows={true}
        />
      </section>
      <Culture params={params} />
      {/* <div className="mt-24 sm:mt-32 md:mt-56"> */}
      <div className="relative ">
        <div className="absolute inset-x-0 -top-24 right-0 -z-10 h-[5500px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-white to-white lg:-top-40 lg:right-[-450px]">
          <GridPattern
            className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
            yOffset={-270}
          />
        </div>
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
      </div>
      {/* </div> */}
      <Container className="mt-16 ">
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

      <Services params={params} />
      {/* <div className="mt-24 sm:mt-32 lg:mt-40"> */}
      {/* <Build /> */}
      {/* </div> */}

      <Clients params={params} />

      <Brands params={params} brands={brands} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ logo: logoMSG }}
      >
        {t('testimonial')}
      </Testimonial>
      <ContactSection params={params} />
    </>
  )
}
