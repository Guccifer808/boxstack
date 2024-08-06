'use client'

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { motion, MotionConfig, useReducedMotion } from 'framer-motion'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { GridPattern } from '@/components/GridPattern'
import { Logo } from '@/components/Logo'
import { Offices } from '@/components/Offices'
import ChangeLocale from './ChangeLocale'
import { useTranslation } from '@/lib/hooks/useTranslation'
import BackToTopButton from './BackToTopButton'

const RootLayoutContext = createContext({})

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2 6h20v2H2zM2 16h20v2H2z" />
    </svg>
  )
}

function Header({
  panelId,
  invert = false,
  icon: Icon,
  expanded,
  onToggle,
  toggleRef,
  params,
}) {
  let { logoHovered, setLogoHovered } = useContext(RootLayoutContext)
  const t = useTranslation(params.lang)
  return (
    <Container>
      <div className="flex items-center justify-between">
        <Link
          href={`/${params.lang}/`}
          aria-label="Home"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <Logo
            className="h-28 w-24 sm:block sm:h-32 sm:w-32"
            invert={invert}
            filled={logoHovered}
          />
        </Link>

        <div className="flex items-center gap-x-3 lg:gap-x-4">
          <ChangeLocale />
          <Button href={`/${params.lang}/contact`} invert={invert}>
            {t('header.contact')}
          </Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={onToggle}
            aria-expanded={expanded.toString()}
            aria-controls={panelId}
            className={clsx(
              'group -m-2.5 rounded-full p-2 transition focus:outline-none',
              invert ? 'hover:bg-white/10' : 'hover:bg-blue-950/10'
            )}
            aria-label="Toggle navigation"
          >
            <Icon
              className={clsx(
                ' h-8 w-8 focus:outline-none',
                // rounded-full border-2 border-blue-950 p-[-4]
                invert
                  ? 'fill-white group-hover:fill-blue-200'
                  : 'fill-blue-950 group-hover:fill-blue-700'
              )}
            />
          </button>
        </div>
      </div>
    </Container>
  )
}

function NavigationRow({ children }) {
  return (
    <div className="even:mt-px sm:bg-blue-950">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
      </Container>
    </div>
  )
}

function NavigationItem({ href, children }) {
  return (
    <Link
      href={href}
      className="group relative isolate -mx-6 bg-blue-950 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-blue-800 sm:even:pl-16"
    >
      {children}
      <span className="absolute inset-y-0 -z-10 w-screen bg-blue-900 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
    </Link>
  )
}

function Navigation({ params }) {
  const t = useTranslation(params.lang)
  return (
    <nav className="mt-px font-display text-5xl font-medium tracking-tight text-white">
      <NavigationRow>
        <NavigationItem href={`/${params.lang}/brands`}>
          {t('header.brands')}
        </NavigationItem>
        <NavigationItem href={`/${params.lang}/about`}>
          {t('header.about')}
        </NavigationItem>
      </NavigationRow>
      <NavigationRow>
        <NavigationItem href={`/${params.lang}/process`}>
          {t('header.files')}
        </NavigationItem>
        <NavigationItem href={`/${params.lang}/files`}>
          {t('header.contact')}
        </NavigationItem>
      </NavigationRow>
    </nav>
  )
}

function RootLayoutInner({ children, params }) {
  let panelId = useId()
  let [expanded, setExpanded] = useState(false)
  let openRef = useRef()
  let closeRef = useRef()
  let navRef = useRef()
  let shouldReduceMotion = useReducedMotion()
  const t = useTranslation(params.lang)

  useEffect(() => {
    function onClick(event) {
      if (event.target.closest('a')?.href === window.location.href) {
        setExpanded(false)
      }
    }

    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
      <header>
        <div
          className="absolute left-0 right-0 top-2 z-40 pt-14"
          aria-hidden={expanded ? 'true' : undefined}
          inert={expanded ? '' : undefined}
        >
          <Header
            params={params}
            panelId={panelId}
            icon={MenuIcon}
            toggleRef={openRef}
            expanded={expanded}
            onToggle={() => {
              setExpanded((expanded) => !expanded)
              window.setTimeout(() =>
                closeRef.current?.focus({ preventScroll: true })
              )
            }}
          />
        </div>

        <motion.div
          layout
          id={panelId}
          style={{ height: expanded ? 'auto' : '0.5rem' }}
          className="relative z-50 overflow-hidden bg-blue-950 pt-2"
          aria-hidden={expanded ? undefined : 'true'}
          inert={expanded ? undefined : ''}
        >
          <motion.div layout className="bg-blue-800">
            <div ref={navRef} className="bg-blue-950 pb-16 pt-14">
              <Header
                params={params}
                invert
                panelId={panelId}
                icon={XIcon}
                toggleRef={closeRef}
                expanded={expanded}
                onToggle={() => {
                  setExpanded((expanded) => !expanded)
                  window.setTimeout(() =>
                    openRef.current?.focus({ preventScroll: true })
                  )
                }}
              />
            </div>
            <Navigation params={params} />
            <div className="relative bg-blue-950 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-blue-800">
              <Container>
                <div className="grid grid-cols-1 gap-y-10 pb-16 pt-10 sm:grid-cols-2 sm:pt-16">
                  <div>
                    <h2 className="font-display text-base font-semibold text-white">
                      {t('header.officeHeading')}
                    </h2>
                    <Offices
                      invert
                      className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
                      params={params}
                    />
                  </div>
                </div>
              </Container>
            </div>
          </motion.div>
        </motion.div>
      </header>

      <motion.div
        layout
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="relative flex flex-auto overflow-hidden bg-white pt-14"
      >
        <motion.div
          layout
          className="relative isolate flex w-full flex-col pt-9"
        >
          <GridPattern
            className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-blue-50 stroke-blue-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
            yOffset={-96}
            interactive
          />

          <main className="w-full flex-auto">{children}</main>

          <Footer params={params} />
        </motion.div>
      </motion.div>
    </MotionConfig>
  )
}

export function RootLayout({ children, params }) {
  let pathname = usePathname()
  let [logoHovered, setLogoHovered] = useState(false)

  return (
    <RootLayoutContext.Provider value={{ logoHovered, setLogoHovered }}>
      <RootLayoutInner key={pathname} params={params}>
        {children}
      </RootLayoutInner>
      <BackToTopButton />
    </RootLayoutContext.Provider>
  )
}
