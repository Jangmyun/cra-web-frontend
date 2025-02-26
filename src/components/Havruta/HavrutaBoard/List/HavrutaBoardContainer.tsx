import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { Havruta, HavrutaBoard } from '~/models/Havruta.ts';
import {
  getHavrutaBoards,
  getHavrutaBoardsByHavrutaId,
  getHavrutaBoardsCount,
  getHavrutaBoardsCountByHavrutaId,
} from '~/api/havruta/havrutaBoard.ts';
import { getAllHavrutas } from '~/api/havruta/havruta.ts';
import HavrutaBoardList from './HavrutaBoardList.tsx';

function HavrutaBoardContainer() {
  const [selectedHavrutaId, setSelectedHavrutaId] = useState<number | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // 전체 게시물 개수 쿼리
  const havrutaBoardCountQuery = useQuery<HavrutaBoard[]>({
    queryKey: QUERY_KEY.havrutaBoard.havrutaBoardsCount(),
    queryFn: async () => getHavrutaBoardsCount(),
  });

  // 전체 게시물 가져오기 쿼리
  const havrutaBoardQuery = useQuery<HavrutaBoard[]>({
    queryKey: QUERY_KEY.havrutaBoard.havrutaBoards(currentPage),
    queryFn: async () => getHavrutaBoards(currentPage),
  });

  // 과목별 게시물 개수 쿼리 (selectedHavrutaId가 선택되었을 때만 실행)
  const havrutaBoardCountByHavrutaIdQuery = useQuery<HavrutaBoard[]>({
    queryKey: QUERY_KEY.havrutaBoard.havrutaBoardsCountByHavrutaId(
      selectedHavrutaId ?? 1, // 기본값 1을 사용 (null이면 1로 설정)
    ),
    queryFn: async () =>
      selectedHavrutaId !== null
        ? getHavrutaBoardsCountByHavrutaId(selectedHavrutaId)
        : Promise.resolve([]),
    enabled: selectedHavrutaId !== null, // selectedHavrutaId가 null이 아닐 때만 실행
  });

  // 과목별 게시물 가져오기 쿼리 (selectedHavrutaId가 선택되었을 때만 실행)
  const havrutaBoardByHavrutaIdQuery = useQuery<HavrutaBoard[]>({
    queryKey: QUERY_KEY.havrutaBoard.havrutaBoardsByHavrutaId(
      selectedHavrutaId ?? 1, // 기본값 1을 사용
      currentPage,
    ),
    queryFn: async () =>
      selectedHavrutaId !== null
        ? getHavrutaBoardsByHavrutaId(selectedHavrutaId, currentPage)
        : Promise.resolve([]),
    enabled: selectedHavrutaId !== null, // selectedHavrutaId가 null이 아닐 때만 실행
  });

  // 하브루타 과목 쿼리
  const havrutaQuery = useQuery<Havruta[]>({
    queryKey: QUERY_KEY.havruta.havrutas(),
    queryFn: async () => getAllHavrutas(),
  });

  // 전체 게시물 개수 또는 과목별 게시물 개수 계산
  const totalItems =
    selectedHavrutaId === null
      ? (havrutaBoardCountQuery.data?.length ?? 0)
      : (havrutaBoardCountByHavrutaIdQuery.data?.length ?? 0);

  const totalPage = Math.ceil(totalItems / itemsPerPage);

  return (
    <HavrutaBoardList
      havrutaQuery={havrutaQuery}
      havrutaBoardQuery={
        selectedHavrutaId === null
          ? havrutaBoardQuery
          : havrutaBoardByHavrutaIdQuery
      }
      totalPages={totalPage}
      currentPage={currentPage}
      selectedHavrutaId={selectedHavrutaId}
      onPageChange={setCurrentPage}
      onHavrutaChange={setSelectedHavrutaId}
    />
  );
}

export default HavrutaBoardContainer;
