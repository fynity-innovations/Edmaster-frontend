import Link from "next/link"
import type { Metadata } from "next"
import { LegalDocument, type LegalSection } from "@/components/legal/legal-document"

export const metadata: Metadata = {
  title: "Privacy Policy — EdMaster",
  description:
    "How EdMaster collects, uses, shares, and protects your personal information when you use our study-abroad platform.",
}

const sections: LegalSection[] = [
  {
    heading: "Introduction",
    blocks: [
      {
        type: "p",
        text: "This Privacy Policy explains how EdMaster (“we”, “us”) collects, uses, shares, and protects your personal information when you use our website, AI tools, and services (the “Services”). By using the Services, you agree to the practices described here.",
      },
    ],
  },
  {
    heading: "Information we collect",
    blocks: [
      { type: "p", text: "We collect information you provide and information generated as you use the Services:" },
      {
        type: "list",
        items: [
          "Contact details — your name, email address, and phone number;",
          "Academic and preference data — such as your education history, scores, target degree, field of study, preferred countries, budget, and intake, which you share to receive recommendations;",
          "Verification data — one-time passwords (OTPs) and verification status used to confirm your identity;",
          "Content you submit — including details entered into our profile evaluator and SOP generator;",
          "Usage and device data — basic technical information such as IP address, browser type, and pages visited, collected to keep the Services secure and working.",
        ],
      },
    ],
  },
  {
    heading: "How we use your information",
    blocks: [
      { type: "p", text: "We use your information to:" },
      {
        type: "list",
        items: [
          "Generate personalized course, university, and application recommendations;",
          "Verify your identity and secure your account through OTPs;",
          "Provide counselling and the support services you request;",
          "Communicate with you about your queries, applications, and relevant updates;",
          "Operate, maintain, improve, and protect the Services, including preventing fraud and abuse.",
        ],
      },
    ],
  },
  {
    heading: "AI processing",
    blocks: [
      {
        type: "p",
        text: "Some features use artificial intelligence to analyze the profile and preference information you provide and to generate suggestions and draft documents. This processing is performed to deliver the feature you requested. Outputs are guidance only and should be independently verified, as described in our Terms & Conditions.",
      },
    ],
  },
  {
    heading: "Service providers",
    blocks: [
      {
        type: "p",
        text: "We share limited information with trusted third-party providers who help us run the Services, strictly to perform tasks on our behalf. These include providers for message and email delivery (used to send OTPs and notifications by SMS, WhatsApp, or email) and AI processing. These providers are permitted to use your information only as needed to provide their service to us.",
      },
    ],
  },
  {
    heading: "Sharing with institutions",
    blocks: [
      {
        type: "p",
        text: "Where you ask us to assist with an application or related service, we may share the relevant information with the applicable university, lender, insurer, or authority. We do this to fulfil your request and only to the extent necessary.",
      },
    ],
  },
  {
    heading: "Cookies and analytics",
    blocks: [
      {
        type: "p",
        text: "We use essential cookies and similar technologies to keep the Services functioning and to understand how they are used so we can improve them. You can control cookies through your browser settings, though some features may not work without them.",
      },
    ],
  },
  {
    heading: "Data retention",
    blocks: [
      {
        type: "p",
        text: "We keep your information only for as long as needed to provide the Services, comply with our legal obligations, resolve disputes, and enforce our agreements. Temporary data such as OTPs is kept only briefly and then expired or deleted.",
      },
    ],
  },
  {
    heading: "Data security",
    blocks: [
      {
        type: "p",
        text: "We use reasonable technical and organizational measures to protect your information against unauthorized access, loss, or misuse. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
      },
    ],
  },
  {
    heading: "Your rights",
    blocks: [
      {
        type: "p",
        text: "Subject to applicable law, you may request access to, correction of, or deletion of your personal information, and you may withdraw consent to certain processing or opt out of non-essential communications. To exercise these rights, contact us using the details below.",
      },
    ],
  },
  {
    heading: "Children's privacy",
    blocks: [
      {
        type: "p",
        text: "The Services are intended for prospective students. If a minor uses the Services, we expect a parent or legal guardian to do so on their behalf. We do not knowingly collect data from children without appropriate consent.",
      },
    ],
  },
  {
    heading: "International transfers",
    blocks: [
      {
        type: "p",
        text: "Because we work with students and institutions worldwide, your information may be processed in countries other than your own. Where we transfer data internationally, we take steps to ensure it remains protected in line with this Policy.",
      },
    ],
  },
  {
    heading: "Changes to this policy",
    blocks: [
      {
        type: "p",
        text: "We may update this Privacy Policy from time to time. When we do, we will revise the “Last updated” date above. We encourage you to review this page periodically.",
      },
    ],
  },
  {
    heading: "Contact us",
    blocks: [
      {
        type: "p",
        text: (
          <>
            For privacy questions or to exercise your rights, email{" "}
            <a href="mailto:privacy@edmaster.ai" className="font-medium text-primary hover:underline">
              privacy@edmaster.ai
            </a>{" "}
            or reach us through our{" "}
            <Link href="/get-started" className="font-medium text-primary hover:underline">
              contact page
            </Link>
            . See also our{" "}
            <Link href="/terms" className="font-medium text-primary hover:underline">
              Terms &amp; Conditions
            </Link>
            .
          </>
        ),
      },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      lastUpdated="June 13, 2026"
      intro="Your privacy matters to us. This policy explains what information we collect, why we collect it, and the choices you have."
      sections={sections}
    />
  )
}
