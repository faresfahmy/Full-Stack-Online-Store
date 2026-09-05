import { LIMIT, PAGE } from "../utils/pagination.ts";



export const validateQuery = (limit: string, page: string): { limit: number, page: number } => {
    const limitNumber = Number(limit)
    const pageNumber = Number(page)
    if (!Number.isNaN(page) && !Number.isNaN(limit)) {
        if (limitNumber <= LIMIT) {
            return { limit: limitNumber, page: pageNumber };
        }
        else {
            return { limit: LIMIT, page: pageNumber }
        }
    }
    return { limit: LIMIT, page: PAGE }
}