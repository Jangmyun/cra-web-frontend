import React, { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createBoards, onUploadImage } from '~/api/board';
import { Editor } from '@toast-ui/react-editor';
import { colorSyntax, codeSyntaxHighlight, Prism } from '~/styles/toast-ui';
import styles from './BoardWrite.module.css';

export default function BoardWrite({ category }: { category: number }) {
  const editorRef = useRef<any>();
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
  }>({
    userId: 1,
    title: '',
    content: '',
    category: category,
    imageUrls: [],
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const content = editorRef.current.getInstance().getMarkdown();
      return await createBoards({ ...formData, content }, file);
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
        category,
        imageUrls: [],
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
    } else if (formData.title.length > 100) {
      newErrors.title = '제목은 100자 이내로 입력해주세요.';
      isValid = false;
    }

    const content = editorRef.current.getInstance().getMarkdown();
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
      [name]: name === 'imageUrls' ? value.split(',') : value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleEditorChange = () => {
    const content = editorRef.current?.getInstance().getMarkdown();
    setFormData((prev) => ({ ...prev, content }));
    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]); // 첫 번째 파일만 저장
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
        <h2 className={styles['write-title']}>글쓰기</h2>

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
            initialValue=" "
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            plugins={[
              [codeSyntaxHighlight, { highlighter: Prism }],
              colorSyntax,
            ]}
            onChange={handleEditorChange}
            hooks={{
              addImageBlobHook: async (
                blob: File,
                callback: (url: string) => void,
              ) => {
                try {
                  const url = await onUploadImage(blob);
                  callback(url);
                  setFormData((prevData) => ({
                    ...prevData,
                    imageUrls: [...prevData.imageUrls, url],
                  }));
                } catch (error) {
                  console.error('이미지 업로드 실패:', error);
                  alert('이미지 업로드에 실패했습니다.');
                }
              },
            }}
          />
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
        <div>파일 업로드는 한 개만 가능합니다!</div>

        <input
          className={styles['submit-button']}
          type="submit"
          value="게시글 작성"
        />
      </form>
    </div>
  );
}
