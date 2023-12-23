import { BoardService } from "$lib/services/board/BoardService";
import  { json, type RequestEvent, type RequestHandler } from "@sveltejs/kit";
import type { Board } from "$lib/models/board/Board";

class Method {
    private static boardService: BoardService = new BoardService();
    
    static async get(req: RequestEvent) {
        let pageCount: number = Number(`${req.url.searchParams.get('pageCount')}`);
        let currentPage: number = Number(`${req.url.searchParams.get('currentPage')}`);

        let board = {} as Board;
        board.pageCount = pageCount || 10;
        board.currentPage = currentPage || 1;

        let count: any = await this.boardService.listCount(board);
        let result: any = await this.boardService.find(board);

        let object: any = {
            totalElements: count[0].count,
            totalPages: (board.pageCount * (board.currentPage - 1) / board.pageCount) + 1,
            list: result
        };

        return json({
            code: 200,
            status: "success",
            data: object
        });
    }

    //: 게시물 등록
    static async post(req: RequestEvent) {
        let board = {} as Board;
        board.ins_id = 'system'
        let content_type = req.request.headers.get('content-type');
        
        if(content_type?.includes(import.meta.env.VITE_HEADERS_CONTENT_TYPE_JSON)) {
            let data = await req.request.json();
            board.title = data.title;
            board.content = data.content;
            board.file_id = data.file_id;

        } else if(content_type?.includes(import.meta.env.VITE_HEADERS_CONTENT_TYPE_FORM)){
            let form = await req.request.formData();
            board.title = String(form.get('title'));
            board.content = String(form.get('content'));
            board.file_id = Number(form.get('file_id'));
        }
        
        //: 게시물 생성
        await this.boardService.insert(board);
        
        return new Response(Object({
            status: 200,
            success: true
        }))
    }
}

export const GET: RequestHandler = async (req: RequestEvent) => await Method.get(req)
export const POST: RequestHandler = async (req: RequestEvent) => await Method.post(req)