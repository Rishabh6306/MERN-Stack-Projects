import File from '../Models/fileSchema.js';

export const uploadImage = async (request, response) => {
    if (!request.file) {
        return response.status(400).json({ error: 'No file uploaded' });
    }

    const fileObj = {
        path: request.file.path,
        name: request.file.originalname,
    };

    try {
        const file = await File.create(fileObj);
        response.status(200).json({ path: `http://localhost:8082/file/${file._id}`});
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message });
    }
}

export const getImage = async (request, response) => {
    try {   
        const file = await File.findById(request.params.fileId);
        
        file.downloadCount++;

        await file.save();

        response.download(file.path, file.name);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ msg: error.message });
    }
}