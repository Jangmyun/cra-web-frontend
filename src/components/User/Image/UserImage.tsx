import { useUserStore } from '~/store/userStore';
import styles from '../UserPage.module.css';

function UserImage() {
  const { imgUrl, setUser } = useUserStore();
  return <div className={styles.container}>ㅇㄴ</div>;
}

export default UserImage;
