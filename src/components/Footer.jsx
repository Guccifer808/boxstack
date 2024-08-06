import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { constructHref } from '@/lib/constructHref'

import logoISO from '@/images/certificates/svgISO.svg'
import logoFDA from '@/images/certificates/svgFDA.svg'
import logoIQS from '@/images/certificates/logoIQS.png'
import logoTUV from '@/images/certificates/svgTUV.svg'
import logoCFDA from '@/images/certificates/svgCFDA.svg'
import Image from 'next/image'

const navigation = [
  {
    title: 'footer.titleBrands',
    links: [
      { title: 'Codonics', href: '/brands/codonics' },
      { title: 'Bowa', href: '/brands/bowa' },
      { title: 'Tontarra', href: '/brands/tontarra' },
      { title: 'Gemss', href: '/brands/gemss' },
      {
        title: (
          <>
            <span aria-hidden="true">&rarr;</span>
          </>
        ),
        href: '/brands',
      },
    ],
  },
  {
    title: 'footer.titleCompany',
    links: [
      { title: 'footer.brands', href: '/brands' },
      { title: 'footer.aboutUs', href: '/about' },
      // { title: 'footer.process', href: '/process' },
      { title: 'footer.files', href: '/files' },
      { title: 'footer.contact', href: '/contact' },
    ],
  },
]

function Navigation({ params }) {
  const t = useTranslation(params.lang)
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {navigation.map((section) => (
          <li key={section.title}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
              {t(section.title)}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link) => (
                <li key={link.title} className="mt-4">
                  <Link
                    href={constructHref(params.lang, link.href)}
                    className="transition hover:text-neutral-950"
                  >
                    {typeof link.title === 'string' ? (
                      t(link.title)
                    ) : (
                      <>
                        {t('buttons.allBrands')}
                        <span aria-hidden="true">&rarr;</span>
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

function NewsletterForm({ params }) {
  const t = useTranslation(params.lang)
  // Firebase or discuss another CRM/BaaS
  return (
    <form className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        {t('footer.newsletterTitle')}
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        {t('footer.newsletterSubtitle')}
      </p>
      <div className="relative mt-6">
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          aria-label="Email address"
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-blue-950 text-white transition hover:bg-blue-800"
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
    </form>
  )
}

const certificates = [
  { name: 'ISO 9001:2015', logo: logoISO },
  { name: 'ISO IQS', logo: logoIQS },
  { name: 'CFDA', logo: logoCFDA },
  { name: 'ISO TUV', logo: logoTUV },
  { name: 'ISO FDA', logo: logoFDA },
]
const Certificates = () => {
  return (
    <>
      {certificates.map(({ name, logo }) => {
        return (
          <div className="" key={name}>
            <Image
              src={logo}
              alt={name}
              className="h-12 w-12 rounded-lg lg:h-14 lg:w-16"
              width={1000}
              height={1000}
              unoptimized
            />
          </div>
        )
      })}
    </>
  )
}

export function Footer({ params }) {
  const t = useTranslation(params.lang)
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation params={params} />
          <div className="flex lg:justify-end">
            <NewsletterForm params={params} />
          </div>
        </div>

        <div className="mb-10 mt-24 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="Home">
            <Logo className="h-24 w-24 sm:block sm:h-32 sm:w-32" fillOnHover />
          </Link>
          <div className="mb-2 flex flex-wrap items-center justify-center gap-x-4">
            <Certificates />
          </div>
          <p className="text-sm text-neutral-700">
            © {t('footer.copyright')} {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
