// utils/dataUri.js
import DatauriParser from 'datauri/parser.js';
import path from 'path';

const getDataUri = (file) => {
    const parser = new DatauriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
};

export default getDataUri;
