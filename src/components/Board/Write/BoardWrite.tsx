import React, { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createBoards, onUploadImage } from '~/api/board';
import { useNavigate } from 'react-router-dom';
import styles from './BoardWrite.module.css';
import { Editor } from '@toast-ui/react-editor';
import { colorSyntax, codeSyntaxHighlight, Prism } from '~/styles/toast-ui';

export default function BoardWrite({ category }: { category: number }) {
  const editorRef = useRef<any>();
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
  }>({});
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
      const filesToUpload = files || [];
      return await createBoards({ ...formData, content }, filesToUpload);
    },
    onSuccess: async () => {
      alert('게시글 작성 성공');
      const currentPath = window.location.pathname;
      const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
      window.location.href = parentPath;
      setFormData({
        userId: 1,
        title: '',
        content: '',
        category: category,
        imageUrls: [],
      });
      setFiles([]);
    },
    onError: (error) => {
      console.error('게시글 작성 실패:', error);
      alert('게시글 작성 실패');
    },
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'imageUrls' ? value.split(',') : value,
    }));
    // 에러 메시지 초기화
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleEditorChange = () => {
    const content = editorRef.current?.getInstance().getMarkdown();

    setFormData((prev) => ({
      ...prev,
      content,
    }));

    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      // 현재 파일 개수 + 추가하려는 파일 개수가 3개를 초과하면 추가 불가능
      if (files.length + selectedFiles.length > 3) {
        alert('파일은 최대 3개까지만 업로드할 수 있습니다.');
        return;
      }

      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 폼 검증 실행
    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstError);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    console.log('Submit 버튼 클릭됨');
    console.log('현재 formData:', formData);
    console.log('현재 files:', files);
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
        <br />

        <label className={styles['file-button']} htmlFor="fileUpload">
          파일 선택
        </label>
        <input
          className={styles['file-input']}
          type="file"
          id="fileUpload"
          multiple
          onChange={handleFileChange}
        />
        <ul className={styles['file-list']}>
          {files.map((file, index) => (
            <li className={styles['file-item']} key={index}>
              {file.name}
              <button
                type="button"
                className={styles['remove-button']}
                onClick={() => handleRemoveFile(index)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <input
          className={styles['submit-button']}
          type="submit"
          value="게시글 작성"
        />
      </form>
    </div>
  );
}
