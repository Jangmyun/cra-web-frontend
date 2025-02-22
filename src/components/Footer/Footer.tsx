import { Link } from 'react-router-dom';
import craIcon from '~/assets/images/cra-logo.png?format=webp&as=srcset';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link to="/">
            <img srcSet={craIcon} alt="크라 아이콘" loading="lazy" />
          </Link>
        </div>
        <div className={styles.description}>
          <span>C</span>
          <p>omputer </p>
          <span>R</span>
          <p>esearch </p>
          <span>A</span>
          <p>ssoication</p>
        </div>
        <div className={styles.cra206}>
          <p>한동대학교 학생회관 206호</p>
        </div>
        <div className={styles.icons}>
          <Link to="https://www.instagram.com/cra_handong/" target="_blank">
            <img
              width="32"
              height="32"
              srcSet="https://img.icons8.com/windows/32/FFFFFF/instagram-new.png"
              alt="instagram-new"
              loading="lazy"
            />
          </Link>
          <Link
            to="https://github.com/Computer-Research-Association"
            target="_blank"
          >
            <img
              width="32"
              height="32"
              srcSet="https://img.icons8.com/material-outlined/32/github.png"
              alt="github"
              loading="lazy"
            />
          </Link>
          {/* <Link to="/admin">
            <img
              width="32"
              height="32"
              srcSet="https://img.icons8.com/ios-filled/50/automatic.png"
              alt="github"
              loading="lazy" 
            />
          </Link> */}
        </div>
        <div className={styles.developer}>
          <p>DEVELOPED BY CRA</p>
        </div>
      </div>
    </div>
  );
}
