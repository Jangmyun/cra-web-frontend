interface Board {
  id?: number;
  userId?: number;
  title: string;
  category: number;
  content: string;
  imageUrls?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  havrutaId?: number;
  likeCount?: number;
  viewerLiked?: boolean;
  likes: number;
  liked: boolean;
  view?: number;
  resUserDetailDto: {
    name?: string;
    email?: string;
    studentId?: number;
    term?: string;
    githubId?: string;
    imgUrl?: string;
  };
  havrutaDto: {
    id?: number | null;
    classname?: string;
    professor?: string;
  };
  fileUrls?: string[];
}

export type { Board };
