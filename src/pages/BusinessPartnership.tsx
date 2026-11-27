import { useRef, useState } from 'react'
import type { DragEvent, FormEvent } from 'react'
import { COMPANY, PARTNERSHIP_APPLICATION_ENDPOINT } from '../config'
import Reveal from '../components/Reveal'
import SecureBadge from '../components/SecureBadge'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const SUCCESS_MESSAGE =
  'Thank you for your interest in partnering with Forvab Business Partners LLC. Your application has been successfully submitted. Our team will review the information provided and contact you if additional details are needed.'

const FILE_HINT = 'PDF, JPG or PNG, up to 10 MB per file.'

// ─────────────────────────────────────────────────────────────────────────────
// Small building blocks. Every field on this page is optional by design:
// no `required` attributes and no client-side validation anywhere.
// ─────────────────────────────────────────────────────────────────────────────

function TextField({
  id,
  label,
  type = 'text',
  autoComplete,
  placeholder,
}: {
  id: string
  label: string
  type?: string
  autoComplete?: string
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="field-input"
        style={type === 'date' ? { colorScheme: 'dark' } : undefined}
      />
    </div>
  )
}

function SelectField({
  id,
  label,
  options,
}: {
  id: string
  label: string
  options: string[]
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <select id={id} name={id} className="field-input" defaultValue="">
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-coal">
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

function TextArea({
  id,
  label,
  rows = 4,
  placeholder,
}: {
  id: string
  label: string
  rows?: number
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        placeholder={placeholder}
        className="field-input resize-y"
      />
    </div>
  )
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function DropField({
  label,
  files,
  onChange,
  multiple = false,
}: {
  label: string
  files: File[]
  onChange: (files: File[]) => void
  multiple?: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const addFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return
    const incoming = Array.from(list)
    onChange(multiple ? [...files, ...incoming] : incoming.slice(0, 1))
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  return (
    <div>
      <span className="field-label">{label}</span>
      <div
        role="button"
        tabIndex={0}
        aria-label={`${label} — choose or drop a file`}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`cursor-pointer rounded-xl border border-dashed px-4 py-6 text-center transition ${
          dragging
            ? 'border-emerald-400/80 bg-emerald-500/10'
            : 'border-white/20 bg-white/[0.03] hover:border-emerald-400/50 hover:bg-white/[0.05]'
        }`}
      >
        <svg
          className="mx-auto h-8 w-8 text-emerald-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 16V4" />
          <path d="m6 10 6-6 6 6" />
          <path d="M4 20h16" />
        </svg>
        <p className="mt-3 text-sm text-neutral-300">
          Drag &amp; drop {multiple ? 'files' : 'a file'} here, or{' '}
          <span className="font-semibold text-emerald-300 underline underline-offset-2">
            browse
          </span>
        </p>
        <p className="field-hint">{FILE_HINT}</p>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple={multiple}
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </div>
      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-neutral-200"
            >
              <span className="min-w-0 truncate">
                {f.name}{' '}
                <span className="text-neutral-500">({formatSize(f.size)})</span>
              </span>
              <button
                type="button"
                aria-label={`Remove ${f.name}`}
                className="shrink-0 text-neutral-400 transition hover:text-red-300"
                onClick={() => onChange(files.filter((_, j) => j !== i))}
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Section({
  index,
  number,
  title,
  children,
}: {
  index: number
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section
      data-section={index}
      className="glass scroll-mt-28 rounded-3xl p-6 sm:p-10"
    >
      <h2 className="flex items-baseline gap-3 font-display text-2xl text-white sm:text-3xl">
        <span className="text-gradient-emerald">{number}</span>
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function BusinessPartnership() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  // File state, keyed by the backend's file field names.
  const [files, setFiles] = useState<Record<string, File[]>>({})
  const setFieldFiles = (name: string) => (next: File[]) => {
    setFiles((prev) => ({ ...prev, [name]: next }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return
    const form = formRef.current
    if (!form) return

    setStatus('sending')
    setErrorMessage(null)
    try {
      const formData = new FormData(form)
      // File inputs are state-driven (drag & drop), so append them here.
      for (const [name, list] of Object.entries(files)) {
        for (const f of list) formData.append(name, f)
      }
      const response = await fetch(PARTNERSHIP_APPLICATION_ENDPOINT, {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        setStatus('success')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      let message =
        'Something went wrong while submitting your application. Please try again.'
      try {
        const data = await response.json()
        if (data && typeof data.error === 'string' && data.error) {
          message = data.error
        }
      } catch {
        /* keep the generic message */
      }
      setErrorMessage(message)
      setStatus('error')
    } catch {
      setErrorMessage(
        'We could not reach the submission service. Please check your connection and try again.',
      )
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section className="pb-24 pt-32 sm:pb-32">
        <div className="container-x">
          <div className="glass mx-auto max-w-2xl rounded-3xl p-6 text-center sm:p-10" role="status">
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
            <h1 className="mt-5 font-display text-2xl text-white sm:text-3xl">
              Application Submitted
            </h1>
            <p className="mt-3 leading-relaxed text-neutral-400">{SUCCESS_MESSAGE}</p>
            <a href="index.html" className="btn-ghost mt-8">
              Back to Home
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pb-24 pt-32 sm:pb-32">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Partnership</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl">
            Business Partnership Application
          </h1>
          <p className="mt-5 text-base leading-relaxed text-neutral-400 sm:text-lg">
            Interested in partnering with Forvab Business Partners LLC? Please
            provide your business and contact information below so our team can
            review your application and explore potential partnership
            opportunities.
          </p>
        </Reveal>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-12 max-w-3xl space-y-8"
        >
          {/* Honeypot anti-spam field — hidden from real visitors. */}
          <label htmlFor="company_fax" className="sr-only">
            Leave this field empty
          </label>
          <input
            type="text"
            id="company_fax"
            name="company_fax"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute h-0 w-0 opacity-0"
          />

          <SecureBadge />

          {status === 'error' && errorMessage && (
            <div
              role="alert"
              className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-300"
            >
              {errorMessage} If the problem continues, email us directly at{' '}
              {COMPANY.email}.
            </div>
          )}

          {/* A. Personal Information */}
          <Section index={0} number="01" title="Personal Information">
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField id="full_legal_name" label="Full Legal Name" autoComplete="name" />
              <TextField id="phone_number" label="Phone Number" type="tel" autoComplete="tel" />
              <TextField id="first_name" label="First Name" autoComplete="given-name" />
              <TextField id="last_name" label="Last Name" autoComplete="family-name" />
              <TextField id="email_address" label="Email Address" type="email" autoComplete="email" />
              <TextField id="date_of_birth" label="Date of Birth" type="date" />
            </div>
            <div className="mt-6">
              <TextField id="residential_address" label="Residential Address" autoComplete="street-address" />
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <TextField id="personal_city" label="City" autoComplete="address-level2" />
              <TextField id="personal_state" label="State" autoComplete="address-level1" />
              <TextField id="personal_zip_code" label="ZIP Code" autoComplete="postal-code" />
              <TextField id="personal_country" label="Country" autoComplete="country-name" />
            </div>
          </Section>

          {/* B. Identity Verification */}
          <Section index={1} number="02" title="Identity Verification">
            <div className="grid gap-6 sm:grid-cols-2">
              <SelectField
                id="id_type"
                label="Government-Issued ID Type"
                options={["Driver's License", 'Passport', 'State ID', 'Other Government-Issued ID']}
              />
              <TextField id="id_expiration_date" label="ID Expiration Date" type="date" />
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <DropField
                label="Upload Government-Issued ID (Front)"
                files={files.id_front || []}
                onChange={setFieldFiles('id_front')}
              />
              <DropField
                label="Upload Government-Issued ID (Back)"
                files={files.id_back || []}
                onChange={setFieldFiles('id_back')}
              />
            </div>
          </Section>

          {/* C. Business Information */}
          <Section index={2} number="03" title="Business Information">
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField id="legal_business_name" label="Legal Business Name" autoComplete="organization" />
              <TextField id="dba_trade_name" label="DBA / Trade Name" />
              <SelectField
                id="business_entity_type"
                label="Business Entity Type"
                options={[
                  'Limited Liability Company (LLC)',
                  'Corporation',
                  'Sole Proprietorship',
                  'Partnership',
                  'Nonprofit',
                  'Other',
                ]}
              />
              <TextField id="business_registration_state" label="Business Registration State" />
              <TextField id="business_registration_number" label="Business Registration Number" />
              <TextField id="ein" label="EIN" placeholder="XX-XXXXXXX" />
              <TextField id="business_formation_date" label="Business Formation Date" type="date" />
              <TextField id="business_website" label="Business Website" type="url" placeholder="https://" />
              <TextField id="business_email" label="Business Email" type="email" />
              <TextField id="business_phone_number" label="Business Phone Number" type="tel" />
            </div>
            <div className="mt-6">
              <TextField id="business_address" label="Business Address" />
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <TextField id="business_city" label="City" />
              <TextField id="business_state" label="State" />
              <TextField id="business_zip_code" label="ZIP Code" />
              <TextField id="business_country" label="Country" />
            </div>
          </Section>

          {/* D. Business Documents */}
          <Section index={3} number="04" title="Business Documents">
            <div className="grid gap-6 sm:grid-cols-2">
              <DropField
                label="Upload Business Registration Certificate"
                files={files.business_registration_certificate || []}
                onChange={setFieldFiles('business_registration_certificate')}
              />
              <DropField
                label="Upload Certificate of Good Standing"
                files={files.certificate_of_good_standing || []}
                onChange={setFieldFiles('certificate_of_good_standing')}
              />
              <DropField
                label="Upload Business License (if applicable)"
                files={files.business_license || []}
                onChange={setFieldFiles('business_license')}
              />
              <DropField
                label="Upload Business Insurance Certificate"
                files={files.business_insurance_certificate || []}
                onChange={setFieldFiles('business_insurance_certificate')}
              />
            </div>
            <div className="mt-6">
              <DropField
                label="Additional Supporting Documents"
                files={files.additional_documents || []}
                onChange={setFieldFiles('additional_documents')}
                multiple
              />
            </div>
          </Section>

          {/* E. Partnership Information */}
          <Section index={4} number="05" title="Partnership Information">
            <div className="grid gap-6">
              <TextField id="type_of_business_services" label="Type of Business Services" />
              <TextArea
                id="description_of_business"
                label="Description of Your Business"
                rows={4}
                placeholder="Tell us about your business, what it does, and who it serves…"
              />
              <TextArea
                id="previous_commercial_projects"
                label="Previous Commercial Projects"
                rows={4}
                placeholder="Describe any previous commercial projects or partnerships relevant to this application…"
              />
              <TextArea
                id="partnership_goals"
                label="Partnership Goals"
                rows={4}
                placeholder="What would you like to achieve through a partnership with us?"
              />
              <TextArea
                id="additional_comments"
                label="Additional Comments"
                rows={3}
                placeholder="Anything else you would like our team to know…"
              />
            </div>
          </Section>

          {/* Privacy notice */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <h2 className="font-display text-xl text-white">Privacy &amp; Security</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-neutral-400">
              <p>
                The information and documents you provide on this form are used
                only to review your business partnership application and to
                contact you about it. Your submission is transmitted over a
                secure (HTTPS) connection and delivered directly to our
                application inbox; access is restricted to authorized members
                of our team. We do not sell your information.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn-primary w-full sm:w-auto sm:px-12"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Submitting…' : 'Submit Application'}
              {status !== 'sending' && (
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              )}
            </button>
            <p className="mt-4 text-xs leading-relaxed text-neutral-500">
              All fields are optional — you may submit this application with as
              much or as little information as you choose to provide.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
