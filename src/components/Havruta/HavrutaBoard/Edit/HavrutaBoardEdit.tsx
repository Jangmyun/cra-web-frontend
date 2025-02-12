import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  getHavrutaBoardById,
  updateHavrutaBoard,
} from '~/api/havruta/havrutaBoard.ts';
import { HavrutaBoard } from '~/models/Havruta.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import styles from './HavrutaBoardEdit.module.css';
import { useMarkdownEditor } from '../../../Board/Write/Markdown';
import { Editor } from '@toast-ui/react-editor';
import { IoIosLink } from 'react-icons/io';
import { CATEGORY } from '~/constants/category.ts';

export default function HavrutaBoardEdit() {
  const navigate = useNavigate();
  const havrutaCategory = CATEGORY.HAVRUTA;
  const [existingFile, setExistingFile] = useState<string>('');
  const [errors, setErrors] = useState<{ title?: string; content?: string }>(
    {},
  );
  const [formData, setFormData] = useState<{
    userId: number;
    title: string;
    content: string;
    imageUrls: string[];
    category: number;
    havrutaId: number;
  }>({
    userId: 1,
    title: '',
    content: '',
    imageUrls: [],
    category: havrutaCategory,
    havrutaId: 1,
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

  const havrutaBoardQuery = useQuery<HavrutaBoard>({
    queryKey: QUERY_KEY.havrutaBoard.havrutaBoardById(boardId),
    queryFn: async () => getHavrutaBoardById(boardId),
  });

  let content;

  const mutation = useMutation({
    mutationFn: async () => {
      const content = editorRef.current.getInstance().getMarkdown();
      return await updateHavrutaBoard({
        ...formData,
        content,
        fileUrl: existingFile,
      });
    },
    onSuccess: async () => {
      alert('게시글 수정 완료');
      navigate(`/havruta/view/${boardId}`);
      setFormData({
        userId: 1,
        title: '',
        content: '',
        imageUrls: [],
        havrutaId: 1,
        category: havrutaCategory,
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
    if (havrutaBoardQuery.isSuccess && havrutaBoardQuery.data) {
      setFormData((prev) => ({
        ...prev,
        title: havrutaBoardQuery.data.title,
        content: havrutaBoardQuery.data.content,
      }));
      setExistingFile(havrutaBoardQuery.data.fileUrl || '');
      editorRef.current
        ?.getInstance()
        .setMarkdown(havrutaBoardQuery.data.content);
    }
  }, [havrutaBoardQuery.isSuccess, havrutaBoardQuery.data]);

  const validateForm = () => {
    const newErrors: { title?: string; content?: string } = {};
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
      isValid = false;
    }

    const content = editorRef.current?.getInstance().getMarkdown() || '';
    if (!content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
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

  if (havrutaBoardQuery.isLoading) {
    content = <div>데이터를 불러오는 중입니다...</div>;
  } else if (havrutaBoardQuery.isError) {
    content = <div>에러가 발생했습니다!!</div>;
  } else if (havrutaBoardQuery.isSuccess) {
    return (
      <div className={styles['edit-container']}>
        <form className={styles['edit-form']} onSubmit={handleSubmit}>
          <h2 className={styles['edit-title']}>하브루타 게시물 수정</h2>

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
            value="하브루타 수정"
          />
        </form>
      </div>
    );
  }

  return <div>{content}</div>;
}
