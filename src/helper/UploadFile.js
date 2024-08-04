const path = require('path');
const fs = require('fs');

class UploadFile {
    async uploadImage(file, destination, fileName) {
        const response = [];

        const imageExtensions = ['.jpg', '.jpeg', '.png', '.svg', '.gif'];
        if (imageExtensions.includes(path.extname(file.name))) {
            response.status = true;
            const imageName = `${fileName}_${Date.now()}${path.extname(file.name)}`;
            if (file.size > 100000) {
                response.status = false;
                response.message = 'Upload Image Less then 100KB';
                return response;
            }

            // check if directory exist
            const dir = `${process.cwd()}/public/upload/${destination}`;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }

            const fileDestination = `public/upload/${destination}/${imageName}`;
            file.mv(`${dir}/${imageName}`);
            response.destination = fileDestination;
            return response;
        }
        response.status = false;
        response.message = 'Upload Image Extension with .jpg, .jpeg, .png, .svg, .gif';
        return response;
    }

    async uploadFile(file, destination, fileName) {
        const response = [];

        const pdfExtensions = ['.pdf'];
        if (pdfExtensions.includes(path.extname(file.name))) {
            response.status = true;
            const pdfName = `${fileName}_${Date.now()}${path.extname(file.name)}`;
            if (file.size > 1250000) {
                response.status = false;
                response.message = 'Upload PDF Less then 10MB';
                return response;
            }
            // check if directory exist
            const dir = `./public/upload/${destination}`;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }

            const fileDestination = `public/upload/${destination}/${pdfName}`;
            file.mv(`./${fileDestination}`);
            response.destination = fileDestination;
            return response;
        }
        response.status = false;
        response.message = 'Upload File Extension with .pdf';
        return response;
    }
}

module.exports = UploadFile;
