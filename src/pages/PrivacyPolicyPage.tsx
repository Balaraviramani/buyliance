
import PolicyPage from "@/components/common/PolicyPage";

const PrivacyPolicyPage = () => {
  return (
    <PolicyPage title="Privacy Policy">
      <h2>1. Information We Collect</h2>
      <p>We collect the following types of information:</p>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, billing address, shipping address.</li>
        <li><strong>Payment Information:</strong> Credit card details, banking information (processed securely through our payment processors).</li>
        <li><strong>Usage Information:</strong> Browser type, IP address, device information, pages visited, time spent on the website.</li>
        <li><strong>Cookies:</strong> We use cookies to enhance your browsing experience and provide personalized content.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information for the following purposes:</p>
      <ul>
        <li>Process and fulfill your orders</li>
        <li>Communicate with you about your orders</li>
        <li>Send you marketing communications (if you opt in)</li>
        <li>Improve our website and services</li>
        <li>Prevent fraud and enhance security</li>
      </ul>

      <h2>3. Information Sharing</h2>
      <p>We may share your information with:</p>
      <ul>
        <li>Payment processors to complete transactions</li>
        <li>Shipping partners to deliver your orders</li>
        <li>Marketing partners (with your consent)</li>
        <li>Legal authorities when required by law</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>

      <h2>5. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your personal information</li>
        <li>Correct inaccurate information</li>
        <li>Delete your information (where applicable)</li>
        <li>Opt out of marketing communications</li>
        <li>Lodge a complaint with a supervisory authority</li>
      </ul>

      <h2>6. Cookie Policy</h2>
      <p>We use cookies to enhance your browsing experience. You can manage your cookie preferences through your browser settings.</p>

      <h2>7. Changes to This Policy</h2>
      <p>We may update this privacy policy from time to time. The date of the latest revision will be posted at the top of the page.</p>

      <h2>8. Contact Us</h2>
      <p>If you have any questions about this privacy policy, please contact us at <a href="mailto:privacy@buyliance.com" className="text-brand hover:underline">privacy@buyliance.com</a>.</p>
    </PolicyPage>
  );
};

export default PrivacyPolicyPage;
