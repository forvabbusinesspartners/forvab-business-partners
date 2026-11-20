import { useState } from 'react'
import type { ChangeEvent, FocusEvent, FormEvent } from 'react'
import { COMPANY, FORMSPREE_ENDPOINT } from '../config'
import Reveal from './Reveal'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(value: string): string | null {
  if (!value.trim()) return 'Please enter your business email address.'
  if (!EMAIL_RE.test(value.trim())) return 'Please enter a valid email address.'
  return null
}

function validateDescription(value: string): string | null {
  if (!value.trim()) return 'Please tell us about your partnership proposal.'
  return null
}

export default function PartnershipForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [descriptionError, setDescriptionError] = useState<string | null>(null)
  const [emailTouched, setEmailTouched] = useState(false)
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (emailTouched) setEmailError(validateEmail(e.target.value))
  }

  const handleEmailBlur = (e: FocusEvent<HTMLInputElement>) => {
    setEmailTouched(true)
    setEmailError(validateEmail(e.target.value))
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
    if (descriptionError) setDescriptionError(validateDescription(e.target.value))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return

    const nextEmailError = validateEmail(email)
    const nextDescriptionError = validateDescription(description)
    setEmailError(nextEmailError)
    setDescriptionError(nextDescriptionError)
    setEmailTouched(true)
    if (nextEmailError || nextDescriptionError) return

    // Spam trap: honeypot filled — show success without posting anything.
    if (honeypot.trim() !== '') {
      setStatus('success')
      return
    }

    setStatus('sending')
    try {
      const formData = new FormData()
      formData.append('first_name', firstName)
      formData.append('last_name', lastName)
      formData.append('email', email)
      formData.append('partnership_description', description)
      formData.append(
        '_subject',
        'New Partnership Application — Forvab Business Partners LLC',
      )

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })

      if (response.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="partnership" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Partnership</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl">
            LET'S BUILD SOMETHING GREAT TOGETHER.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-400 sm:text-lg">
            We welcome inquiries from businesses, entrepreneurs, and organizations
            interested in exploring potential business partnerships with FORVAB
            Business Partners LLC.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-12 max-w-2xl">
          {status === 'success' ? (
            <div className="glass rounded-3xl p-6 text-center sm:p-10" role="status">
              <svg
                className="mx-auto h-14 w-14 text-emerald-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.5 12.5l2.5 2.5 4.5-5"
                />
              </svg>
              <h3 className="mt-5 font-display text-2xl text-white sm:text-3xl">
                Thank you — your application has been submitted.
              </h3>
              <p className="mt-3 leading-relaxed text-neutral-400">
                We will review your inquiry and reply to the email address you
                provided.
              </p>
            </div>
          ) : (
            <div className="glass rounded-3xl p-6 sm:p-10">
              {status === 'error' && (
                <div
                  role="alert"
                  className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-300"
                >
                  Something went wrong while sending your application. Please try
                  again, or email us directly at {COMPANY.email}.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <input
                  type="hidden"
                  name="_subject"
                  value="New Partnership Application — Forvab Business Partners LLC"
                />

                {/* Honeypot anti-spam field — hidden from real visitors. */}
                <label htmlFor="company_website" className="sr-only">
                  Leave this field empty
                </label>
                <input
                  type="text"
                  id="company_website"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute h-0 w-0 opacity-0"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first_name" className="field-label">
                      First Name
                    </label>
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      autoComplete="given-name"
                      className="field-input"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="field-label">
                      Last Name
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      autoComplete="family-name"
                      className="field-input"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="email" className="field-label">
                    Business Email Address <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-invalid={emailError ? true : undefined}
                    aria-describedby={emailError ? 'email-error' : undefined}
                    className={`field-input${emailError ? ' field-input-error' : ''}`}
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                  />
                  {emailError && (
                    <p id="email-error" className="field-error" role="alert">
                      {emailError}
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <label htmlFor="partnership_description" className="field-label">
                    Partnership Description <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="partnership_description"
                    name="partnership_description"
                    rows={6}
                    required
                    aria-required="true"
                    aria-invalid={descriptionError ? true : undefined}
                    aria-describedby={
                      descriptionError ? 'description-error' : undefined
                    }
                    placeholder="Tell us about your business, your partnership proposal, and how you envision working together…"
                    className={`field-input resize-y${
                      descriptionError ? ' field-input-error' : ''
                    }`}
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                  {descriptionError && (
                    <p id="description-error" className="field-error" role="alert">
                      {descriptionError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary mt-8 w-full sm:w-auto"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Submit Application'}
                </button>
              </form>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
