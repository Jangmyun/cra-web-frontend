import React, { useEffect, useState, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { CATEGORY_STRINGS } from '~/constants/category_strings.ts';
import { getBoardById, updateBoards } from '~/api/board.ts';
import { Board } from '~/models/Board.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import '~/styles/toast-ui';
import { Editor } from '@toast-ui/react-editor';
import { IoIosLink } from 'react-icons/io';
import { colorSyntax, codeSyntaxHighlight, Prism } from '~/styles/toast-ui';
import styles from './BoardEdit.module.css';

export default function BoardEdit({ category }: { category: number }) {
  const editorRef = useRef<any>();
  const navigate = useNavigate();
  const [existingFiles, setExistingFiles] = useState<string[]>([]);

  // ✅ 추가된 부분: 에러 상태 추가
  const [errors, setErrors] = useState<{ title?: string; content?: string }>(
    {},
  );

  const [formData, setFormData] = useState<{
    userId: number;
    title: string;
    content: string;
    category: number;
    imageUrls: string[];
  }>({
    userId: 1,
    title: '',
    content: '',
    category: category,
    imageUrls: [],
  });

  const currentUrl = window.location.href;
  const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
  const boardId = Number(id);

  // 게시글 정보 불러오기
  const boardQuery = useQuery<Board>({
    queryKey: QUERY_KEY.board.boardById(boardId),
    queryFn: async () => getBoardById(boardId),
  });

  // 게시글 수정 요청
  const mutation = useMutation({
    mutationFn: async () => {
      const content = editorRef.current.getInstance().getMarkdown();
      return await updateBoards({
        ...formData,
        content,
        imageUrls: existingFiles,
      });
    },
    onSuccess: async () => {
      alert('게시글 수정 완료');
      navigate(`/notice/view/${boardId}`);
      setFormData({
        userId: 1,
        title: '',
        content: '',
        category: category,
        imageUrls: [],
      });
      setExistingFiles([]);
    },
    onError: (error) => {
      console.error('게시글 수정 실패:', error);
      alert('게시글 수정 실패');
    },
  });

  const extractFileName = (fileUrl: string) => {
    const decodedUrl = decodeURIComponent(fileUrl);
    const match = decodedUrl.match(/[^/]+\/[^/]+\/[a-f0-9-]+_(.+)/);
    return match ? match[1] : decodedUrl.split('/').pop() || '파일';
  };

  // 게시글 불러왔을 때 기존 파일 저장
  useEffect(() => {
    if (boardQuery.isSuccess && boardQuery.data) {
      setFormData((prev) => ({
        ...prev,
        title: boardQuery.data.title,
        content: boardQuery.data.content,
      }));
      setExistingFiles(boardQuery.data.fileUrls || []);
      editorRef.current?.getInstance().setMarkdown(boardQuery.data.content);
    }
  }, [boardQuery.isSuccess, boardQuery.data]);

  // ✅ 추가된 부분: 유효성 검사 함수
  const validateForm = () => {
    const newErrors: { title?: string; content?: string } = {};
    let isValid = true;

    // 제목 검증
    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
      isValid = false;
    } else if (formData.title.length > 100) {
      newErrors.title = '제목은 100자 이내로 입력해주세요.';
      isValid = false;
    }

    // 내용 검증
    const content = editorRef.current.getInstance().getMarkdown();
    if (!content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 입력값 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ✅ 추가된 부분: 입력 변경 시 에러 메시지 제거
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // 에디터 내용 변경 핸들러
  const handleEditorChange = () => {
    const content = editorRef.current?.getInstance().getMarkdown();

    setFormData((prev) => ({
      ...prev,
      content,
    }));

    // ✅ 추가된 부분: 내용 입력 시 에러 메시지 제거
    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: undefined }));
    }
  };

  // 폼 제출 (게시글 수정)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ 추가된 부분: 폼 검증 실행
    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstError);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    mutation.mutate();
  };

  if (boardQuery.isLoading) {
    return <div className="loading">데이터를 불러오는 중입니다...</div>;
  }

  if (boardQuery.isError) {
    return <div className="error">에러가 발생했습니다!</div>;
  }

  return (
    <div className={styles['write-container']}>
      <form className={styles['write-form']} onSubmit={handleSubmit}>
        <h2 className={styles['write-title']}>
          {CATEGORY_STRINGS[category]} 게시글 수정
        </h2>

        <label htmlFor="title">제목</label>
        <input
          className={`${styles['input-title']} ${errors.title ? styles['input-error'] : ''}`}
          type="text"
          id="title"
          name="title"
          placeholder="제목을 입력하세요."
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && (
          <p className={styles['error-message']}>{errors.title}</p>
        )}

        <label htmlFor="content">내용</label>
        <div
          className={`${styles['editor-container']} ${errors.content ? styles['editor-error-container'] : ''}`}
        >
          <Editor
            ref={editorRef}
            initialValue={formData.content || ' '}
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            plugins={[
              [codeSyntaxHighlight, { highlighter: Prism }],
              colorSyntax,
            ]}
            onChange={handleEditorChange}
          />
        </div>

        {errors.content && (
          <p className={styles['error-message']}>{errors.content}</p>
        )}

        <ul className={styles['file-list']}>
          {existingFiles.map((fileUrl, index) => (
            <li key={index} className={styles['file-item']}>
              <a
                href={fileUrl}
                download={extractFileName(fileUrl)}
                className={styles['file-link']}
              >
                <IoIosLink /> &nbsp; {extractFileName(fileUrl)}
              </a>
            </li>
          ))}
        </ul>

        <input
          className={styles['submit-button']}
          type="submit"
          value="게시글 수정"
        />
      </form>
    </div>
  );
}
