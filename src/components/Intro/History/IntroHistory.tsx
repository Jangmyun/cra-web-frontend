/* eslint-disable */
// @ts-nocheck

import React, { useState, useRef } from 'react';
import styles from './IntroHistory.module.css';
import styled from 'styled-components';

const Li = styled.li`
  font-size: 16px;
  width: 100%;
  padding: 2rem 0;
  border-bottom: 1px solid var(--color-bright-stroke);
`;

const Span = styled.span`
  color: var(--color-primary);
  font-family: 'Pretendard Bold' !important;
`;

const ToggleButton = styled.button`
  width: 40%;
  padding: 1rem;
  margin: 2rem auto;
  font-size: 20px;
  background-color: transparent;
  border: 1px solid var(--color-bright-stroke);
  color: var(--color-primary);
  font-family: 'Pretendard Bold';
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: block;

  &:hover {
    background-color: var(--color-primary);
    color: white;
  }

  @media (max-width: 768px) {
    margin: 2rem auto;
    transform: translateX(16px);
  }
`;

const histories = [
  {
    title: '2025 동계 DS 캠프 선배들과 함께하는 DS 캠프 주관',
    content: [],
    highlightWords: ['선배들과 함께하는 DS 캠프'],
  },
  {
    title: '2024 동계 DS 캠프 선배들과 함께하는 DS 캠프 주관',
    content: [
      '하계 신입 프로젝트',
      '발전기 고장 해결 퍼즐 어드벤처 게임 Lazy Raccoon',
      '동아리 공연 예매 서비스 동공확장 2',
      '동계 신입 프로젝트',
      '실시간 전략 게임 말랑 타격대',
      'CRA 동아리 홈페이지 CRA 웹',
      'AI 기반 코딩 도우미 Coding Roadmap Assistant',
    ],
    highlightWords: [
      '선배들과 함께하는 DS 캠프',
      'Lazy Raccoon',
      '동공확장 2',
      '말랑 타격대',
      'CRA 웹',
      'Coding Roadmap Assistant',
    ],
  },
  {
    title: '2023 동계 DS 캠프 선배들과 함께하는 DS 캠프 주관',
    content: [
      '택시 공유 서비스 아이택시 리뉴얼',
      '하계 신입 프로젝트',
      '온라인 이미지 서비스 이미지 스테이션',
      '동아리 공연 예매 서비스 동공확장',
      '카드 사용 가맹점 지도 애플리케이션 카드MAP',
      '동계 신입 프로젝트',
      '대학생 조별 과제 관리 애플리케이션 Team Check Mate',
      '뱀파이어 세계의 인간 가문 운영 게임 BloodStore',
      '동아리 애플리케이션 CRA',
    ],
    highlightWords: [
      '선배들과 함께하는 DS 캠프',
      '아이택시',
      '이미지 스테이션',
      '동공확장',
      '카드MAP',
      'Team Check Mate',
      'BloodStore',
      'CRA',
    ],
  },
  {
    title: '2022 동계 DS 캠프 선배들과 함께하는 DS 캠프 주관',
    content: [
      '하계 신입 프로젝트',
      '한동인을 위한 런닝 애플리케이션 HRC',
      '중력렌즈효과 판별 서비스',
      'AR 얼굴인식 미니게임 ARMIGO~!',
      '동계 신입 프로젝트',
      '한동인을 위한 배달음식 공동구매 애플리케이션 한밥',
    ],
    highlightWords: [
      '선배들과 함께하는 DS 캠프',
      'HRC',
      '중력렌즈효과 판별 서비스',
      'ARMIGO~!',
      '한밥',
    ],
  },
  {
    title: '2021 동계 C 캠프 선배들과 함께하는 C 캠프 주관',
    content: [
      '수강신청 도우미 대학시간 웹 서비스 출시',
      '교내 분실물 찾기 서비스 HisFinder',
      '동계 신입 프로젝트',
      '주식 추천 애플리케이션 StocKid',
      '찬양팀 보조 애플리케이션 Haring',
      '대안학교 플랫폼 HILS',
      '스터디 매칭 플랫폼 Smapp',
      '딥러닝 스터디 CIFAR Image Classifier',
    ],
    highlightWords: [
      '선배들과 함께하는 C 캠프',
      '대학시간',
      'HisFinder',
      'StocKid',
      'Haring',
      'HILS',
      'Smapp',
      'CIFAR Image Classifier',
    ],
  },
  {
    title: '2020 동계 C 캠프 선배들과 함께하는 C 캠프 주관',
    content: ['중고 거래 서비스 H-Safari iOS/Android 어플 출시'],
    highlightWords: ['선배들과 함께하는 C 캠프', 'H-Safari'],
  },
  {
    title: '2019 동계 C 캠프 하늘과 바람과 별과 C 주관',
    content: [
      '인트라넷 i7 개발 리뉴얼',
      '수강신청 도우미 histime 웹 서비스 베타 출시',
    ],
    highlightWords: ['하늘과 바람과 별과 C', 'i7', 'histime'],
  },
  {
    title: '2018 동계 C 캠프 나우 유 C 미 주관',
    content: [
      'CAKE - C언어 웹 에디터 경북대학교 SW전공동아리 전시회 우수상 수상',
      '강의 평가 서비스 SEAL 모바일 웹 리뉴얼',
      '아이헝그리 iOS/Android 어플 출시',
      '택시 공유 서비스 아이택시 iOS/Android 어플 출시',
      '전공체험활동 프로그램, 전산전자공학부 진행',
    ],
    highlightWords: [
      '나우 유 C 미',
      'CAKE - C언어 웹 에디터',
      'SEAL',
      '아이헝그리',
      '아이택시',
    ],
  },
  {
    title: '2017 동계 C 캠프 Why so C-rious? 주관',
    content: [
      '기프티콘 서비스 i-gift 웹 서비스 출시',
      '전공체험활동 프로그램, 전산전자공학부 진행',
    ],
    highlightWords: ['Why so C-rious?', 'i-gift'],
  },
  {
    title: '2016 동계 C 캠프 Come and C! 주관',
    content: [
      '택시 공유 서비스 아이택시 웹 서비스 출시',
      '강의 평가 시스템 SEAL 웹 서비스 출시',
      '전공체험활동 프로그램, 전산전자공학부 진행',
    ],
    highlightWords: ['Come and C!', '아이택시', 'SEAL'],
  },
  {
    title: '2015 전공체험활동 프로그램, 전산전자공학부 진행',
    content: [
      '동아리 홍보 및 리쿠르팅 플랫폼 iBelong 웹 서비스 출시',
      '학점 계산 서비스 iGrad 웹 서비스 출시',
    ],
    highlightWords: ['iBelong', 'iGrad'],
  },
  {
    title: '2014 동계 C 캠프 주관',
    content: [],
    highlightWords: [],
  },
  {
    title: '2013 동계 C 캠프 주관',
    content: [
      '삼성 software membership 2기',
      '미래창조과학부 캠퍼스 CEO 육성사업, 게임 킹덤셀 제작',
    ],
    highlightWords: ['킹덤셀'],
  },
  {
    title: '2012 제24회 글로벌 소프트웨어 공모대전 삼성SDS 사장상',
    content: [
      '하/동계 C 캠프 주관',
      '공학교육페스티벌 한동대학교 대표 동아리 참가, 작품 출품(앤톡)',
    ],
    highlightWords: [],
  },
  {
    title:
      '2011 그룹지향형 소셜네트워크 서비스 공개 소프트웨어 개발자 대회 기업상 수상',
    content: ['인트라넷 i3 → i7 업그레이드', '하/동계 C 캠프 주관'],
    highlightWords: ['i7'],
  },
  {
    title: '2010 Wizard XE - 제 1회 XE 공모전 대상 수상',
    content: [],
    highlightWords: [],
  },
  {
    title: '2006 인트라넷 3.0 i3 완성',
    content: [],
    highlightWords: ['i3'],
  },
  {
    title: '1999 인트라넷 2.0 i2 완성',
    content: ['i2 - 정보통신 소프트웨어 공모대전 학생부 우수상 수상'],
    highlightWords: ['i2'],
  },
  {
    title: '1997 인트라넷 1.0 초기 버전 완성 및 학교 배포',
    content: [],
    highlightWords: [],
  },
  {
    title: '1995 CRA (전산연구회) 창립',
    content: [],
    highlightWords: ['1995 CRA (전산연구회) 창립'],
  },
];

function highlightText(
  text: string,
  highlightWords: string[],
): React.ReactNode {
  // Start with the text as segments with just one segment - the full text
  let segments: Array<React.ReactNode> = [text];

  // Process each highlight word
  highlightWords.forEach((word) => {
    // Create a new array to hold the processed segments for this highlight word
    const newSegments: Array<React.ReactNode> = [];

    // Process each existing segment
    for (const segment of segments) {
      // If it's already a React element (previously highlighted), leave it as is
      if (React.isValidElement(segment)) {
        newSegments.push(segment);
        continue;
      }

      // Otherwise, it's a string that needs to be checked for the current highlight word
      const parts = String(segment).split(new RegExp(`(${word})`, 'gi'));

      // Add each part, highlighting matches
      for (let i = 0; i < parts.length; i++) {
        if (parts[i].toLowerCase() === word.toLowerCase()) {
          newSegments.push(<Span key={`${word}-${i}`}>{parts[i]}</Span>);
        } else if (parts[i]) {
          newSegments.push(parts[i]);
        }
      }
    }

    // Update segments for the next highlight word
    segments = newSegments;
  });

  return segments;
}

function IntroHistory() {
  const [showMore, setShowMore] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);

  const handleToggle = (show: boolean) => {
    if (!show) {
      historyRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setTimeout(() => {
        setShowMore(show);
      }, 700);
    } else {
      setShowMore(show);
    }
  };

  return (
    <div className={styles.History} ref={historyRef}>
      <p className={styles.HistoryTitle}>HISTORY</p>
      <ul className={styles.HistoryUL}>
        {histories
          .slice(0, showMore ? histories.length : 3)
          .map((item, index) => (
            <Li key={index}>
              {highlightText(item.title, item.highlightWords)}
              {item.content.map((contentItem, contentIndex) => (
                <p key={contentIndex} className={styles.HistoryListElement}>
                  {highlightText(contentItem, item.highlightWords)}
                </p>
              ))}
            </Li>
          ))}
      </ul>

      {!showMore && (
        <ToggleButton onClick={() => handleToggle(true)}>더보기</ToggleButton>
      )}
      {showMore && (
        <ToggleButton onClick={() => handleToggle(false)}>접기</ToggleButton>
      )}
    </div>
  );
}

export default IntroHistory;
