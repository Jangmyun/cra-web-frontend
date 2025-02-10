import React, { useState, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createBoards, onUploadImage } from '~/api/board.ts';
import { getAllHavrutas } from '~/api/havruta/havruta.ts';
import { Havruta } from '~/models/Havruta.ts';
import { CATEGORY } from '~/constants/category.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { Editor } from '@toast-ui/react-editor';
import { colorSyntax, codeSyntaxHighlight, Prism } from '~/styles/toast-ui';
import styles from './HavrutaBoardWrite.module.css';

export default function HavrutaBoardWrite() {
  const editorRef = useRef<any>();
  const havrutaCategory = CATEGORY.HAVRUTA;
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    category: number;
    imageUrls: string[];
    havrutaDto: {
      id: number | null;
      classname: string;
      professor: string;
    };
  }>({
    title: '',
    content: '',
    category: havrutaCategory,
    imageUrls: [],
    havrutaDto: {
      id: null,
      classname: '',
      professor: '',
    },
  });

  // 하브루타 과목 리스트 가져오기
  const havrutaQuery = useQuery<Havruta[]>({
    queryKey: QUERY_KEY.havruta.havrutas(),
    queryFn: async () => getAllHavrutas(),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const content = editorRef.current.getInstance().getMarkdown();
      const filesToUpload = files || [];

      // formData 구조를 변경하여 요청 형식에 맞게 변환
      const payload = {
        board: {
          title: formData.title,
          content,
          category: formData.category,
          imageUrls: formData.imageUrls,
          havrutaDto: formData.havrutaDto, // 과목 정보 포함
        },
        files: filesToUpload.map((file) => file.name), // 파일 이름만 포함
      };
      console.log(payload.board);

      return await createBoards(payload.board, filesToUpload);
    },
    onSuccess: async () => {
      await navigate(-1);
      setFormData({
        title: '',
        content: '',
        category: havrutaCategory,
        imageUrls: [],
        havrutaDto: {
          id: null,
          classname: '',
          professor: '',
        },
      });
      setFiles([]);
    },
    onError: (error) => {
      console.error('게시글 작성 실패:', error);
      alert('게시글 작성 실패');
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'imageUrls' ? value.split(',') : value,
    }));
  };

  const handleSelectHavruta = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedHavrutaId = parseInt(e.target.value, 10);
    const selectedHavruta = havrutaQuery.data?.find(
      (h) => h.id === selectedHavrutaId,
    );

    console.log(
      '선택한 과목:',
      selectedHavruta?.className,
      selectedHavruta?.professor,
    ); // 추가

    if (selectedHavruta) {
      setFormData((prev) => ({
        ...prev,
        havrutaDto: {
          id: selectedHavruta.id,
          classname: selectedHavruta.className,
          professor: selectedHavruta.professor,
        },
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className={styles['write-container']}>
      <form className={styles['write-form']} onSubmit={handleSubmit}>
        <h2 className={styles['write-title']}>하브루타 게시글 작성</h2>

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

        <label htmlFor="havrutaId">과목명</label>
        {havrutaQuery.isLoading ? (
          <p>과목 목록을 불러오는 중입니다...</p>
        ) : havrutaQuery.isError ? (
          <p>과목 목록을 불러오는데 실패했습니다.</p>
        ) : havrutaQuery.data?.length === 0 ? (
          <p>사용 가능한 과목이 없습니다.</p>
        ) : (
          <select
            id="havrutaId"
            name="havrutaId"
            value={formData.havrutaDto.id || ''}
            onChange={handleSelectHavruta}
            required
          >
            <option value="" disabled>
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
        <Editor
          ref={editorRef}
          initialValue=" "
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }], colorSyntax]}
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
          value="게시글 작성"
        />
      </form>
    </div>
  );
}
