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
  like?: number;
  view?: number;
  fileUrls?: string[];

  havrutaDto: {
    id: number | null;
    classname: string;
    professor: string;
  };
  resUserDetailDto: {
    name: string;
    email: string;
    studentId: number;
    term: string;
    githubId: string;
    imgUrl: string;
  };
}

export type { Board };
