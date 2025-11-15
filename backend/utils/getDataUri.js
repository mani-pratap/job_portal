import DataUriParser from "datauri/parser.js";

import path from "path";

const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export default getDataUri;


// 
// Multer ke memory storage me:
// 
// file = {
//   originalname: "resume.pdf",
//   mimetype: "application/pdf",
//   buffer: <Buffer ...>
// }
