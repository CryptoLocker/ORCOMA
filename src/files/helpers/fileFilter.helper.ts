

//If the callback's boolean parameter is false, the controller will ignore the file after the interception
export const createFileFilter = (validExtensions: string[]) => {
    return (req: Express.Request, file: Express.Multer.File, callback: Function) => {
        if (!file) return callback(new Error('File is empty'), false);

        const fileExtension = file.mimetype.split('/')[1];

        if (validExtensions.includes(fileExtension)) {
            return callback(null, true);
        }

        return callback(new Error(`Invalid file type: ${fileExtension}`), false);
    };
};
