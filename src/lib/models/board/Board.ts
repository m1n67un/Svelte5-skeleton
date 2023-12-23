export interface Board {
    id: number;
    title: string;
    content: string;
    view_count: number;
    file_id: number;
    ins_id: string;
    ins_dt: number;
    pageCount: number;
    currentPage: number;
    is_add_view_count: boolean;
}