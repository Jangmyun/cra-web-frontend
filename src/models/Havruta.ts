interface Havruta {
  id?: number;
  className: string;
  professor: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface HavrutaBoard {
  id?: number;
  userId?: number;
  title: string;
  content: string;
  category: number;
  likeCount?: number;
  view?: number;
  imageUrls: string[];
  createdAt?: Date;
  updatedAt?: Date;
  havrutaDto: {
    id: number | null;
    classname: string;
    professor: string;
  };
}

export type { Havruta, HavrutaBoard };
