import { COMPANY } from '../config'

const h2 = 'mt-10 text-2xl font-display text-white'
const p = 'mt-3 leading-relaxed text-neutral-400'

export default function Terms() {
  return (
    <section className="pt-32 pb-24">
      <div className="container-x max-w-4xl">
        <h1 className="font-display text-4xl text-white sm:text-5xl">
          Terms of Use
        </h1>
        <p className="mt-4 text-sm text-neutral-500">
          Last updated: November 20, 2026.
        </p>

        <p className={p}>
          These Terms of Use govern your use of the website of{' '}
          {COMPANY.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
          &ldquo;our&rdquo;). Please read them carefully.
        </p>

        <h2 className={h2}>Acceptance of Terms</h2>
        <p className={p}>
          By accessing or using this website, you agree to these Terms of Use.
          If you do not agree, please do not use this website.
        </p>

        <h2 className={h2}>About Our Services</h2>
        <p className={p}>
          {COMPANY.name} is a Wyoming limited liability company offering
          business consulting, business management, and marketing services.
          This website provides general information about our services and a
          way to send us a partnership inquiry. Nothing on this website is a
          binding offer, and any engagement would be governed by a separate
          written agreement.
        </p>

        <h2 className={h2}>Partnership Inquiries</h2>
        <p className={p}>
          Submitting the partnership form is an inquiry only. It does not
          create a partnership, client relationship, agency, or any obligation
          on our part, and it does not guarantee that we will respond to,
          accept, or enter into any partnership or business arrangement with
          you.
        </p>

        <h2 className={h2}>No Guarantees</h2>
        <p className={p}>
          We make no guarantee of specific business results or outcomes. Any
          discussion of our services on this website is general information,
          and results will depend on the circumstances of each engagement.
        </p>

        <h2 className={h2}>Intellectual Property</h2>
        <p className={p}>
          The content of this website — including its text, design, and logo —
          belongs to {COMPANY.name} unless otherwise noted. You may view and
          print pages for your own personal or internal business use, but you
          may not reproduce, distribute, or reuse our content for commercial
          purposes without our prior written permission.
        </p>

        <h2 className={h2}>Acceptable Use</h2>
        <p className={p}>
          You agree not to use this website for any unlawful purpose, not to
          submit spam or misleading information through the partnership form,
          and not to attempt to disrupt, damage, or gain unauthorized access
          to this website or its related systems.
        </p>

        <h2 className={h2}>Third-Party Services</h2>
        <p className={p}>
          The partnership form on this website is delivered by Formspree, a
          third-party service that processes form submissions on our behalf.
          This website also loads fonts from Google Fonts. Your use of those
          services is subject to their own terms and privacy practices, and we
          are not responsible for their operation.
        </p>

        <h2 className={h2}>Limitation of Liability</h2>
        <p className={p}>
          This website and its content are provided &ldquo;as is&rdquo;,
          without warranties of any kind. To the fullest extent permitted by
          law, we are not liable for any indirect or consequential loss
          arising from your use of, or inability to use, this website. Nothing
          in these terms limits liability that cannot be limited by law.
        </p>

        <h2 className={h2}>Governing Law</h2>
        <p className={p}>
          These Terms of Use are governed by the laws of the State of Wyoming,
          USA. This choice of governing law is a draft provision that the
          owner must confirm before publication.
        </p>

        <h2 className={h2}>Changes to These Terms</h2>
        <p className={p}>
          We may update these Terms of Use from time to time. When we do, we
          will update the &ldquo;Last updated&rdquo; date at the top of this
          page. Your continued use of this website after changes are published
          means you accept the updated terms.
        </p>

        <h2 className={h2}>Contact Us</h2>
        <p className={p}>
          If you have questions about these Terms of Use, you can contact us
          at{' '}
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
