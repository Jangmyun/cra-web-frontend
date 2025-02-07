import Modal from 'react-modal';
import styles from '../Alert/AlertModal.module.css';

const AlertModal = ({
  closeModal,
  message,
}: {
  closeModal: () => void;
  message: string;
}) => {
  return (
    <>
      <Modal
        className={styles.modalContent}
        overlayClassName={styles.overlay}
        isOpen
        onRequestClose={closeModal}
      >
        <div className={styles['modal-header']}>
          <button onClick={closeModal} className={styles['close-button']}>
            ✖
          </button>
        </div>
        <div className={styles['modal-body']}>{message}</div>
        <button className={styles['check-button']} onClick={closeModal}>
          확인
        </button>
      </Modal>
    </>
  );
};

export default AlertModal;
