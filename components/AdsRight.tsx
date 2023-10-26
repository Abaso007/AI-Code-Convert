import React, { useEffect } from 'react';

export const AdsRight = () => {
  useEffect(() => {
    // load Google AdSense lib
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3672455877501055';
    script.async = true;
    script.setAttribute('crossorigin', 'anonymous');
    document.body.appendChild(script);
	// Load ad when AdSense library is ready
	script.onload = () => {
	  //@ts-ignore
	  const adsbygoogle = window.adsbygoogle || [];
	  console.log({ adsbygoogle });
	  adsbygoogle.push({});
	}
  }, []);

  return (
	<div className="fixed top-20 right-10 w-180 h-620 bg-transparent z-50">
		<ins className="adsbygoogle"
		     style={{ display: 'block' }}
		     data-ad-client="ca-pub-3672455877501055"
		     data-ad-slot="1462825757"
		     data-ad-format="auto"
		     data-full-width-responsive="true"></ins>
	</div>
  );
};