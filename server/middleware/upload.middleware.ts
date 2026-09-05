
import multer from "multer";
const diskStorage = multer.diskStorage({})
export const upload = multer({ storage: diskStorage })
