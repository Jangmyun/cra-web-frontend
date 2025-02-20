import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '~/api/project.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import Modal from 'react-modal';
import styles from '../Project/ProjectModal.module.css';
import { Link } from 'react-router-dom';
import MONITOR from '~/assets/images/monitor.png';
import { MdClose } from 'react-icons/md';
const ProjectModal = ({
  projectId,
  closeModal,
}: {
  projectId: number;
  closeModal: () => void;
}) => {
  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEY.project.projectById(projectId),
    queryFn: async () => getProjectById(projectId),
  });

  if (isLoading) {
    return (
      <Modal isOpen onRequestClose={closeModal}>
        Loading...
      </Modal>
    );
  }

  if (isError || !project) {
    return (
      <Modal isOpen onRequestClose={closeModal}>
        <div>에러가 발생했습니다.</div>
        <button onClick={closeModal}>닫기</button>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        className={styles.modalContent}
        overlayClassName={styles.overlay}
        isOpen
        onRequestClose={closeModal}
      >
        <div className={styles['modal-header']}>
          {project.serviceName}
          <Link
            to={project.serviceUrl}
            target="_blank"
            rel="none"
            className={styles['url-button']}
          >
            URL 이동
          </Link>
        </div>
        <div className={styles['modal-body']}>
          <img src={project.imageUrl} className={styles['image']} />
          <img src={MONITOR} className={styles['image2']} />

          <div className={styles['description']}>
            <div className={styles['content-description']}>
              <div>프로젝트 설명</div>
            </div>
            <div>{project.content}</div>
          </div>

          <div className={styles['right']}>
            <p>Members: {project.members}</p>
            <p>Semester: {project.semester}</p>
          </div>
        </div>
        <div className={styles['modal-footer']}>
          <button onClick={closeModal} className={styles['close-button']}>
            <MdClose /> {/* 닫기 버튼 아이콘 */}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ProjectModal;
