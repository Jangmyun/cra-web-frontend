import { Link } from 'react-router-dom';
import CRAProject from './CRAProject.tsx';
import CRA_ITAXI from '~/assets/images/project/itaxi.png?format=webp&as=srcset';
import CRA_HSAFARI from '~/assets/images/project/hsafari.png?format=webp&as=srcset';
import CRA_TIMETABLE from '~/assets/images/project/timetable.png?format=webp&as=srcset';
import CRA_WEB from '~/assets/images/project/24-2/craweb.png?format=webp&as=srcset';
import CRA_MALLANG from '~/assets/images/project/24-2/mallang.jpg?format=webp&as=srcset';
import CRA_ASSISTANT from '~/assets/images/project/24-2/crassistant.png?format=webp&as=srcset';
import styles from './IntroProjects.module.css';

const projects = [
  {
    image: CRA_ITAXI,
    title: '아이택시',
    description: `한동인의 No.1 교통 애플리케이션. 많은 CRA 동아리원의 노력으로 만들어졌으며, 지속적으로 개발 중. 합승 후 정산 기능도 준비 중.`,
    stack: 'Flutter, Firebase, GCP, AWS, Java Spring Boot',
  },
  {
    image: CRA_HSAFARI,
    title: 'H-Safari',
    description: `한동인들의 중고거래 플랫폼. 20-1학기 신입 방학 프로젝트로 제작됨.`,
    stack: 'Flutter, Node.js, Firebase',
  },
  {
    image: CRA_TIMETABLE,
    title: '대학 시간',
    description: `Histime 재개발 프로젝트. 재학생 천명 이상이 사용 중이며, 서비스 재정비 후 출시 예정.`,
    stack: 'Flutter, Firebase, GCP, AWS, Java Spring Boot',
  },
];

const ongoingProjects = [
  {
    image: CRA_MALLANG,
    title: '말랑 타격대',
    description: `자원을 모아 건물을 짓고 유닛을 생산해 상대 본진을 파괴하는 실시간 전략 게임. 중세기사 컨셉의 1대1 멀티플레이 게임.`,
    stack: 'Unity, Photon Server',
  },
  {
    image: CRA_WEB,
    title: 'CRA 홈페이지',
    description: `CRA의 새로운 웹페이지 개발 프로젝트. 동아리 소개 및 소통 공간 제공. 25-1학기 출시 목표.`,
    stack: 'React, Spring Boot, MySQL, AWS',
  },
  {
    image: CRA_ASSISTANT,
    title: 'Coding Roadmap Assistant',
    description: `AI 기반 코딩 보조 도우미. OpenAI API 활용, VSCode Extension으로 사용 가능.`,
    stack: 'TypeScript',
  },
];

function IntroProjects() {
  return (
    <div className={styles.project}>
      <p className={styles.ProjectBanner}>CRA 프로젝트 소개</p>

      {projects.map((project, index) => (
        <CRAProject key={index} {...project} />
      ))}

      <p className={styles.ProjectBanner}>현재 진행 중인 프로젝트</p>

      {ongoingProjects.map((project, index) => (
        <CRAProject key={index} {...project} />
      ))}

      <div className={styles.ProjectMore}>
        <p className={styles.ProjectMoreComment}>
          CRA의 더 많은 프로젝트가 궁금하다면?
        </p>
        <Link to="/project" className={styles.ProjectMoreLink}>
          프로젝트 더보기
        </Link>
      </div>
    </div>
  );
}

export default IntroProjects;
