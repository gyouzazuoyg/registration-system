import { PageHeader } from 'antd';
import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="PrivacyPage">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Back"
      />
      <br />
      <br />
      <h1>Privacy Policy</h1>
      <p>Effective date: Dec 7th, 2021</p>
      <p>
        This page informs you of our policies regarding the collection, use, and
        disclosure of personal data when you use our Service and the choices you
        have associated with that data.
      </p>
      <p>
        We use your data to provide and improve the Service. By using the
        Service, you agree to the collection and use of information in
        accordance with this policy. Unless otherwise defined in this Privacy
        Policy, terms used in this Privacy Policy have the same meanings as in
        our Terms and Conditions
      </p>
      <br />
      <br />
      <h2>Information Collection And Use</h2>
      <p>
        We collect several different types of information for various purposes
        to provide and improve our Service to you.
      </p>
      <br />
      <br />
      <h3>Types of Data Collected</h3>
      <h4>Personal Data</h4>
      <p>
        While using our Service, we may ask you to provide us with certain
        personally identifiable information that can be used to contact or
        identify you ("Personal Data"). Personally identifiable information:
      </p>
      <ul>
        <li>Email address</li>
        <li>Github username</li>
        <li>Github avatar</li>
      </ul>
      <br />
      <br />
      <h4>Usage Data</h4>
      <p>
        We may also collect information how the Service is accessed and used
        ("Usage Data"). This Usage Data may include information such as your
        browser type, browser version, the pages of our Service that you visit,
        the time and date of your visit, the time spent on those pages, unique
        device identifiers and other diagnostic data. However, we anonymize your
        Internet Protocol address.
      </p>
      <br />
      <br />
      <h2>Use of Data</h2>
      <p>BYZCourses uses the collected data for various purposes:</p>
      <ul>
        <li>Session Cookies. We use Session Cookies to operate our Service.</li>
        <li>
          Preference Cookies. We use Preference Cookies to remember your
          preferences and various settings.
        </li>
        <li>
          Security Cookies. We use Security Cookies for security purposes
          (Cloudflare, Stripe)
        </li>
      </ul>
    </div>
  );
}

export default PrivacyPolicy;
