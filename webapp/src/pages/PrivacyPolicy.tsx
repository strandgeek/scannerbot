import { FC } from "react";
import { TermLayout } from "../layouts/TermLayout";

export interface PrivacyPolicyProps {}

export const PrivacyPolicy: FC<PrivacyPolicyProps> = () => {
  return (
    <TermLayout>
      <h1>Privacy Policy for ScannerBot</h1>
      <ol>
        <li>
          <strong>1. Information Collection</strong>: ScannerBot, a product of
          Slints LLC, may collect personal information when users subscribe to
          the service, including but not limited to name, email address, and
          payment information. Additionally, non-personal information such as
          usage data and analytics may be collected.
        </li>
        <li>
          <strong>2. Use of Information</strong>: Personal information collected
          is used for account management, billing purposes, and to improve the
          service. ScannerBot, a product of Slints LLC, may also use aggregated
          and anonymized data for analytical purposes.
        </li>
        <li>
          <strong>3. Sharing of Information</strong>: ScannerBot, a product of
          Slints LLC, does not sell, trade, or rent users' personal information
          to third parties. However, the service may share information with
          trusted third-party service providers for operational purposes.
        </li>
        <li>
          <strong>4. Security</strong>: ScannerBot, a product of Slints LLC,
          takes reasonable measures to protect users' personal information.
          However, no method of transmission over the internet or electronic
          storage is 100% secure, and the service cannot guarantee absolute
          security.
        </li>
        <li>
          <strong>5. Consent</strong>: By using ScannerBot, a product of Slints
          LLC, users consent to the collection and use of their information as
          described in this Privacy Policy.
        </li>
        <li>
          <strong>6. Changes to Privacy Policy</strong>: ScannerBot, a product
          of Slints LLC, may update this Privacy Policy from time to time. Users
          will be notified of any changes, and continued use of the service
          constitutes acceptance of the revised Privacy Policy.
        </li>
      </ol>
    </TermLayout>
  );
};
