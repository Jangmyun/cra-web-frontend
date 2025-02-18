import styles from './IntroCRA.module.css';

function IntroCRA() {
  return (
    <div className={styles.cra}>
      <div className={styles.title}>
        <span id={styles['cap-letter']}>C</span>
        <p>omputer</p>
        <span id={styles['cap-letter']}>R</span>
        <p>esearch</p>
        <span id={styles['cap-letter']}>A</span>
        <p>ssoication</p>
      </div>

      {/* CRA 소개 */}
      <div className={styles.description}>
        <p>CRA는 한동대학교 전산 교육과정에 기초하여</p>
        <p>
          한 분야에 국한되지 않는 신기술을 공부하고 습득한 지식과 기술을 통해
        </p>
        <p>
          <span>‘배워서 남주자’</span>를 실천하는 동아리입니다.
        </p>
      </div>

      {/* CRA 소개 카드 */}
      <div className={styles.content}>
        {/* CARD 1 */}
        <div className={styles.card}>
          <p id={styles['card-title']}>CRA가 창립한지</p>
          <p id={styles['card-content']}>30년</p>
        </div>

        {/* CARD 2 */}
        <div className={styles.card}>
          <p id={styles['card-title']}>출시 서비스</p>
          <p id={styles['card-content']}>?개</p>
        </div>

        {/* CARD 3 */}
        <div className={styles.card}>
          <p id={styles['card-title']}>선배들과 함께하는</p>
          <p id={styles['card-content2']}>정기적인</p>
          <p id={styles['card-content2']}>교류활동</p>
        </div>
      </div>
    </div>
  );
}

export default IntroCRA;
