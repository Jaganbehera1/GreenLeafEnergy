import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, FileText, Lock, ShieldCheck } from 'lucide-react';

type LegalPageVariant = 'terms' | 'privacy';

type Section = {
  id: string;
  title: string;
};

const termsSections: Section[] = [
  { id: 'intro', title: 'Introduction' },
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'about-green-leaf-energy', title: 'About Green Leaf Energy' },
  { id: 'scope', title: 'Scope of Website and Services' },
  { id: 'usage', title: 'Website Usage and Eligibility' },
  { id: 'accuracy', title: 'Accuracy of Website Information' },
  { id: 'solar-products', title: 'Solar Products and Services' },
  { id: 'project-execution', title: 'Solar Installation and Project Execution' },
  { id: 'enquiries', title: 'Enquiries and Quotations' },
  { id: 'orders', title: 'Orders and Payment Terms' },
  { id: 'pricing', title: 'Pricing and Taxes' },
  { id: 'timelines', title: 'Installation Timelines and Delays' },
  { id: 'warranty', title: 'Product Warranty and Service Support' },
  { id: 'customer-responsibilities', title: 'Customer Responsibilities' },
  { id: 'ip-rights', title: 'Intellectual Property Rights' },
  { id: 'acceptable-use', title: 'Acceptable Website Usage' },
  { id: 'third-party', title: 'Third-Party Websites and External Links' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'disclaimer', title: 'Disclaimer of Warranties' },
  { id: 'indemnification', title: 'Indemnification' },
  { id: 'suspension', title: 'Suspension and Termination' },
  { id: 'force-majeure', title: 'Force Majeure' },
  { id: 'changes', title: 'Changes to Terms & Conditions' },
  { id: 'governing-law', title: 'Governing Law and Jurisdiction' },
  { id: 'contact', title: 'Contact Information' },
];

const privacySections: Section[] = [
  { id: 'intro', title: 'Introduction' },
  { id: 'scope', title: 'Scope of This Privacy Policy' },
  { id: 'information-collected', title: 'Information We Collect' },
  { id: 'personal-information', title: 'Personal Information Provided by Users' },
  { id: 'forms', title: 'Contact and Enquiry Form Information' },
  { id: 'technical-data', title: 'Technical Information and Website Usage Data' },
  { id: 'cookies', title: 'Cookies and Similar Technologies' },
  { id: 'use-of-information', title: 'How We Use Personal Information' },
  { id: 'purpose', title: 'Purpose of Data Processing' },
  { id: 'legal-basis', title: 'Consent and Legal Grounds for Processing' },
  { id: 'sharing', title: 'Sharing of Information with Third Parties' },
  { id: 'service-providers', title: 'Service Providers and Business Partners' },
  { id: 'storage', title: 'Data Storage and Retention' },
  { id: 'security', title: 'Data Security' },
  { id: 'rights', title: 'Data Protection Rights' },
  { id: 'access', title: 'Access to Personal Information' },
  { id: 'correction', title: 'Correction and Updating of Information' },
  { id: 'erasure', title: 'Request for Erasure of Personal Information' },
  { id: 'consent-withdrawal', title: 'Withdrawal of Consent' },
  { id: 'children', title: 'Children\'s Privacy' },
  { id: 'third-party-links', title: 'Third-Party Website Links' },
  { id: 'international-transfers', title: 'International Data Transfers (if applicable)' },
  { id: 'changes', title: 'Changes to This Privacy Policy' },
  { id: 'contact', title: 'Contact for Privacy-Related Questions' },
];

function buildIntroParagraph(variant: LegalPageVariant) {
  if (variant === 'terms') {
    return 'Please read these Terms & Conditions carefully before accessing or using the Green Leaf Energy website or enquiring about our solar energy products and services.';
  }

  return 'At Green Leaf Energy, we respect your privacy and are committed to handling your personal information responsibly. This Privacy Policy explains how information may be collected, used, stored and protected when you visit our website or contact us.';
}

export function LegalPage({ variant }: { variant: LegalPageVariant }) {
  const [activeSection, setActiveSection] = useState('intro');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const sections = variant === 'terms' ? termsSections : privacySections;
  const isTerms = variant === 'terms';

  useEffect(() => {
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sectionElements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sectionElements.forEach((element) => observer.observe(element));

    const onScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [sections]);

  const introText = buildIntroParagraph(variant);

  return (
    <div className="bg-white text-gray-800">
      <header className="relative overflow-hidden bg-gradient-to-br from-green-700 via-emerald-700 to-teal-800 pt-28 pb-12 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(163,230,53,0.16),transparent_25%)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-green-100">
            <Link to="/" className="transition hover:text-white">Home</Link>
            <span aria-hidden="true">/</span>
            <span>{isTerms ? 'Terms & Conditions' : 'Privacy Policy'}</span>
          </nav>

          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-green-50 backdrop-blur-sm">
                <FileText className="h-4 w-4" />
                {isTerms ? 'Legal Terms' : 'Legal Privacy'}
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                {isTerms ? 'Terms & Conditions' : 'Privacy Policy'}
              </h1>
              <p className="mt-4 max-w-3xl text-base text-green-50 sm:text-lg">
                {isTerms ? 'Understand the terms governing your use of Green Leaf Energy\'s website and services.' : 'Learn how Green Leaf Energy handles and protects your personal information.'}
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-green-50 shadow-lg backdrop-blur-sm">
              <div className="font-semibold text-white">Last Updated</div>
              <div>10 November 2026</div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-green-100 bg-green-50 p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Table of Contents</h2>
              <nav aria-label="Page sections" className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`block rounded-xl px-3 py-2 text-sm transition ${
                      activeSection === section.id
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-white hover:text-green-700'
                    }`}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="legal-content rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-8 lg:p-10">
            <p className="mb-8 text-base leading-7 text-gray-700">{introText}</p>

            {isTerms ? (
              <>
                <section id="intro" className="scroll-mt-28 pb-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">1. Introduction</h2>
                  <p className="mb-3 text-gray-700">This website is operated by Green Leaf Energy, a solar energy business serving customers across Odisha, India. These Terms & Conditions govern your access to and use of our website, contact channels, enquiry process and the solar products and services offered through the website.</p>
                  <p className="text-gray-700">The website is intended to provide information about solar power solutions, project enquiries, quotations, installation support and related renewable energy services. Any specific project scope, pricing, installation commitment and after-sales support will be governed by the applicable quotation, proposal or signed agreement between Green Leaf Energy and the customer, as the case may be.</p>
                </section>

                <section id="acceptance" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">2. Acceptance of Terms</h2>
                  <p className="text-gray-700">By accessing or using this website, or by submitting an enquiry or quotation request through it, you agree to these Terms & Conditions and to any policies referenced herein, including our Privacy Policy. If you do not agree with any part of these terms, you must not use the website or submit an enquiry.</p>
                </section>

                <section id="about-green-leaf-energy" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">3. About Green Leaf Energy</h2>
                  <p className="text-gray-700">Green Leaf Energy provides solar energy-related products, consultation, project evaluation, system design and installation assistance for homes, businesses and agricultural customers in Odisha, India. The exact legal registration details, principal office details and business registration information are to be confirmed by the company and may be updated from time to time.</p>
                </section>

                <section id="scope" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">4. Scope of Website and Services</h2>
                  <p className="text-gray-700">This website is intended to provide general information about solar energy, possible system configurations, project enquiries, customer support, and solar-related services. It does not constitute a binding offer to provide services or install equipment unless confirmed in a signed quotation or written agreement.</p>
                </section>

                <section id="usage" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">5. Website Usage and Eligibility</h2>
                  <p className="text-gray-700">You agree to use the website only for lawful and legitimate purposes. You must not misuse the platform, attempt unauthorised access, disrupt website operations or interfere with any third-party access or rights. We may restrict or suspend access if misuse is detected.</p>
                </section>

                <section id="accuracy" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">6. Accuracy of Website Information</h2>
                  <p className="text-gray-700">While Green Leaf Energy makes reasonable efforts to keep the information on the website accurate and updated, details may change due to product availability, scheme eligibility, tariff changes, regulatory developments, or site-specific conditions. Information is provided for general guidance only and should not be treated as a final engineering, financial or legal determination unless expressly confirmed in writing.</p>
                </section>

                <section id="solar-products" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">7. Solar Products and Services</h2>
                  <p className="text-gray-700">The nature of the solar products and services available may vary depending on customer needs, site conditions, system type, connection type, energy consumption pattern and applicable regulatory or subsidy requirements. Green Leaf Energy may offer rooftop solar installations, system upgrades, maintenance, consultation and related support as appropriate to each project.</p>
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
                    <li>Solar panel output depends on sunlight, weather, location, orientation, shading, equipment specifications and installation conditions.</li>
                    <li>Energy generation estimates are indicative and not guaranteed unless expressly agreed in a written contract.</li>
                    <li>Electricity bill savings depend on actual consumption, tariff structure, system capacity and applicable government policies.</li>
                    <li>Net metering and grid connectivity are subject to applicable electricity distribution company regulations and approvals.</li>
                    <li>Subsidies and government incentives are subject to eligibility, scheme availability and applicable government guidelines.</li>
                  </ul>
                </section>

                <section id="project-execution" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">8. Solar Installation and Project Execution</h2>
                  <p className="text-gray-700">Solar project execution is subject to site assessment, technical viability, site readiness, electrical infrastructure adequacy, regulatory approvals, and any requirements imposed by the local electricity distribution utility or relevant authority. Final design and installation scope may change based on technical findings at site inspection stage.</p>
                </section>

                <section id="enquiries" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">9. Enquiries and Quotations</h2>
                  <p className="text-gray-700">When you submit a contact or quotation enquiry, the information you provide may be used to evaluate your requirement, respond to your enquiry, prepare a quotation, and confirm project feasibility. A quotation is a preliminary estimate and does not automatically bind Green Leaf Energy to supply or install equipment unless accepted and confirmed in writing.</p>
                </section>

                <section id="orders" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">10. Orders and Payment Terms</h2>
                  <p className="text-gray-700">Any order, supply arrangement or installation commitment must be governed by the contractual documents issued by Green Leaf Energy and accepted by the customer. If no separate signed agreement is in place, any payment action or commitment remains subject to the applicable quotation and the business's standard commercial terms as communicated to the customer in writing.</p>
                </section>

                <section id="pricing" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">11. Pricing and Taxes</h2>
                  <p className="text-gray-700">Pricing information provided on the website or in a quotation may be indicative and is subject to change without prior notice. Taxes, duties, installation charges, transport, site-specific material requirements and regulatory approvals may affect the final amount payable. Any final payable amount must be confirmed in the applicable quotation or signed agreement.</p>
                </section>

                <section id="timelines" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">12. Installation Timelines and Delays</h2>
                  <p className="text-gray-700">Installation timelines are approximate and may vary depending on site readiness, approvals, weather, equipment availability, logistics, manpower, grid or utility procedures and other operational circumstances. Green Leaf Energy will use reasonable efforts to meet projected delivery or completion dates, but delays may occur outside its reasonable control.</p>
                </section>

                <section id="warranty" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">13. Product Warranty and Service Support</h2>
                  <p className="text-gray-700">Product warranties, if any, are subject to the applicable manufacturer's terms and conditions and any relevant product documentation. Green Leaf Energy does not create or extend warranties beyond the specific manufacturer or supplier warranty terms, unless expressly stated in a written agreement. After-sales support and maintenance services, if provided, will be governed by the applicable service agreement, service plan or written customer arrangement.</p>
                </section>

                <section id="customer-responsibilities" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">14. Customer Responsibilities</h2>
                  <p className="text-gray-700">Customers are responsible for providing accurate contact information, clear site access, completion of required documentation, and timely responses to requests for approvals or information. The customer must ensure that the site is suitable for installation and that any required permissions, permits or utility approvals are obtained as applicable under local law and procedure.</p>
                </section>

                <section id="ip-rights" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">15. Intellectual Property Rights</h2>
                  <p className="text-gray-700">All content displayed on this website, including text, graphics, logos, design elements, photographs, videos and other materials, is protected by intellectual property rights and may not be reproduced, distributed, modified or used without prior written permission from Green Leaf Energy or the relevant rights holder.</p>
                </section>

                <section id="acceptable-use" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">16. Acceptable Website Usage</h2>
                  <p className="text-gray-700">The website must be used in a lawful and non-disruptive manner. You may not upload harmful content, attempt to exploit vulnerabilities, interfere with website security, use automated scraping tools without permission, or engage in activity that could damage the reliability or integrity of the website.</p>
                </section>

                <section id="third-party" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">17. Third-Party Websites and External Links</h2>
                  <p className="text-gray-700">The website may contain links to third-party websites or external resources for convenience. Green Leaf Energy does not control or guarantee the content, accuracy, security, privacy practices or reliability of such third-party websites and therefore accepts no liability for loss or damage arising from reliance on linked content.</p>
                </section>

                <section id="liability" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">18. Limitation of Liability</h2>
                  <p className="text-gray-700">To the maximum extent permitted by applicable law, Green Leaf Energy shall not be liable for indirect, incidental, consequential, special or punitive losses arising out of or in connection with website access, enquiry submission, project discussions, solar installations or related services, except to the extent expressly arising from gross negligence, fraud or wilful misconduct.</p>
                </section>

                <section id="disclaimer" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">19. Disclaimer of Warranties</h2>
                  <p className="text-gray-700">The website and the information available on it are provided on an "as is" and "as available" basis. Green Leaf Energy makes no express or implied warranties regarding uninterrupted availability, accuracy, completeness, reliability or suitability of the website for any particular purpose, except as required by law or expressly set out in a written agreement.</p>
                </section>

                <section id="indemnification" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">20. Indemnification</h2>
                  <p className="text-gray-700">You agree to indemnify and hold harmless Green Leaf Energy, its directors, employees and representatives against any claims, losses, liabilities or expenses arising from your misuse of the website, breach of these terms, misrepresentation of information, unlawful use of materials, or damage caused by your acts or omissions.</p>
                </section>

                <section id="suspension" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">21. Suspension and Termination</h2>
                  <p className="text-gray-700">Green Leaf Energy may suspend, restrict or terminate access to the website or any part of its services at any time to protect the integrity of the website, comply with law, manage operational requirements, or address misuse or security concerns.</p>
                </section>

                <section id="force-majeure" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">22. Force Majeure</h2>
                  <p className="text-gray-700">Green Leaf Energy shall not be liable for delay or failure in performance caused by events beyond its reasonable control, including adverse weather, labour disruptions, supply shortages, utility outages, non-availability of materials, government or regulatory actions, lockdowns, transport disruptions, or other circumstances beyond commercial control.</p>
                </section>

                <section id="changes" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">23. Changes to Terms & Conditions</h2>
                  <p className="text-gray-700">Green Leaf Energy may revise these Terms & Conditions from time to time to reflect changes in business operations, legal requirements or website functionality. Continued use of the website after any revision constitutes acceptance of the updated terms.</p>
                </section>

                <section id="governing-law" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">24. Governing Law and Jurisdiction</h2>
                  <p className="text-gray-700">These Terms & Conditions are governed by and construed in accordance with the laws of India, including applicable consumer, contract and electronic communications laws. Subject to any applicable legal requirements and the location of the principal business operations or registered office of Green Leaf Energy, the courts in Odisha may have jurisdiction over disputes arising out of or relating to the website or these terms, as applicable under Indian law.</p>
                </section>

                <section id="contact" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">25. Contact Information</h2>
                  <p className="text-gray-700">If you have a question about these Terms & Conditions, the website, or any enquiry or quotation submitted through the website, please contact Green Leaf Energy through the official contact details provided on the website or by using the contact form or published communication channels. The exact registered office and business registration details may be confirmed by the company as needed.</p>
                  <div className="mt-4 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
                    <strong>Important:</strong> This document is a practical draft for review and should be checked by a qualified Indian legal professional before publication or final legal use.
                  </div>
                </section>
              </>
            ) : (
              <>
                <section id="intro" className="scroll-mt-28 pb-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">1. Introduction</h2>
                  <p className="text-gray-700">Green Leaf Energy is committed to protecting the privacy and personal information of visitors, customers and enquirers. This Privacy Policy explains how personal information may be collected, used, stored and processed when you visit the website, contact us, request a quotation or use our solar services-related website features.</p>
                </section>

                <section id="scope" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">2. Scope of This Privacy Policy</h2>
                  <p className="text-gray-700">This policy applies to information collected through the Green Leaf Energy website, its enquiry forms, quotation requests, telephone or email communications, and any related business contact channels. It also applies to data processing activities carried out in connection with customer support, solar consultation, project discussions and legal or contractual obligations.</p>
                </section>

                <section id="information-collected" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">3. Information We Collect</h2>
                  <p className="text-gray-700">The types of personal information we may collect depend on how you interact with us. This may include contact information, communication records, service-related information, inquiry details, technical access information and, where relevant, information needed to assess a solar installation request.</p>
                </section>

                <section id="personal-information" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">4. Personal Information Provided by Users</h2>
                  <p className="text-gray-700">We may collect personal information you voluntarily provide to us, such as name, mobile number, email address, location, property details, electricity bill information, project requirements, and any notes or questions you include in a contact or quotation request. We only collect information that is reasonably necessary for the relevant purpose.</p>
                </section>

                <section id="forms" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">5. Contact and Enquiry Form Information</h2>
                  <p className="text-gray-700">Information provided via contact and enquiry forms may be used to respond to your message, discuss your solar requirement, provide a quotation, and coordinate follow-up communication. The specific information requested by a form will depend on the purpose of the form and may include full name, contact number, email address, address, property type, monthly electricity consumption or similar system requirements.</p>
                </section>

                <section id="technical-data" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">6. Technical Information and Website Usage Data</h2>
                  <p className="text-gray-700">We may collect technical details about your use of the website, such as browser type, operating system, device information, pages visited, time spent on the website, referral source, IP address (where relevant), and other standard website usage data. This information may be used to improve the website, troubleshoot technical issues, maintain security, and understand how customers interact with our online services.</p>
                </section>

                <section id="cookies" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">7. Cookies and Similar Technologies</h2>
                  <p className="text-gray-700">The website may use cookies or similar technologies where necessary for functionality, security, analytics, session management or website improvement. Cookie use, if any, may be subject to browser settings and the website's configuration. Unless clearly activated and disclosed in the website configuration, Green Leaf Energy does not assume that tracking technologies such as Google Analytics, Meta Pixel or similar tools are active on this website.</p>
                </section>

                <section id="use-of-information" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">8. How We Use Personal Information</h2>
                  <p className="text-gray-700">We may use personal information to respond to customer enquiries, assess solar installation and quotation opportunities, provide solar project guidance, communicate important updates, support installation-related follow-up, manage service requests, and improve the website experience. Personal information may also be processed where necessary to comply with legal, regulatory or contractual obligations.</p>
                </section>

                <section id="purpose" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">9. Purpose of Data Processing</h2>
                  <p className="text-gray-700">The main purposes of processing personal information include responding to enquiries, preparing quotations, understanding project requirements, coordinating site discussions and installation planning, undertaking after-sales communication, improving website functionality, and managing internal records related to customer interactions and legal compliance.</p>
                </section>

                <section id="legal-basis" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">10. Consent and Legal Grounds for Processing</h2>
                  <p className="text-gray-700">Where consent is required or appropriate under applicable law, Green Leaf Energy will provide clear notice and obtain consent before processing personal data for the relevant purpose. In other cases, processing may be based on contractual necessity, legal obligation, fulfilment of a legitimate business interest, or another valid lawful ground recognised under the Digital Personal Data Protection Act, 2023 and applicable laws as amended or notified from time to time.</p>
                </section>

                <section id="sharing" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">11. Sharing of Information with Third Parties</h2>
                  <p className="text-gray-700">We may share personal information with authorised service providers, vendors, business partners, or professional advisers when necessary to provide services, manage operations, respond to enquiries, or meet legal obligations. Information is not shared more broadly than necessary for the relevant purpose.</p>
                </section>

                <section id="service-providers" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">12. Service Providers and Business Partners</h2>
                  <p className="text-gray-700">Green Leaf Energy may use third-party service providers for website hosting, technical support, communication tools, data storage, documentation, analytics, or business operations. These providers are expected to protect personal information in line with applicable legal requirements, and Green Leaf Energy remains responsible for ensuring that any sharing is limited and justified.</p>
                </section>

                <section id="storage" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">13. Data Storage and Retention</h2>
                  <p className="text-gray-700">Personal information may be stored in secure systems, internal records or secure third-party platforms. We will retain data only for as long as it is necessary to fulfil the purpose for which it was collected, to satisfy legal or contractual obligations, or to defend legal claims. Retention periods may vary depending on the type of information and applicable law.</p>
                </section>

                <section id="security" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">14. Data Security</h2>
                  <p className="text-gray-700">Green Leaf Energy implements reasonable administrative, technical and organisational safeguards to protect personal information from unauthorised access, misuse, disclosure, loss or alteration. These may include access controls, secure storage, restricted internal access and monitoring of systems. However, no system can be guaranteed to be completely secure, and absolute security cannot be promised.</p>
                </section>

                <section id="rights" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">15. Data Protection Rights</h2>
                  <p className="text-gray-700">Depending on the applicable law and the circumstances, individuals may have certain rights relating to personal information, including the right to receive notice, provide consent, request access, seek correction, request erasure where legally available, withdraw consent where applicable, and raise grievances regarding the handling of personal data.</p>
                </section>

                <section id="access" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">16. Access to Personal Information</h2>
                  <p className="text-gray-700">If you wish to know what personal information Green Leaf Energy holds about you, or if you need the information for verification or record-keeping, you may contact us through the official contact channels published on the website. We may need to verify your identity before providing access to personal information, where appropriate.</p>
                </section>

                <section id="correction" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">17. Correction and Updating of Information</h2>
                  <p className="text-gray-700">If you believe the personal information we hold is incorrect, incomplete or outdated, you may ask us to correct or update it. We will take reasonable steps to review the request and, where appropriate, update the records promptly.</p>
                </section>

                <section id="erasure" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">18. Request for Erasure of Personal Information</h2>
                  <p className="text-gray-700">Where applicable law provides a right to request erasure of personal information, you may ask us to delete or remove personal data that is no longer required for the purposes for which it was collected or which is otherwise not legally required to be retained. However, certain records may need to be retained to comply with applicable law, contractual obligations, dispute resolution or legal claims.</p>
                </section>

                <section id="consent-withdrawal" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">19. Withdrawal of Consent</h2>
                  <p className="text-gray-700">If you have provided consent for a particular processing activity, you may withdraw that consent at any time, subject to legal or contractual restrictions and reasonable notice. Withdrawal of consent will not affect the lawfulness of processing already carried out before the withdrawal, where law permits such processing to continue.</p>
                </section>

                <section id="children" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">20. Children&apos;s Privacy</h2>
                  <p className="text-gray-700">This website is not intended for children under the age of 18, and Green Leaf Energy does not intentionally collect personal information from children without appropriate consent or legal basis. If a parent or guardian believes that a child has provided personal information without proper authorisation, please contact us and we will take reasonable steps to address the matter.</p>
                </section>

                <section id="third-party-links" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">21. Third-Party Website Links</h2>
                  <p className="text-gray-700">Our website may contain links to other digital resources or services. Green Leaf Energy is not responsible for the privacy practices, content or security of such third-party websites, and users should review the privacy policy of any external website before sharing personal information.</p>
                </section>

                <section id="international-transfers" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">22. International Data Transfers (if applicable)</h2>
                  <p className="text-gray-700">If personal information is transferred outside India or to overseas service providers for operational or technical reasons, Green Leaf Energy will take reasonable steps to ensure that such transfers comply with applicable Indian privacy laws and are subject to appropriate safeguards as required by law.</p>
                </section>

                <section id="changes" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">23. Changes to This Privacy Policy</h2>
                  <p className="text-gray-700">Green Leaf Energy may update this Privacy Policy from time to time to reflect changes in legal requirements, business practices or website functionality. Any changes will be posted on this page with an updated revision date. Continued use of the website after changes are posted indicates your acceptance of the revised policy.</p>
                </section>

                <section id="contact" className="scroll-mt-28 border-t border-gray-200 py-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900">24. Contact for Privacy-Related Questions</h2>
                  <p className="text-gray-700">If you have any questions, requests or concerns about this Privacy Policy, or wish to exercise your data rights, please contact Green Leaf Energy through the official channel or contact details available on the website. If required, you may also refer your concern to the grievance mechanism or applicable authority under Indian law.</p>
                  <div className="mt-4 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
                    <strong>Important:</strong> This Privacy Policy is a practical compliance draft intended for review by a qualified Indian legal professional before publication or final legal use.
                  </div>
                </section>
              </>
            )}
          </article>
        </div>
      </div>

      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
          Top
        </button>
      )}

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        .legal-content h2 {
          color: #111827;
        }

        .legal-content p,
        .legal-content li {
          line-height: 1.8;
        }

        .legal-content section {
          scroll-margin-top: 7rem;
        }

        @media print {
          body {
            background: #fff;
          }

          .fixed,
          nav,
          footer,
          #root > div > header + div > div > aside,
          .sr-only {
            display: none !important;
          }

          .legal-content {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}

export function TermsAndConditionsPage() {
  return <LegalPage variant="terms" />;
}

export function PrivacyPolicyPage() {
  return <LegalPage variant="privacy" />;
}

export function LegalPageHeaderIcon() {
  return <ShieldCheck className="h-5 w-5" />;
}

export function LegalPageLockIcon() {
  return <Lock className="h-5 w-5" />;
}
