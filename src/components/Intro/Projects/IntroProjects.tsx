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
    description: [
      '한동인의 No.1 교통 애플리케이션입니다.',
      '많은 CRA 동아리원들의 노력으로 빚어졌으며, 현재에도 학기 중에 틈틈이 개발하고 있습니다.',
      '앞으로 합승 후 정산하기에 도움이 되도록 확장 준비중입니다.',
    ],
    stack: 'Flutter, Firebase, GCP, AWS, Java Spring Boot',
  },
  {
    image: CRA_HSAFARI,
    title: 'H-Safari',
    description: [
      '한동인들의 중고거래 플랫폼을 제공하는 서비스입니다.',
      '20-1학기 신입 방학 프로젝트 때 제작되었습니다.',
    ],
    stack: 'Flutter, Node.js, Firebase',
  },
  {
    image: CRA_TIMETABLE,
    title: '대학 시간',
    description: [
      'Histime 재개발 프로젝트입니다!',
      '재학생 중 천명이 넘게 사용하고 있으며, 재정비하여 2주차부터 서비스를 시작하려고 합니다.',
      ' 앞으로 합승 후 정산하기에 도움이 되도록 확장 준비중입니다.',
    ],
    stack: 'Flutter, Firebase, GCP, AWS, Java Spring Boot',
  },
];

const ongoingProjects = [
  {
    image: CRA_MALLANG,
    title: '말랑 타격대',
    description: [
      '자원을 모아 건물을 짓고, 유닛을 생산해 전략적으로 상대 본진을 파괴하는 실시간 전략 게임입니다.',
      '중세기사 컨셉을 가진 RTS (Real-Time-Strategy)입니다.',
      '1 대 1이 가능한 멀티플레이어 게임입니다.',
    ],
    stack: 'Unity, Photon Server',
  },
  {
    image: CRA_WEB,
    title: 'CRA 홈페이지',
    description: [
      'CRA의 새로운 페이지를 제작하는 웹 개발 프로젝트입니다.',
      '동아리의 소개와 CRA 회원들만의 소통 공간 제공합니다.',
      '25-1 학기에 출시를 목표로 하고 있습니다.',
    ],
    stack: 'React, Spring Boot, MySQL, AWS',
  },
  {
    image: CRA_ASSISTANT,
    title: 'Coding Roadmap Assistant',
    description: [
      'AI 기반의 코딩 보조 도우미 서비스입니다.',
      'OpenAI API를 활용하여 사용자에게 도움을 제시합니다.',
      '현재 VSCode Marketplace에 출시한 상태이고 Extension으로 사용 가능 합니다.',
    ],
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
