import React, { useEffect, useState, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { CATEGORY_STRINGS } from '~/constants/category_strings.ts';
import { getBoardById, updateBoards, onUploadImage } from '~/api/board.ts';
import { Board } from '~/models/Board.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import '~/styles/toast-ui';
import { Editor } from '@toast-ui/react-editor';
import { colorSyntax, codeSyntaxHighlight, Prism } from '~/styles/toast-ui';
import styles from './BoardEdit.module.css';

export default function BoardEdit({ category }: { category: number }) {
  const editorRef = useRef<any>();
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();
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

  const boardQuery = useQuery<Board>({
    queryKey: QUERY_KEY.board.boardById(boardId),
    queryFn: async () => getBoardById(boardId),
  });

  let content;

  const mutation = useMutation({
    mutationFn: async () => {
      const content = editorRef.current.getInstance().getMarkdown();
      const filesToUpload = files || [];
      return await updateBoards({ ...formData, content }, filesToUpload);
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
      setFiles([]);
    },
    onError: (error) => {
      console.error('게시글 수정 실패:', error);
      alert('게시글 수정 실패');
    },
  });

  useEffect(() => {
    if (boardQuery.isSuccess && boardQuery.data && editorRef.current) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...boardQuery.data,
      }));

      // Editor 내용 설정
      editorRef.current.getInstance().setMarkdown(boardQuery.data.content);
    }
  }, [boardQuery.isSuccess, boardQuery.data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'imageUrls' ? value.split(',') : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // 기존 파일 유지하면서 새 파일 추가
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // 해당 index의 파일 제거
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit 버튼 클릭됨');
    console.log('현재 formData:', formData);
    console.log('현재 files:', files);
    mutation.mutate();
  };

  if (boardQuery.isLoading) {
    content = <div className="loading">데이터를 불러오는 중입니다...</div>;
  } else if (boardQuery.isError) {
    content = <div className="error">에러가 발생했습니다!</div>;
  } else if (boardQuery.isSuccess) {
    console.log(formData);
    return (
      <div className={styles['write-container']}>
        <form className={styles['write-form']} onSubmit={handleSubmit}>
          <h2 className={styles['write-title']}>
            {CATEGORY_STRINGS[category]} 게시글 수정
          </h2>
          <label htmlFor="title">제목</label>
          <input
            className={styles['input-title']}
            type="text"
            id="title"
            name="title"
            placeholder="제목을 입력하세요."
            value={formData.title}
            onChange={handleChange}
          />
          <label htmlFor="content">내용</label>
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
            hooks={{
              addImageBlobHook: async (
                blob: File,
                callback: (url: string) => void,
              ) => {
                try {
                  const url = await onUploadImage(blob); // URL을 받아옴
                  callback(url); // Markdown 에디터에 삽입

                  setFormData((prevData) => ({
                    ...prevData,
                    imageUrls: [...prevData.imageUrls, url], // DB로 전송할 이미지 URL 배열에 추가
                  }));
                } catch (error) {
                  console.error('이미지 업로드 실패:', error);
                  alert('이미지 업로드에 실패했습니다.');
                }
              },
            }}
          />
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
              <React.Fragment key={index}>
                <li className={styles['file-item']}>
                  {file.name}
                  <button
                    type="button"
                    className={styles['remove-button']}
                    onClick={() => handleRemoveFile(index)}
                  >
                    ✕
                  </button>
                </li>
                <br /> {/* 리스트 사이 줄바꿈 추가 */}
              </React.Fragment>
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

  return <div>{content}</div>;
}
