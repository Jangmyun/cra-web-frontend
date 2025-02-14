import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderIntro from '~/components/Header/Intro-Header/HeaderIntro.tsx';
import Vector from '~/assets/images/Vector/Arrow-Vector.png';
import Vector2 from '~/assets/images/Vector/Arrow-Vector2.png';
import Crang1 from '~/assets/images/pixelcrang/pixelcrang1.svg';
import Crang2 from '~/assets/images/pixelcrang/pixelcrang2.svg';
import Crang3 from '~/assets/images/pixelcrang/pixelcrang3.svg';
import Crang4 from '~/assets/images/pixelcrang/pixelcrang4.svg';
import blurround from '~/assets/images/black-blur-round.svg';
import CRA_ITAXI from '~/assets/images/project/itaxi.png';
import CRA_HSAFARI from '~/assets/images/project/hsafari.png';
import CRA_TIMETABLE from '~/assets/images/project/timetable.png';
import CRA_WEB from '~/assets/images/project/24-2/craweb.png';
import CRA_MALLANG from '~/assets/images/project/24-2/mallang.jpg';
import CRA_IMAGE1 from '~/assets/images/main/crabig.jpg';
import CRA_IMAGE2 from '~/assets/images/main/crastudy2.jpg';
import CRA_IMAGE3 from '~/assets/images/main/cradevelop.jpg';
import styles from './IntroPage.module.css';

export default function IntroPage() {
  const [isVertical, setIsVertical] = useState(window.innerWidth <= 1024);
  const ref = useRef<HTMLDivElement>(null);
  const scrollToSection = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  useEffect(() => {
    const handleResize = () => setIsVertical(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 여기부터 페이지 컴포넌트
  return (
    <div className={styles['container']}>
      <div className={styles['main']}>
        {/* 인트로페이지 헤더 */}
        <HeaderIntro />

        <div className={styles.section}>
          {/* 처음 문구 */}
          <div className={styles.comment}>
            <div>CRA와 함께 성장할 동아리원을 모집합니다</div>
          </div>

          {/* 배너 */}
          <div className={styles.banner}>
            <div>Why not change the</div>
            <div className={styles.helloworld}>hello world!</div>
          </div>

          {/* 크랑이 여러마리 */}
          <div className={styles.CranEES}>
            <img
              className={`${styles.crangE} ${styles.character1}`}
              src={Crang1}
            />
            <img
              className={`${styles.crangE} ${styles.character2}`}
              src={Crang2}
            />
            <img
              className={`${styles.crangE} ${styles.character3}`}
              src={Crang3}
            />
            <img
              className={`${styles.crangE} ${styles.character4}`}
              src={Crang4}
            />
          </div>

          {/* 리크루팅 페이지로 가는 버튼 */}
          <Link to="/recruit" className={styles['recruit-btn']}>
            <p>2025-1 CRA RECRUITMENT</p>
          </Link>

          {/* 누르면 밑으로 내려가는 화살표 */}
          <div className={styles.vector} onClick={scrollToSection}>
            <img src={Vector2} />
            <img src={Vector} />
          </div>
        </div>
      </div>

      {/* CRA 소개 Hook 문구 */}
      <div ref={ref} className={styles.section2}>
        <div className={styles.comment2}>
          <div>세대를 아우르는 열정과 끈끈한 유대감의 동아리,</div>
          <div>CRA를 소개합니다.</div>
        </div>
        <img className={styles['blur-round']} src={blurround} />
      </div>

      {/* CRA */}
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

      {/* CRA 소개 및 이미지 */}
      <div className={styles.club}>
        {isVertical ? (
          <>
            <div className={styles['club-container']}>
              <div className={styles['club-card']}>
                <div className={styles['club-title']}>
                  <p>탄탄하고 끈끈한 네트워크</p>
                </div>
                {/* 이미지 1 */}
                <div className={styles['club-image']}>
                  <img src={CRA_IMAGE1} />
                </div>
                <div className={styles['club-content']}>
                  <div className={styles['club-content1']}>
                    <p>현재 재학생 약 50명, 졸업생 약 200명으로 구성</p>
                    <p>되어 있으며, 매년 재학생과 졸업생 모두가 모이는</p>
                    <p>‘큰모임’이 진행됩니다.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles['club-container']}>
              <div className={styles['club-card']}>
                <div className={styles['club-title']}>
                  <p>함께 성장하기에 최고로 좋은 환경</p>
                </div>
                {/* 이미지 2 */}
                <div className={styles['club-image']}>
                  <img src={CRA_IMAGE2} />
                </div>
                <div className={styles['club-content']}>
                  <div className={styles['club-content1']}>
                    <p>
                      선의의 경쟁을 통해 좋은 자극을 받을 수 있는 동료들이
                      기다리고 있습니다.
                    </p>
                    <p>24시간 이용 가능한 동방에서 </p>
                    <p>
                      모르는 것이 있으면 서로 물어보거나 토론을 하기도 합니다.
                    </p>
                  </div>
                  <div className={styles['club-content1']}>
                    <p>
                      단순히 혼자서 공부하는 것이 아닌, ‘질문하고 토론하라!’
                    </p>
                    <p>
                      하브루타 공부법으로 더욱 심도있게 탐구하고 토론합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles['club-container']}>
              <div className={styles['club-card']}>
                <div className={styles['club-title']}>
                  <p>리얼로다가! 개발을 합니다</p>
                </div>
                {/* 이미지 3 */}
                <div className={styles['club-image']}>
                  <img src={CRA_IMAGE3} />
                </div>
                <div className={styles['club-content']}>
                  <div className={styles['club-content1']}>
                    <p>신입회원은 방학 프로젝트를 진행하게 됩니다.</p>
                    <p>
                      선배의 가이드와 함께 지식을 공부하고 실제로 프로젝트를
                      기획하며 개발합니다.
                    </p>
                  </div>
                  <div className={styles['club-content1']}>
                    <p>
                      더 나아가, 실제로 개발의 결과물을 바탕으로 서비스를 출시할
                      수도 있습니다.
                    </p>
                    <p>현재 서비스 중인 프로젝트에 투입되어 </p>
                    <p>
                      서비스 유지보수 및 유저와 소통하는 방법을 학부생으로서
                      경험하게 됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 모바일 디자인 */}
            <div className={styles['club-container']}>
              <div className={styles['club-card']}>
                <div className={styles['club-title']}>
                  <p>탄탄하고 끈끈한</p>
                  <p>네트워크</p>
                </div>
                <div className={styles['club-content']}>
                  <div className={styles['club-content1']}>
                    <p>현재 재학생 약 50명, 졸업생 약 200명으로 구성</p>
                    <p>되어 있으며, 매년 재학생과 졸업생 모두가 모이</p>
                    <p>는 ‘큰모임’이 진행됩니다.</p>
                  </div>
                  <div className={styles['club-content1']}>
                    <p>재학생들은 대기업, 공기업, 스타트업, 실리콘 밸</p>
                    <p>리, 대학원 등 다양한 직군에 계시는 졸업생 선배</p>
                    <p>님들로부터 많은 도움을 받을 수 있습니다.</p>
                  </div>
                </div>
              </div>
              <div className={styles['club-image']}>
                <img src={CRA_IMAGE1} />
              </div>
            </div>

            <div className={styles['club-container']}>
              <div className={styles['club-image']}>
                <img src={CRA_IMAGE2} />
              </div>
              <div className={styles['club-card1']}>
                <div className={styles['club-title']}>
                  <p>함께 성장하기에</p>
                  <p>최고로 좋은 환경</p>
                </div>
                <div className={styles['club-content']}>
                  <div className={styles['club-content1']}>
                    <p>선의의 경쟁을 통해 좋은 자극을 받을 수 있는 동</p>
                    <p>료들이 기다리고 있습니다. 24시간 이용 가능한</p>
                    <p>동방에서 모르는 것이 있으면 서로 물어보거나 토</p>
                    <p>론을 하기도 합니다.</p>
                  </div>
                  <div className={styles['club-content1']}>
                    <p>단순히 혼자서 공부하는 것이 아닌, ‘질문하고 토</p>
                    <p>론하라!’ 하브루타 공부법으로 더욱 심도있게 탐</p>
                    <p>구하고 토론합니다.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles['club-container']}>
              <div className={styles['club-card']}>
                <div className={styles['club-title']}>
                  <p>리얼로다가!</p>
                  <p>개발을 합니다</p>
                </div>
                <div className={styles['club-content']}>
                  <div className={styles['club-content1']}>
                    <p>신입회원은 방학 프로젝트를 진행하게 됩니다. 선</p>
                    <p>배의 가이드와 함께 지식을 공부하고 실제로 프로</p>
                    <p>젝트를 기획하며 개발합니다.</p>
                  </div>
                  <div className={styles['club-content1']}>
                    <p>더 나아가, 실제로 개발의 결과물을 바탕으로 서</p>
                    <p>비스를 출시할 수도 있습니다. 현재 서비스 중인</p>
                    <p>프로젝트에 투입되어 서비스 유지보수 및 유저와</p>
                    <p>소통하는 방법을 학부생으로서 경험하게 됩니다.</p>
                  </div>
                </div>
              </div>
              <div className={styles['club-image']}>
                <img src={CRA_IMAGE3} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* 프로젝트 소개 부분 */}
      <div className={styles.project}>
        <p className={styles.ProjectBanner}>CRA 프로젝트 소개</p>

        {/* 아이택시 */}
        <div className={styles.ProjectSection}>
          <img src={CRA_ITAXI} className={styles.ProjectImage} />
          <p className={styles.ProjectTitle}>아이택시</p>
          <div className={styles.ProjectContext}>
            <p>
              한동인의 No.1 교통 애플리케이션입니다.
              <br />
              많은 CRA 동아리원들의 노력으로 빚어졌으며, 현재에도 학기 중에
              틈틈이 개발하고 있습니다.
              <br />
              앞으로 합승 후 정산하기에 도움이 되도록 확장 준비중입니다.
              <br />
            </p>
            <p className={styles.ProjectStack}>
              개발스택: Flutter, Firebase, GCP, AWS, Java Spring boot
            </p>
          </div>
        </div>

        {/* H-Safari */}
        <div className={styles.ProjectSection}>
          <img src={CRA_HSAFARI} className={styles.ProjectImage} />
          <p className={styles.ProjectTitle}>H-Safari</p>
          <div className={styles.ProjectContext}>
            <p>
              한동인들의 중고거래 플랫폼을 제공하는 서비스입니다.
              <br />
              20-1학기 신입 방학 프로젝트 때 제작되었습니다.
              <br />
            </p>
            <p className={styles.ProjectStack}>
              개발스택: Flutter, Node.js, Firebase
            </p>
          </div>
        </div>

        {/* Histime */}
        <div className={styles.ProjectSection}>
          <img src={CRA_TIMETABLE} className={styles.ProjectImage} />
          <p className={styles.ProjectTitle}>대학 시간</p>
          <div className={styles.ProjectContext}>
            <p>
              Histime 재개발 프로젝트입니다!
              <br />
              재학생 중 천명이 넘게 사용하고 있으며, 재정비하여 2주차부터
              서비스를 시작하려고 합니다.
              <br />
              앞으로 합승 후 정산하기에 도움이 되도록 확장 준비중입니다.
              <br />
            </p>
            <p className={styles.ProjectStack}>
              개발스택: Flutter, Firebase, GCP, AWS, Java Spring boot
            </p>
          </div>
        </div>

        <p className={styles.ProjectBanner}>CRA 24-2 신입 프로젝트</p>

        {/* 말랑 타격대 */}
        <div className={styles.ProjectSection}>
          <img src={CRA_MALLANG} className={styles.ProjectImage} />
          <p className={styles.ProjectTitle}>말랑 타격대!!</p>
          <div className={styles.ProjectContext}>
            <p>
              자원을 모아 건물을 짓고, 유닛을 생산해 전략적으로 상대 본진을
              파괴하는 실시간 전략 게임입니다.
              <br />
              그린캠프 팀의 야심작입니다.
              <br />
            </p>
            <p className={styles.ProjectStack}>
              개발스택: Unity, Photon Server
            </p>
          </div>
        </div>

        {/* 크라 홈페이지 */}
        <div className={styles.ProjectSection}>
          <img src={CRA_WEB} className={styles.ProjectImage} />
          <p className={styles.ProjectTitle}>CRA 홈페이지</p>
          <div className={styles.ProjectContext}>
            <p>
              CRA의 새로운 페이지를 제작하는 웹 개발 프로젝트입니다.
              <br />
              동아리의 소개와 CRA 회원들만의 소통 공간 제공합니다.
              <br />
              25-1 학기에 출시를 목표로 하고 있습니다.
              <br />
            </p>
            <p className={styles.ProjectStack}>
              개발스택: React, Spring Boot, MySQL, AWS
            </p>
          </div>
        </div>

        <div className={styles.ProjectMore}>
          <Link to="/project"></Link>
        </div>
      </div>
    </div>
  );
}
