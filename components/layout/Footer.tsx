import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import FooterStyle from '../../styles/Footer.module.scss';

const FOOTER_ICON_MAP = [
  { icon: faInstagram, href: '#' },
  { icon: faYoutube, href: '#' },
  // { icon: faBlogger, href: '#' },
];
const FOOTER_TEXT_MAP = [
  { text: 'HOME', href: '#' },
  { text: 'Services', href: '#' },
  { text: 'About', href: '#' },
  { text: 'Terms', href: '#' },
  { text: 'Privacy Policy', href: '#' },
];

const Footer = () => {
  return (
    <>
      <footer className={FooterStyle.footerContainer}>
        <div className={FooterStyle.wrapper}>
          <ul className={FooterStyle.iconWrapper}>
            {FOOTER_ICON_MAP.map(({ icon, href }) => (
              <li key={href}>
                <Link href={href}>
                  <a>
                    <FontAwesomeIcon icon={icon} size="2x" />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <ul className={FooterStyle.textWrapper}>
            {FOOTER_TEXT_MAP.map(({ text, href }) => (
              <li key={href}>
                <Link href={href}>
                  <a>{text}</a>
                </Link>
              </li>
            ))}
          </ul>
          <p className="copyright">The Folks © 2021</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
