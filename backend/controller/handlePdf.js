const FileModel = require("../models/FileModel");

exports.getFiles = async (req, res) => {
  try {
    const category = req.query.category;

    const files = await FileModel.find({ category: category });

    if (files.length === 0) {
      return res.status(404).send("PDF not found");
    }
     res.status(200).json({ files: files ,success:true});
  } catch (error) {
    console.error("Error fetching PDF:", error);
    res.status(500).send("Error fetching PDF");
  }
};

exports.addFiles = async (req, res) => {
  try {
    const newPdf = new FileModel({
      file: req.body.file,
      code: req.body.code,
      category: req.body.category,
      subjectName: req.body.subjectName,
      year: req.body.year,
      userId: req.user.user_id,
    });

    await newPdf.save();

    res.status(200).send("File uploaded successfully.");
  } catch (error) {
    console.error("Error uploading file:", error.message);
    res.status(500).send("Error uploading file.");
  }
};
