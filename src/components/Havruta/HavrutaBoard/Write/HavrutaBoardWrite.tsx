import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createHavrutaBoard } from '~/api/havruta/havrutaBoard.ts';
import { Havruta, HavrutaBoard } from '~/models/Havruta.ts';
import { CATEGORY } from '~/constants/category.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { getHavrutas } from '~/api/havruta/havruta.ts';
import styles from './HavrutaBoardWrite.module.css';
import { useMarkdownEditor } from '../../../Board/Write/Markdown';
import { Editor } from '@toast-ui/react-editor';

export default function HavrutaBoardWrite() {
  const havrutaCategory = CATEGORY.HAVRUTA;
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>(
    {},
  );
  const [formData, setFormData] = useState<{
    userId: number;
    title: string;
    content: string;
    category: number;
    imageUrls: string[];
    havrutaId: number;
  }>({
    userId: 1,
    title: '',
    content: '',
    category: havrutaCategory,
    imageUrls: [],
    havrutaId: 1,
  });

  const {
    editorRef,
    error: contentError,
    handleEditorChange,
    validateContent,
    editorConfig,
  } = useMarkdownEditor({
    onContentChange: (content) => {
      setFormData((prev) => ({ ...prev, content }));
      if (content.trim()) {
        setErrors((prev) => ({ ...prev, content: undefined }));
      }
    },
  });

  const havrutaQuery = useQuery<Havruta[]>({
    queryKey: QUERY_KEY.havruta.havrutas(),
    queryFn: async () => getHavrutas(),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const content = editorRef.current.getInstance().getMarkdown();
      return await createHavrutaBoard({ ...formData, content }, file);
    },
    onSuccess: async () => {
      alert('게시글 작성 성공');
      window.location.href = window.location.pathname.substring(
        0,
        window.location.pathname.lastIndexOf('/'),
      );
      setFormData({
        userId: 1,
        title: '',
        content: '',
        category: havrutaCategory,
        imageUrls: [],
        havrutaId: 1,
      });
      setFile(null);
    },
    onError: (error) => {
      console.error('게시글 작성 실패:', error);
      alert('게시글 작성 실패');
    },
  });

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'imageUrls' ? value.split(',') : value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    mutation.mutate();
  };

  return (
    <div className={styles['write-container']}>
      <form className={styles['write-form']} onSubmit={handleSubmit}>
        <h2 className={styles['write-title']}>하브루타 게시글 작성</h2>

        <br />
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

        <label htmlFor="havrutaId">과목명</label>
        {havrutaQuery.isLoading ? (
          <p>과목 목록을 불러오는 중입니다...</p>
        ) : havrutaQuery.isError ? (
          <p>과목 목록을 불러오는데 실패했습니다.</p>
        ) : (
          <select
            id="havrutaId"
            name="havrutaId"
            value={formData.havrutaId}
            onChange={handleChange}
            required
          >
            <option value="" disabled selected>
              하브루타 과목을 선택하세요
            </option>
            {havrutaQuery.data?.map((havruta) => (
              <option key={havruta.id} value={havruta.id}>
                {havruta.className} ({havruta.professor})
              </option>
            ))}
          </select>
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

        <label className={styles['file-button']} htmlFor="fileUpload">
          파일 선택
        </label>
        <input
          className={styles['file-input']}
          type="file"
          id="fileUpload"
          onChange={handleFileChange}
        />
        {file && (
          <div className={styles['file-item']}>
            {file.name}
            <button
              type="button"
              className={styles['remove-button']}
              onClick={handleRemoveFile}
            >
              ✕
            </button>
          </div>
        )}
        <div className={styles['file-comment']}>
          파일 업로드는 한 개만 가능합니다!
        </div>

        <input
          className={styles['submit-button']}
          type="submit"
          value="게시글 작성"
        />
      </form>
    </div>
  );
}
