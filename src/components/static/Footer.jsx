export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-form">
      <div className="footer-container">
        <p>&copy; Astro Shop {currentYear}</p>
        <img src="/logos/1.png" alt="" />
        <img src="/logos/2.jpg" alt="" />
        <img src="/logos/3.jpg" alt="" />
        <img src="/logos/4.png" alt="" />
        <img src="/logos/5.jpg" alt="" />
        <img src="/logos/6.jpg" alt="" />
        <img src="/logos/7.png" alt="" />
      </div>
    </footer>
  );
}
