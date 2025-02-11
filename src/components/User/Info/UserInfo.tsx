import React from 'react';
import { useUserStore } from '~/store/userStore';
import { Link } from 'react-router-dom';
import CRANG from '~/assets/images/Status_Crang.png';
import styles from '../UserPage.module.css';

function UserInfo() {
  const { name, email, studentId, term, githubId, imgUrl } = useUserStore();
  const gitHubLink = 'https://github.com/' + githubId;
  console.log('당신의 이름:' + name);
  return (
    <div className={styles.container}>
      <div className={styles.title}>마이페이지</div>
      <div className={styles.profile}>
        <p>프로필 사진 </p>
        <img src={CRANG}></img>
      </div>
      <div className={styles.info}>
        <p>이름 </p>
        {name}
      </div>
      <div className={styles.info}>
        <p>이메일 </p>
        {email}
      </div>
      <div className={styles.info}>
        <p>학번 </p>
        {studentId}
      </div>
      <div className={styles.info}>
        <p>기수 </p>
        {term}
      </div>
      <div className={styles.info}>
        <p>GitHub: </p>
        <Link to={gitHubLink} className={styles.link}>
          {githubId}
        </Link>
      </div>
      <div className={styles.buttons}>
        <button className={styles.profile}>프로필 사진 변경</button>
        <button className={styles.edit}>유저 정보 수정</button>
        <button className={styles.delete}>유저 삭제</button>
      </div>
    </div>
  );
}

export default UserInfo;
