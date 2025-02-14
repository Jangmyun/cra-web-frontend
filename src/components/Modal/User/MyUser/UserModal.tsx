import Modal from 'react-modal';
import { useUserStore } from '~/store/userStore';
import logoutImage from '~/assets/images/logoutImage.png';
import { Link } from 'react-router-dom';
import styles from './UserModal.module.css';

interface UserModalProps {
  closeModal: () => void;
  handleLogout: () => void;
}

const UserModal = ({ closeModal, handleLogout }: UserModalProps) => {
  const { name, email, studentId, term, githubId, imgUrl } = useUserStore();
  const gitHubLink = 'https://github.com/' + githubId;
  return (
    <>
      <Modal
        className={styles.modalContent}
        overlayClassName={styles.overlay}
        isOpen
        onRequestClose={closeModal}
      >
        <div className={styles['modal-header']}>
          <Link to={`/user/${name}`}>
            <button onClick={closeModal} className={styles['setting-button']}>
              ⚙️
            </button>
          </Link>
        </div>
        <div className={styles['modal-body']}>
          <div className={styles['first-body']}>
            <img src={imgUrl} className={styles.profile} />
            <div className={styles['user-info']}>
              <div className={styles['semester']}>CRA {term}</div>
              <div className={styles['name']}>{name}</div>
              <div className={styles['student-number']}>{studentId}</div>
            </div>
          </div>
          <div className={styles['hanmadi']}>
            {' 나의 한마디를 입력하세요. '}
          </div>
        </div>
        <div className={styles['extra-info']}>
          <div>
            GitHub 프로필 |{' '}
            <Link to={gitHubLink} className={styles.GitHubLink} target="_blank">
              {githubId}
            </Link>
          </div>
          <div> 이메일 | {email}</div>
          <div className={styles['line']} />
        </div>
        <a className={styles['logout']} onClick={handleLogout}>
          <img src={logoutImage} className={styles['logout-image']} />
          <div>로그아웃</div>
        </a>
      </Modal>
    </>
  );
};

export default UserModal;
