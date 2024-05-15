const fs = require('fs');
const path = require('path');

exports.handlePdf=(req, res) =>{
    try {
        const { fileName } = req.query;
        const frontendDir = path.join(process.cwd(), '..', 'frontend');
        const filePath = path.join(frontendDir,'uploads', fileName);
      
        const fileStream = fs.createReadStream(filePath);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      
        fileStream.pipe(res);
        
    } catch (error) {
        console.log(error.message)
    }
}