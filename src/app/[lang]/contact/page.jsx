'use client'
import { useId, useState } from 'react'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { useTranslation } from '@/lib/hooks/useTranslation'
import Head from 'next/head'

function TextInput({ label, params, ...props }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-blue-950 ring-4 ring-transparent transition focus:border-blue-950 focus:outline-none focus:ring-blue-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-blue-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-blue-950"
      >
        {label}
      </label>
    </div>
  )
}

function RadioInput({ label, ...props }) {
  return (
    <label className="flex gap-x-3">
      <input
        type="radio"
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded-full border border-blue-950/20 outline-none checked:border-[0.5rem] checked:border-blue-950 focus-visible:ring-1 focus-visible:ring-blue-950 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-blue-950">{label}</span>
    </label>
  )
}

function ContactForm({ params }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      setSuccess(true)
      setFormData({ name: '', email: '', company: '', phone: '', message: '' })

      const timeoutId = setTimeout(() => {
        setSuccess(false)
        setError(false)
      }, 7000)

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timeoutId)
    } else {
      setError(true)
    }
  }
  const t = useTranslation(params.lang)

  return (
    <FadeIn className="relative lg:order-last">
      <form onSubmit={handleSubmit}>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          {t('contactForm.heading')}
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput
            label={t('contactForm.name')}
            name="name"
            autoComplete="name"
          />
          <TextInput
            // label="Email"
            label={t('contactForm.email')}
            type="email"
            name="email"
            autoComplete="email"
            onChange={handleChange}
          />
          <TextInput
            label={t('contactForm.org')}
            name="company"
            autoComplete="organization"
            onChange={handleChange}
          />
          <TextInput
            label={t('contactForm.phone')}
            type="tel"
            name="phone"
            autoComplete="tel"
            onChange={handleChange}
          />
          <TextInput
            label={t('contactForm.text')}
            name="message"
            onChange={handleChange}
          />
          {/* <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Budget</legend>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <RadioInput label="$25K – $50K" name="budget" value="25" />
                <RadioInput label="$50K – $100K" name="budget" value="50" />
                <RadioInput label="$100K – $150K" name="budget" value="100" />
                <RadioInput label="More than $150K" name="budget" value="150" />
              </div>
            </fieldset>
          </div> */}
        </div>
        <div className="mx-auto flex items-center justify-center justify-items-center">
          {success && (
            <div className="ml-2 mt-10 ">
              <SuccessMessage params={params} type="success" />
            </div>
          )}
          {error && (
            <div className="ml-2 mt-10 ">
              <SuccessMessage params={params} type="error" />
            </div>
          )}
          {!error && !success ? (
            <Button type="submit" className="mt-10">
              {t('contactForm.sendButton')}
            </Button>
          ) : null}
        </div>
      </form>
    </FadeIn>
  )
}
function SuccessMessage({ params, type }) {
  const t = useTranslation(params.lang)
  return (
    <>
      <FadeIn>
        <div
          id="toast-simple"
          className="flex w-full max-w-2xl items-center space-x-4 divide-x divide-gray-200 rounded-2xl bg-blue-950 px-4 py-2.5 text-white shadow hover:bg-blue-800 rtl:space-x-reverse rtl:divide-x-reverse dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-400"
          role="alert"
        >
          <svg
            className="h-5 w-5 rotate-45 text-neutral-100 dark:text-neutral-100"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
            />
          </svg>
          <div className="ps-4 text-sm font-normal">
            {type == 'success'
              ? t('contactForm.sendSuccess')
              : t('contactForm.sendError')}
          </div>
        </div>
      </FadeIn>
    </>
  )
}

function ContactDetails({ params }) {
  const t = useTranslation(params.lang)
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        {t('header.officeHeading')}
      </h2>
      {/* <p className="mt-6 text-base text-neutral-600">
        Prefer doing things in person? We don’t but we have to list our
        addresses here for legal reasons.
      </p> */}

      <Offices
        className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2"
        params={params}
      />

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          {t('sendEmail')}
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            [`${t('Info')}`, 'info@msg.com.ua'],
            [`${t('Press')}`, 'press@msg.com.ua'],
          ].map(([label, email]) => (
            <div key={email}>
              <dt className="font-semibold text-neutral-950">{label}</dt>
              <dd>
                <Link
                  href={`mailto:${email}`}
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  {email}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border>

      {/* <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          {t('header.socialLinks')}
        </h2>
      </Border> */}
    </FadeIn>
  )
}

// export const metadata = {
//   title: t('contactUs'),
//   description: 'Let’s work together. We can’t wait to hear from you.',
// }

export default function Contact({ params }) {
  const t = useTranslation(params.lang)

  return (
    <>
      <title>{t('metadata.contactPageMetaTitle')}</title>
      <PageIntro
        eyebrow={t('contactUs')}
        title={
          <span
            dangerouslySetInnerHTML={{
              __html: `${t('contactHeading')}`,
            }}
          />
        }
      >
        <p>{t('contactSubHeading')}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm params={params} />
          <ContactDetails params={params} />
        </div>
      </Container>
    </>
  )
}
