import { COMPANY } from '../config'

const h2 = 'mt-10 text-2xl font-display text-white'
const p = 'mt-3 leading-relaxed text-neutral-400'

export default function Privacy() {
  return (
    <section className="pt-32 pb-24">
      <div className="container-x max-w-4xl">
        <h1 className="font-display text-4xl text-white sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-neutral-500">
          Last updated: November 20, 2026.
        </p>

        <p className={p}>
          This Privacy Policy explains what information we collect through this
          website, how we use it, and the choices you have. This policy applies
          to the website of {COMPANY.name}.
        </p>

        <h2 className={h2}>Information We Collect</h2>
        <p className={p}>
          We collect only the information you choose to provide to us. When you
          submit the partnership form on this website, we receive the details
          you enter: your first and last name (both optional), your business
          email address, and your partnership description. In addition, our
          hosting provider may record basic server logs, such as the pages
          visited, the time of the visit, and general technical information
          about your browser and device, as is standard for operating a
          website.
        </p>

        <h2 className={h2}>How We Use Your Information</h2>
        <p className={p}>
          We use the information you provide to respond to your partnership
          inquiry and to communicate with you about it. We also use basic
          server and hosting information to operate, secure, and maintain this
          website. We do not use your information for any purpose other than
          those described in this policy.
        </p>

        <h2 className={h2}>Form Submissions</h2>
        <p className={p}>
          Our partnership form is delivered by Formspree, a third-party form
          service. When you submit the form, Formspree processes your
          submission on our behalf and forwards it to us so that we can read
          and respond to your inquiry. Your form details are therefore handled
          by Formspree in accordance with its own privacy practices, in
          addition to this policy.
        </p>

        <h2 className={h2}>Cookies and Analytics</h2>
        <p className={p}>
          This website uses no analytics and no tracking cookies. We do not
          run advertising trackers on this site. Fonts are loaded from Google
          Fonts, which may receive basic technical information (such as your
          IP address) when your browser requests the font files, as is
          standard for any externally hosted resource.
        </p>

        <h2 className={h2}>Data Sharing</h2>
        <p className={p}>
          We do not sell your personal information. We share it only with the
          service providers needed to operate this website and the partnership
          form — for example, our hosting provider and Formspree — or if we
          are required to do so by law.
        </p>

        <h2 className={h2}>Data Retention</h2>
        <p className={p}>
          We keep partnership inquiries only as long as needed to respond to
          them and to maintain our business records. When information is no
          longer needed for those purposes, we delete it or keep it only in a
          form that no longer identifies you.
        </p>

        <h2 className={h2}>Your Rights</h2>
        <p className={p}>
          You may contact us to ask what information we hold about you, to ask
          us to correct it, or to request that we delete it. We will respond
          to reasonable requests in line with applicable law. To make a
          request, use the contact details at the end of this policy.
        </p>

        <h2 className={h2}>Children&rsquo;s Privacy</h2>
        <p className={p}>
          This website is not directed at children under 13, and we do not
          knowingly collect information from children under 13. If you believe
          a child has provided us with information, please contact us and we
          will delete it.
        </p>

        <h2 className={h2}>Changes to This Policy</h2>
        <p className={p}>
          We may update this Privacy Policy from time to time, for example to
          reflect changes to our website or services. When we do, we will
          update the &ldquo;Last updated&rdquo; date at the top of this page.
          The version published here is the current version.
        </p>

        <h2 className={h2}>Contact Us</h2>
        <p className={p}>
          If you have questions about this Privacy Policy or your information,
          you can contact us at{' '}
          <a
            href={`mailto:${COMPANY.email}`}
            className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
          >
            {COMPANY.email}
          </a>{' '}
          or by post at {COMPANY.address}.
        </p>
      </div>
    </section>
  )
}
