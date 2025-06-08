import React from 'react';

function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-primary">
      <h1 className="text-3xl font-bold mb-4 font-secondary">Terms of Service</h1>

      <h2 className="text-2xl font-semibold mt-6 mb-3 font-secondary">1. Acceptance of Terms</h2>
      <p className="mb-6">
        By accessing or using this service ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not use the Service.
      </p>

      <h2 className="text-2xl font-semibold mb-3 font-secondary">2. Description of the Service</h2>
      <p className="mb-6">
        The Service is provided solely as a personal side project by the creators ("Providers") without any expectation of revenue. It generates YouTube channel recommendations using the GPT-4.1-nano model. Users must supply their own OpenAI API key, and the Service uses Cloudflare Workers solely to verify YouTube URLs. No official YouTube API is employed.
      </p>

      <h2 className="text-2xl font-semibold mb-3 font-secondary">3. User Obligations</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Provide and maintain a valid OpenAI API key for use with the Service.</li>
        <li>Comply with all applicable laws, regulations, and third-party rights in your use of the Service.</li>
        <li>Refrain from misusing or attempting to disrupt the Service.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3 font-secondary">4. Intellectual Property</h2>
      <p className="mb-6">
        The Service’s underlying code and content are provided under the MIT License. All rights not expressly granted are reserved by the Providers.
      </p>

      <h2 className="text-2xl font-semibold mb-3 font-secondary">5. Disclaimer of Warranties</h2>
      <p className="mb-6">
        The Service is offered "as is" and "as available." The Providers make no warranties or representations of any kind, express or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement.
      </p>

      <h2 className="text-2xl font-semibold mb-3 font-secondary">6. Limitation of Liability</h2>
      <p className="mb-6">
        To the fullest extent permitted by law, the Providers shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising out of or in connection with your use of the Service, including any commercial or other reliance on the recommendations provided.
      </p>

      <h2 className="text-2xl font-semibold mb-3 font-secondary">7. Indemnification</h2>
      <p className="mb-6">
        You agree to indemnify, defend, and hold harmless the Providers from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys’ fees) arising out of or in any way connected with your use of the Service or violation of these Terms.
      </p>

      <h2 className="text-2xl font-semibold mb-3 font-secondary">8. Modifications to the Service or Terms</h2>
      <p className="mb-6">
        The Providers may modify or discontinue the Service or revise these Terms at any time. Material changes will be communicated through the Service. Continued use after such changes constitutes acceptance.
      </p>

      <h2 className="text-2xl font-semibold mb-3 font-secondary">9. Governing Law</h2>
      <p className="mb-6">
        These Terms are governed by and construed in accordance with the laws of the Providers’ jurisdiction (within the EU), without regard to its conflict-of-law principles.
      </p>

      <h2 className="text-2xl font-semibold mb-3 font-secondary">10. Contact</h2>
      <p>
        For questions about these Terms, you may reach the Providers through the contact information supplied in the project’s repository or website.
      </p>
    </div>
  );
}

export default TermsOfService;
