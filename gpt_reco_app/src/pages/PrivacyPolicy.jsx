import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <h2 className="text-2xl font-semibold mb-3">🛡️ Our Commitment as an EU Company</h2>
      <p className="mb-6">
        We are proudly an EU-based company, which means we strictly adhere to the General Data Protection Regulation (GDPR). This regulation is one of the most rigorous data protection laws globally, designed to safeguard the personal data and privacy of individuals within the European Union. Being subject to GDPR means we are committed to maintaining the highest standards of data protection, ensuring transparency in how data is handled, and respecting your rights as a user. Our compliance reflects our dedication to protecting your privacy and building trust through responsible data practices.
      </p>

      <h2 className="text-2xl font-semibold mb-3">📜 Understanding GDPR</h2>
      <p className="mb-6">
        The GDPR is a comprehensive legal framework that governs the collection, processing, storage, and protection of personal data belonging to individuals in the EU. It emphasizes principles such as lawfulness, fairness, and transparency, requiring organizations to be clear about how they use personal data. It also enforces purpose limitation, meaning data must only be collected for specific, legitimate reasons, and data minimization, which restricts the amount of data collected to what is strictly necessary. Accuracy, storage limitation, integrity, confidentiality, and accountability are also core tenets, ensuring data is kept accurate, secure, and only for as long as needed. Importantly, GDPR empowers individuals with rights over their data, including access, correction, deletion, and portability.
      </p>

      <h2 className="text-2xl font-semibold mb-3">🔒 Our Data Collection Practices</h2>
      <p className="mb-6">
        In full alignment with GDPR principles, we do not collect any personal data from our users. We neither store nor process any information that could identify you personally. This means that when you use our services, your privacy is inherently protected because no personal data is gathered or retained. Our platform is designed to operate without the need for personal information, ensuring that your interactions remain anonymous and secure at all times.
      </p>

      <h2 className="text-2xl font-semibold mb-3">📈 Logs and Data We Do Collect</h2>
      <p className="mb-6">
        While we do not collect personal data, we do record request timestamps in the Cloudflare console. These timestamps are automatically generated and serve purely for security and performance monitoring purposes. They do not contain any personal or identifying information and are used solely to maintain the reliability and security of our service infrastructure. This minimal data collection is essential for ensuring that our platform remains robust and responsive without compromising your privacy.
      </p>

      <h2 className="text-2xl font-semibold mb-3">🤝 Your Privacy Matters to Us</h2>
      <p>
        Protecting your privacy is a fundamental priority for us. We take all necessary technical and organizational measures to ensure that any data we handle is kept safe, confidential, and secure. Our commitment extends beyond compliance; it is about fostering a trustworthy environment where you can use our services with confidence, knowing that your privacy is respected and safeguarded at every step.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
