import styles from './Calender.module.css';

function Calender() {
  return (
    <div className={styles['recruit-calender']}>
      <h2>모집 일정</h2>
      <div className={styles['calender-line']}>
        <div className={styles['calender-box']}>
          <h3>서류 접수</h3>
          <p>2025.3.4.(화)</p>
          <p>~ 3.18.(화)</p>
        </div>
        <div className={styles['calender-box']}>
          <h3>서류 합격 발표</h3>
          <p>2025.3.21(금)</p>
        </div>
        <div className={styles['calender-box']}>
          <h3>면접</h3>
          <p>2025.3.24(월)</p>
          <p>~3.26(수)</p>
        </div>
        <div className={styles['calender-box']}>
          <h3>최종합격 발표</h3>
          <p>2025.3.28(금)</p>
        </div>
      </div>
    </div>
  );
}

export default Calender;
