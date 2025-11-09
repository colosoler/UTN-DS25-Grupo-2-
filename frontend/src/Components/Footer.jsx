import { Instagram, Mail } from 'lucide-react';
import './styles/Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3 className="footer-title">Nuestras Redes Sociales</h3>
          <a 
            href="https://www.instagram.com/utnotas/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Síguenos en Instagram"
          >
            <Instagram size={24} />
            <span>Instagram</span>
          </a>
        </div>
        
        <div className="footer-column">
          <h3 className="footer-title">Contactanos</h3>
          <a 
            href="mailto:utnotas@gmail.com" 
            className="contact-link"
          >
            <Mail size={20} />
            <span>utnotas@gmail.com</span>
          </a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="copyright">
          <span className="copyright-icon">©</span>
          Derechos reservados UTNotas 2025
        </p>
      </div>
    </footer>
  );
};