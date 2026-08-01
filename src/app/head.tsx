export default function Head() {
  return (
    <>
      <title>
      Play Next.js - SaaS Starter Kit and Boilerplate for Next.js
      </title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="This SaaS Boilerplate and Starter Kit for Next.js is designed specifically for SaaS startups. It's a free resource complete with all the necessary integrations, pages, and components you require to build and launch a comprehensive SaaS website with robust features." />
      <link rel="icon" href="/favicon.ico" />

      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NJJC2MGP');`,
        }}
      />
      {/* End Google Tag Manager */}
    </>
  );
}
