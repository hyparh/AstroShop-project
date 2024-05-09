export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-form">
      <div className="footer-container">
        <p>&copy; Astro Shop {currentYear}</p>
        <a href="https://www.celestron.com/" target="_blank"><img src="/logos/1.png" alt="" /></a>
        <a href="https://global.vixen.co.jp/en/" target="_blank"><img src="/logos/2.jpg" alt="" /></a>
        <a href="https://skywatcher.com/" target="_blank"><img src="/logos/3.jpg" alt="" /></a>
        <a href="https://www.orionoptics.co.uk/" target="_blank"><img src="/logos/4.png" alt="" /></a>
        <a href="https://www.bresser.de/en/Brand/Bresser/" target="_blank"><img src="/logos/5.jpg" alt="" /></a>
        <a href="https://www.omegon.eu/" target="_blank"><img src="/logos/6.jpg" alt="" /></a>
        <a href="https://levenhuk.com/" target="_blank"><img src="/logos/7.png" alt="" /></a>
      </div>
    </footer>
  );
}
