import DataUriParser from "datauri/parser.js";

import path from "path";

// file >> 
// {
//   originalname: "resume.pdf",
//   buffer: <Buffer ...>
// }


const getDataUri = (file) => {
  if (!file) {
    throw new Error("No file provided to getDataUri");
  }
  if (!file.originalname || !file.buffer) {
    throw new Error("Invalid file object passed to getDataUri");
  }

  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer); 
  
};

// return 
// {
//   content: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9i..."
// }


export default getDataUri;

//
// Multer ke memory storage me:
//
// file = {
//   originalname: "resume.pdf",
//   mimetype: "application/pdf",
//   buffer: <Buffer ...>
// }
