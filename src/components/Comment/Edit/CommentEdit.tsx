import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComments } from '~/api/comment.ts';
import { Comment } from '~/models/Comment';
import styles from './CommentEdit.module.css';

export default function CommentEdit({
  id,
  content: initialContent, // 기존 내용을 prop으로 받음
  onClose,
}: {
  id: number;
  content: string;
  onClose: () => void; // 수정 완료 또는 취소 시 호출되는 함수
}) {
  const [content, setContent] = useState(initialContent); // 초기값 설정

  useEffect(() => {
    setContent(initialContent); // prop이 변경될 때 상태도 업데이트
  }, [initialContent]);
  const queryClient = useQueryClient();

  // 댓글 수정 요청을 보내는 mutation
  const mutation = useMutation({
    mutationFn: (newComment: { id: number; content: string }) =>
      updateComments(newComment as Comment),
    onSuccess: () => {
      void queryClient.invalidateQueries(); // 댓글 데이터 쿼리 무효화
      onClose(); // 수정 성공 시 수정 모드 종료
    },
    onError: (error) => {
      console.error('댓글 수정 실패:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ id, content });
  };

  return (
    <div className={styles.commentWriteContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputField}>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글 수정 내용을 입력하세요"
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          저장
        </button>
        <button
          type="button"
          className={styles.submitButton2}
          onClick={onClose}
        >
          취소
        </button>
      </form>
    </div>
  );
}
