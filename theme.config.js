import React from 'react';

const YEAR = new Date().getFullYear()

export default {
  footer: (
    <small style={{ display: 'block', marginTop: '8rem' }}>
      <time>{YEAR}</time> © HΩ
      <div className="footerlinks">
         <a href="https://bsky.app/profile/horizonomega.org">Follow us on Bluesky</a>
         <a href="https://horizonomega.substack.com/">Follow us on Substack</a>
      <a href="https://horizonomega.notion.site/Horizon-Omega-Privacy-policy-92dcc814305a405db968dfcf48b70ab6">Privacy policy</a>
      </div>
      <style jsx>{`
        .footerlinks {
          float: right;
        }
        .footerlinks a {
          padding-left: 1rem;
        }
        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
    </small>
  )
}
