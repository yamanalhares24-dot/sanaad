import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        Developed by
        <a href="https://gitlab.com/yamanalhares24">YAMAN ALHARES</a>
      </div>

      <div className="footer-center">
        <img src="assets/logo.png" alt="Salinaka Eyewear Logo" />
        <p>© 2025</p>
      </div>

      <div className="footer-right">
        Fork this project <a href="#">HERE</a>
      </div>
    </footer>
  );
}

export default Footer;