import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import FooterStyle from 'styles/common/Footer.module.scss';

const FOOTER_ICON_MAP = [
  { icon: faInstagram, href: '#1' },
  { icon: faYoutube, href: '#2' },
  // { icon: faBlogger, href: '#' },
];
const FOOTER_TEXT_MAP = [
  { text: 'HOME', href: '#3' },
  { text: 'Services', href: '#4' },
  { text: 'About', href: '#5' },
  { text: 'Terms', href: '#6' },
  { text: 'Privacy Policy', href: '#7' },
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
