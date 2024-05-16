const fs = require('fs');
const path = require('path');

exports.handlePdf = (req, res) => {
  try {
    const { fileName } = req.query;
    const frontendDir = path.join(process.cwd(), '..', 'frontend');
    const filePath = path.join(frontendDir, 'uploads', fileName);

    // Get the file stats to obtain the file size
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error('Error getting file stats:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      const fileSize = stats.size;
      const fileStream = fs.createReadStream(filePath);

      // Set the Content-Length header with the file size
      res.setHeader('Content-Length', fileSize);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

      fileStream.pipe(res);
    });
  } catch (error) {
    console.log(error.message);
  }
};