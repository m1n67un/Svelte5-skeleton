import type { Board } from "$lib/models/board/Board";
import { BoardRepository } from "$lib/models/board/BoardRepository";

export class BoardService {
    private boardRepository: BoardRepository = new BoardRepository;

    listCount(paramMap: any): Promise<Response> {
        return this.boardRepository.listCount(paramMap);
    }

    find(paramMap: any): Promise<Response> {
        return this.boardRepository.find(paramMap);
    }

    findOne(paramMap: any): Promise<Response> {
        return this.boardRepository.findOne(paramMap);
    }

    insert(paramMap: any): Promise<Response> {
        return this.boardRepository.insert(paramMap);
    }

    update(paramMap: any): Promise<Response> {
        return this.boardRepository.update(paramMap);
    }
}