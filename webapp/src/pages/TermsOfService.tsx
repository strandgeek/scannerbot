import { FC } from "react";
import { TermLayout } from "../layouts/TermLayout";

export interface TermsOfServiceProps {}

export const TermsOfService: FC<TermsOfServiceProps> = () => {
  return (
    <TermLayout>
      <h1>Terms of Service for ScannerBot</h1>
      <ol>
        <li>
          <strong>1. Acceptance of Terms</strong>: By accessing or using
          ScannerBot (referred to as "the service"), a product of Slints LLC,
          you agree to comply with and be bound by these Terms of Service. If
          you do not agree to these terms, please do not use the service.
        </li>
        <li>
          <strong>2. Description of Service</strong>: ScannerBot, a product of
          Slints LLC, is a Software-as-a-Service tool that provides a
          Cloud-based plan for users to subscribe and scan Smart Contract
          vulnerabilities. The service is offered as a complimentary tool and
          should not be considered the sole source of truth for vulnerabilities.
          Users are advised to analyze all results and use additional
          verification methods as necessary.
        </li>
        <li>
          <strong>3. Subscription and Payment</strong>: By subscribing to
          ScannerBot, a product of Slints LLC, you agree to pay the specified
          fees for the chosen plan. Payments are non-refundable unless otherwise
          stated. The service reserves the right to change subscription fees
          upon notice.
        </li>
        <li>
          <strong>4. Use of the Service</strong>: Users are solely responsible
          for their use of the service. ScannerBot, a product of Slints LLC,
          shall not be liable for any damages resulting from the use or
          inability to use the service. Users agree not to misuse the service or
          engage in activities that may disrupt the service's functionality.
        </li>
        <li>
          <strong>5. Disclaimer of Warranties</strong>: The service is provided
          on an "as is" and "as available" basis without warranties of any kind.
          ScannerBot, a product of Slints LLC, does not guarantee the accuracy,
          completeness, or reliability of the results obtained through the
          service. Users acknowledge that they use the service at their own
          risk.
        </li>
        <li>
          <strong>6. Limitation of Liability</strong>: In no event shall
          ScannerBot, a product of Slints LLC, be liable for any indirect,
          incidental, special, consequential, or punitive damages, or any loss
          of profits or revenues arising out of or related to the use or
          inability to use the service.
        </li>
        <li>
          <strong>7. Modifications to Terms</strong>: ScannerBot, a product of
          Slints LLC, reserves the right to modify these terms at any time.
          Changes will be effective immediately upon posting. Continued use of
          the service after modifications constitutes acceptance of the revised
          terms.
        </li>
      </ol>
    </TermLayout>
  );
};
