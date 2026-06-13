import Link from "next/link"
import type { Metadata } from "next"
import { LegalDocument, type LegalSection } from "@/components/legal/legal-document"

export const metadata: Metadata = {
  title: "Terms & Conditions — EdMaster",
  description:
    "The terms and conditions governing your use of the EdMaster study-abroad platform and services.",
}

const sections: LegalSection[] = [
  {
    heading: "Acceptance of these terms",
    blocks: [
      {
        type: "p",
        text: "These Terms & Conditions (“Terms”) govern your access to and use of the EdMaster website, applications, AI tools, and related services (together, the “Services”). By accessing or using the Services, you agree to be bound by these Terms. If you do not agree, please do not use the Services.",
      },
      {
        type: "p",
        text: "If you are using the Services on behalf of a minor, you confirm that you are their parent or legal guardian and accept these Terms on their behalf.",
      },
    ],
  },
  {
    heading: "Who we are and what we do",
    blocks: [
      {
        type: "p",
        text: "EdMaster is a study-abroad guidance platform. We help students discover universities and courses, evaluate their profiles, and access advisory and support services such as counselling, application assistance, test preparation, education loans, accommodation, and visa-related guidance.",
      },
      {
        type: "p",
        text: "EdMaster is an independent service provider. We are not a university, government department, immigration authority, or accredited examination body, and we do not make admission or visa decisions. Information about institutions, fees, deadlines, and requirements is provided for your convenience and may change without notice.",
      },
    ],
  },
  {
    heading: "Eligibility",
    blocks: [
      {
        type: "p",
        text: "You must provide accurate, current, and complete information when using the Services. You are responsible for keeping your contact details up to date and for the accuracy of the academic and personal information you submit, which we use to generate recommendations.",
      },
    ],
  },
  {
    heading: "Accounts and verification",
    blocks: [
      {
        type: "p",
        text: "Some features require us to verify your identity using a one-time password (OTP) sent to your email or phone. You are responsible for keeping your verification codes confidential and for all activity carried out through your verified contact details. Notify us promptly of any unauthorized use.",
      },
    ],
  },
  {
    heading: "AI tools and recommendations",
    blocks: [
      {
        type: "p",
        text: "Our platform uses artificial intelligence to suggest courses, universities, and application materials based on the information you provide. These outputs are guidance only. They may contain inaccuracies and should not be treated as professional, legal, financial, or immigration advice.",
      },
      {
        type: "p",
        text: "You are responsible for independently verifying any information — including eligibility criteria, fees, deadlines, and visa rules — directly with the relevant institution or authority before acting on it.",
      },
    ],
  },
  {
    heading: "Acceptable use",
    blocks: [
      { type: "p", text: "When using the Services, you agree not to:" },
      {
        type: "list",
        items: [
          "Use the Services for any unlawful, fraudulent, or harmful purpose;",
          "Submit false, misleading, or impersonating information;",
          "Attempt to gain unauthorized access to our systems, disrupt the Services, or bypass security or rate-limit controls;",
          "Copy, scrape, resell, or commercially exploit any part of the Services or its content without our written permission;",
          "Upload content that infringes the rights of others or contains malicious code.",
        ],
      },
    ],
  },
  {
    heading: "Third-party institutions and links",
    blocks: [
      {
        type: "p",
        text: "The Services reference and link to third parties such as universities, lenders, insurers, and government portals. We do not control and are not responsible for their content, decisions, products, or services. Any dealings you have with them are solely between you and that third party.",
      },
    ],
  },
  {
    heading: "Fees and payments",
    blocks: [
      {
        type: "p",
        text: "Many features, including the AI tools, are provided free of charge. Where a paid advisory or support service applies, the scope and price will be communicated to you in advance, and any payment terms will be agreed separately before the service begins.",
      },
    ],
  },
  {
    heading: "Intellectual property",
    blocks: [
      {
        type: "p",
        text: "The Services, including their design, text, graphics, logos, and software, are owned by EdMaster or its licensors and are protected by applicable intellectual-property laws. We grant you a limited, non-exclusive, non-transferable right to use the Services for your personal, non-commercial study-abroad needs.",
      },
    ],
  },
  {
    heading: "Your content",
    blocks: [
      {
        type: "p",
        text: "You retain ownership of the information and documents you submit. By submitting them, you grant EdMaster a license to process and use that content for the purpose of providing the Services to you, in accordance with our Privacy Policy.",
      },
    ],
  },
  {
    heading: "No guarantee of outcomes",
    blocks: [
      {
        type: "p",
        text: "Admission, scholarship, loan, insurance, and visa outcomes are determined entirely by the relevant institutions and authorities. EdMaster does not guarantee any specific result, and using our Services does not influence those independent decisions.",
      },
    ],
  },
  {
    heading: "Limitation of liability",
    blocks: [
      {
        type: "p",
        text: "To the maximum extent permitted by law, EdMaster and its team will not be liable for any indirect, incidental, or consequential loss, or for any loss of opportunity, savings, or data, arising from your use of or inability to use the Services. The Services are provided on an “as is” and “as available” basis without warranties of any kind.",
      },
    ],
  },
  {
    heading: "Indemnity",
    blocks: [
      {
        type: "p",
        text: "You agree to indemnify and hold EdMaster harmless from any claims, damages, or expenses arising out of your misuse of the Services or your breach of these Terms.",
      },
    ],
  },
  {
    heading: "Privacy",
    blocks: [
      {
        type: "p",
        text: (
          <>
            Your use of the Services is also governed by our{" "}
            <Link href="/privacy" className="font-medium text-primary hover:underline">
              Privacy Policy
            </Link>
            , which explains how we collect, use, and protect your information.
          </>
        ),
      },
    ],
  },
  {
    heading: "Changes to these terms",
    blocks: [
      {
        type: "p",
        text: "We may update these Terms from time to time. When we do, we will revise the “Last updated” date above. Your continued use of the Services after changes take effect constitutes acceptance of the updated Terms.",
      },
    ],
  },
  {
    heading: "Governing law",
    blocks: [
      {
        type: "p",
        text: "These Terms are governed by and construed in accordance with the laws of India, and any disputes arising from them shall be subject to the exclusive jurisdiction of the competent courts in India.",
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
            Questions about these Terms can be sent to{" "}
            <a href="mailto:support@edmaster.ai" className="font-medium text-primary hover:underline">
              support@edmaster.ai
            </a>{" "}
            or through our{" "}
            <Link href="/get-started" className="font-medium text-primary hover:underline">
              contact page
            </Link>
            .
          </>
        ),
      },
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms & Conditions"
      lastUpdated="June 13, 2026"
      intro="Please read these terms carefully before using EdMaster. They set out the rules for using our platform, AI tools, and services, and explain your rights and responsibilities."
      sections={sections}
    />
  )
}
