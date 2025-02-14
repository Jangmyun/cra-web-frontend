import { Board } from '~/models/Board';
import { client } from './client';

// POST/View
export const createBoardsView = async (id: number): Promise<Board> => {
  try {
    const response = await client.post<Board>(`/board/view/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
