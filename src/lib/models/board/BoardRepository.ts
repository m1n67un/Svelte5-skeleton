import { q } from "$lib/config/db/maria";
import type { EntityRepository } from "../common/EntityRepository";
import type { Board } from "./Board";

export class BoardRepository implements EntityRepository {
    count(paramMap: any) {
        let params: any[] = [];
        const sql = ``;
        return q(sql, params);
    }
    listCount(paramMap: any) {
        let params: any[] = [];
        const sql = `SELECT
                        count(1) count
                    FROM t_board
                    ORDER BY id DESC
                    LIMIT ${paramMap.pageCount}
                    OFFSET ${paramMap.pageCount * (paramMap.currentPage - 1)}
                    `;
        return q(sql, params);
    }
    find(paramMap: any) {
        let params: any[] = [];
        const sql = `SELECT
                        id
                    ,   title
                    ,   content
                    ,   view_count
                    ,   file_id
                    ,   ins_id
                    ,   date_format(ins_dt, '%Y-%m-%d') ins_dt
                    FROM t_board
                    ORDER BY id DESC
                    LIMIT ${paramMap.pageCount}
                    OFFSET ${paramMap.pageCount * (paramMap.currentPage - 1)}
                    `;
        return q(sql, params);
    }
    findOne(paramMap: any) {
        let params: any[] = [];
        const sql = `SELECT
                        tn.id
                    ,   tn.title
                    ,   tn.content
                    ,   tn.view_count
                    ,   tn.file_id
                    ,   tn.ins_id
                    ,   date_format(tn.ins_dt, '%Y-%m-%d %H:%i') ins_dt
                    ,   tf.page_type
                    ,   tf.file_nm
                    ,   tf.file_save_nm
                    FROM t_board tn
                    LEFT JOIN t_file tf
                    ON tn.file_id = tf.file_id
                    WHERE 1=1
                    ${paramMap.id != undefined && paramMap.id != '' ?
                        `AND tn.id = ?:${params.push(paramMap.id)}:` : ``
                    }
                    `;
        return q(sql, params);
    }
    insert(paramMap: any) {
        let params: any[] = [];
        const sql = `
                    INSERT INTO t_board (
                        title
                    ,   content
                    ,   view_count
                    ${paramMap.file_id != undefined && paramMap.file_id != '' ?
                        `,   file_id` : ``
                    }
                    ,   ins_id
                    ,   ins_dt
                    ) VALUES (
                        ?:${params.push(paramMap.title)}:
                    ,   ?:${params.push(paramMap.content)}:
                    ,   0
                    ${paramMap.file_id != undefined && paramMap.file_id != '' ?
                        `,  ?:${params.push(paramMap.file_id)}:` : ``
                    }
                    ,   'system'
                    ,   sysdate()
                    )`;
        return q(sql, params);
    }
    update(paramMap: any) {
        let params: any[] = [];
        const sql = `UPDATE t_board 
                    SET upt_id = 'system'
                    ,   upt_dt = sysdate()
                    ${paramMap.title != undefined && paramMap.title != '' ?
                        `, title = ?:${params.push(paramMap.title)}:` : ``
                    }
                    ${paramMap.content != undefined && paramMap.content != '' ?
                        `, content = ?:${params.push(paramMap.content)}:` : ``
                    }
                    ${paramMap.is_add_view_count == true ?
                        `, view_count = view_count + 1` : ``
                    }
                    WHERE id = ?:${params.push(paramMap.id)}:
                    `;
        return q(sql, params);
    }
    remove(paramMap: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
}