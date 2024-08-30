// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files

import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

import dotenv from 'dotenv';

dotenv.config(); // initializing dotenv

const USERNAME=process.env.DB_USERNAME
const PASSWORD=process.env.DB_PASSWORD

const storage = new GridFsStorage({
    url: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.qyt6y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    
    file: (request, file) => {

        // console.log('Processing file1:', file);

        

        const match = ["image/png", "image/jpg"];

        
        // if(match.indexOf(file.mimeType) === -1) 
        // {
            return {
                bucketName:"General",
                filename: `${Date.now()}-blog-${file.originalname}`
            }
            
            
        
            
        // console.log('Processing file2:', file);
        // return {
        //     bucketName: "photos",
        //     filename: `${Date.now()}-image-${file.originalname}`
        // }
    }
});

export default multer({storage}); 