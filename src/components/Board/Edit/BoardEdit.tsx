import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { CATEGORY_STRINGS } from '~/constants/category_strings';
import { getBoardById, updateBoards } from '~/api/board';
import { Board } from '~/models/Board';
import { QUERY_KEY } from '~/api/queryKey';
import { useMarkdownEditor } from '../Write/Markdown';
import { Editor } from '@toast-ui/react-editor';
import { IoIosLink } from 'react-icons/io';
import styles from './BoardEdit.module.css';

interface BoardEditProps {
  category: number;
}

export default function BoardEdit({ category }: BoardEditProps) {
  const navigate = useNavigate();
  const [existingFile, setExistingFile] = useState<string>('');
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

  const {
    editorRef,
    error: contentError,
    handleEditorChange,
    validateContent,
    editorConfig,
  } = useMarkdownEditor({
    onContentChange: (content) => {
      setFormData((prev) => ({ ...prev, content }));
    },
  });

  const boardQuery = useQuery<Board>({
    queryKey: QUERY_KEY.board.boardById(boardId),
    queryFn: async () => getBoardById(boardId),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const content = editorRef.current.getInstance().getMarkdown();
      return await updateBoards({
        ...formData,
        content,
        fileUrl: existingFile,
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
      setExistingFile('');
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

  useEffect(() => {
    if (boardQuery.isSuccess && boardQuery.data) {
      setFormData((prev) => ({
        ...prev,
        title: boardQuery.data.title,
        content: boardQuery.data.content,
      }));
      setExistingFile(boardQuery.data.fileUrl || '');
      editorRef.current?.getInstance().setMarkdown(boardQuery.data.content);
    }
  }, [boardQuery.isSuccess, boardQuery.data]);

  const validateForm = () => {
    const newErrors: { title?: string; content?: string } = {};
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
      isValid = false;
    } else if (formData.title.length > 100) {
      newErrors.title = '제목은 100자 이내로 입력해주세요.';
      isValid = false;
    }

    if (!validateContent()) {
      newErrors.content = contentError;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
          <Editor ref={editorRef} {...editorConfig} />
        </div>
        {errors.content && (
          <p className={styles['error-message']}>{errors.content}</p>
        )}

        {existingFile && (
          <div className={styles['file-item']}>
            <a
              href={existingFile}
              download={extractFileName(existingFile)}
              className={styles['file-link']}
            >
              <IoIosLink /> &nbsp; {extractFileName(existingFile)}
            </a>
          </div>
        )}

        <input
          className={styles['submit-button']}
          type="submit"
          value="게시글 수정"
        />
      </form>
    </div>
  );
}
