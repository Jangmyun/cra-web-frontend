import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Vector from '~/assets/images/Vector/Arrow-Vector.png?format=webp&as=srcset';
import Vector2 from '~/assets/images/Vector/Arrow-Vector2.png?format=webp&as=srcset';
import CR from '~/assets/images/RecruitImage/CR.png?format=webp&as=srcset';
import A from '~/assets/images/RecruitImage/A.png?format=webp&as=srcset';
import SCRETCH from '~/assets/images/RecruitImage/scretch.png?format=webp&as=srcset';
import CONTENT from '~/assets/images/RecruitImage/content.png?format=webp&as=srcset';
import styles from './RecruitPage.module.css';
const clubContents = [
  {
    number: '01',
    content: (
      <>
        다른 사람과 협력하며 공동의 목표를 <br />
        이루고 서로 배우고 발전하며{' '}
        <span style={{ color: 'var(--color-primary)' }}>함께 성장</span>
        하고 싶은 사람
      </>
    ),
  },
  {
    number: '02',
    content: (
      <>
        어떤 문제든 두려움 없이 극복하려는 의지를 가지고
        <br />
        새로운 기회를 탐구하는 용기와{' '}
        <span style={{ color: 'var(--color-primary)' }}>도전 의식</span>을 지닌
        사람
      </>
    ),
  },
  {
    number: '03',
    content: (
      <>
        익숙하지 않은 새로운 지식을 접할 때도 적극적으로 받아들이고
        <br />
        실수를 통해 성장하며 자신의 능력을 확장하려고{' '}
        <span style={{ color: 'var(--color-primary)' }}>노력</span>하는 사람
      </>
    ),
  },
  {
    number: '04',
    content: (
      <>
        자신이 맡은 일을 끝까지 책임지고 완수하며 <br />
        팀과 조직을 위해 기여하고자 하는{' '}
        <span style={{ color: 'var(--color-primary)' }}>책임감</span>이 강한
        사람
      </>
    ),
  },
];

export default function RecruitPage() {
  const recruitTalentRef = useRef<HTMLDivElement>(null);
  const scrollToSection = () => {
    recruitTalentRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }, // 30% 이상 보이면 실행
    );

    if (recruitTalentRef.current) {
      observer.observe(recruitTalentRef.current);
    }

    return () => {
      if (recruitTalentRef.current) {
        observer.unobserve(recruitTalentRef.current);
      }
    };
  }, []);

  //---------------------디지인 시도----------------------------
  const [isExpanding, setIsExpanding] = useState(false);
  const titleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanding(true); // 애니메이션 시작 (늘어남)
    }, 1000); // 1초 뒤에 CR과 A가 이동 시작

    const resetTimer = setTimeout(() => {
      setIsExpanding(false); // 3초 뒤에 원래대로 돌아가게
    }, 4500); // 4.5초 뒤에 애니메이션을 원래 상태로 되돌리기

    const scrollTimer = setTimeout(() => {
      titleRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      setTimeout(() => {
        setIsExpanding(true); // 다시 벌어짐
      }, 1000); // 스크롤이 끝난 후 1초 뒤 실행
    }, 4800); // 애니메이션 종료 직후 실행

    return () => {
      clearTimeout(timer);
      clearTimeout(resetTimer);
      clearTimeout(scrollTimer);
    };
  }, []);
  //------------------------------------------------------------

  return (
    <div className={styles['recruit-container']}>
      <div className={styles['recruit-main1']}>
        <div className={styles['recruit-banner1']}>
          <img
            srcSet={CR}
            className={`${styles['cr-image']} ${isExpanding ? styles['cr-expand'] : ''}`}
          />
          <img
            srcSet={SCRETCH}
            className={`${styles['scratch-image']} ${isExpanding ? styles['scratch-expand'] : ''}`}
          />
          <img
            srcSet={A}
            className={`${styles['a-image']} ${isExpanding ? styles['a-expand'] : ''}`}
          />
          <img
            srcSet={CONTENT}
            className={`${styles['content-image']} ${isExpanding ? styles['content-expand'] : ''}`}
          />
        </div>
      </div>
      <div className={styles['recruit-main']}>
        <div className={styles['recruit-banner']}>
          <p id={styles['title']}>2025-1 CRA</p>
          <p id={styles['title']}>RECRUITMENT</p>
          <p ref={titleRef} id={styles['content']}>
            CRA와 함께 성장 할 25-1 기수 동아리원을 모집합니다.
          </p>
          <div className={styles['recruit-apply1']}>
            <Link to="https://docs.google.com/forms/d/e/1FAIpQLSf5uTQbDr7i9WjPfI61hMJ_PqDS1Of_fZRNpD8MRzlvnYFsKA/closedform">
              <button className={styles['button-style']}>지원하기</button>
            </Link>
          </div>
          <div className={styles['vector']} onClick={scrollToSection}>
            <img srcSet={Vector2} loading="lazy" />
            <img srcSet={Vector} loading="lazy" />
            <img srcSet={Vector2} loading="lazy" />
          </div>
        </div>
      </div>

      <div className={styles['recruit-talent']}>
        <h2
          ref={recruitTalentRef}
          className={`${styles['recruit-title']} ${isVisible ? styles['animate'] : ''}`}
        >
          이런 사람과 함께 하고 싶어요
        </h2>

        <div ref={recruitTalentRef} className={styles['recruit-talentDetail']}>
          {clubContents.map((item, index) => (
            <div key={index}>
              <span className={styles['number']}>{item.number}</span>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* <div className={styles['recruit-content']}>
        <h2>모집 개요</h2>
        <div className={styles['recruit-contentDetail']}>
          <div className={styles['recruit-outline']}>
            <h3>지원 자격</h3>
            <ul>
              <li>전산 분야에 관심 있는 누구나</li>
              <li>매 학기 개강/종강 총회에 참여 가능하신 분</li>
              <li>컴퓨터 분야의 최신 기술을 공부 및 연구하고 싶으신 분</li>
              <li>
                함께 전산 분야 관련 스터디를 하며 동아리원들과 교류하고 싶으신
                분
              </li>
              <li>웹/앱/AI 등 프로젝트를 진행하고 싶으신 분</li>
              <li>컴퓨터공학에 관심 있는 25학번 뚝딱이</li>
            </ul>
          </div>

          <div className={styles['recruit-outline']}>
            <h3>지원 방법</h3>
            <ul>
              <li>1차 서류: 리크루팅 폼에서 지원서 작성</li>
              <li>2차 면접: 대면 면접 이후 최종합격</li>
            </ul>
          </div>
        </div>
      </div> */}

      <div className={styles['recruit-calender']}>
        <h2>모집 일정</h2>
        <div className={styles['calender-line']}>
          <div className={styles['calender-box']}>
            <h3>서류 접수</h3>
            <p>3/4(화)~ 3/18(화)</p>
          </div>
          <div className={styles['calender-box']}>
            <h3>서류 합격 발표</h3>
            <p>3/21(금)</p>
          </div>
          <div className={styles['calender-box']}>
            <h3>면접</h3>
            <p>3/24(월)~ 3/26(수)</p>
          </div>
          <div className={styles['calender-box']}>
            <h3>최종합격 발표</h3>
            <p>3/28(금)</p>
          </div>
        </div>
      </div>

      <div className={styles['recruit-apply']}>
        <h1>CRA와 함께 성장하고 싶다면</h1>
        <Link to="https://docs.google.com/forms/d/e/1FAIpQLSf5uTQbDr7i9WjPfI61hMJ_PqDS1Of_fZRNpD8MRzlvnYFsKA/closedform">
          <button className={styles['button-style']}>지원하기</button>
        </Link>
      </div>
    </div>
  );
}
