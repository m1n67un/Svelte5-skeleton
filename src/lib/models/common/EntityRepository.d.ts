export interface EntityRepository {
    find(paramMap: any): Promise<[]>;
    findOne(paramMap: any): Promise<[]>;
    insert(paramMap: any): Promise<void>;
    remove(paramMap: any): Promise<void>;
    update(paramMap: any): Promise<void>;
    count(paramMap: any): Promise<[]>;
}