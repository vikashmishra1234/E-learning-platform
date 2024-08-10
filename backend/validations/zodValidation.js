const z = require("zod");



exports.validateFiles = (req, res, next) => {
 
    const fileSchemaValidation = z.object({
      file: z.string(),
      code: z.string().min(3),
      category: z.string().min(2),
      subjectName: z.string().min(2),
      year: z
        .number()
        .int()
        .min(1, "year must be greater than 1")
        .max(4, "year must be less than 4"),
     
    });
  try {
    fileSchemaValidation.parse(req.body);
    next();
  } catch (error) {
    return res.status(402).json({
      success: false,
      error: error.errors,
    });
  }
};

exports.userValidation = (req,res,next) =>{
    const userSchema = z.object({
        name: z.string(),
        phone: z.string().min(10).max(10),
        password: z.string().min(4),
        studentYear: z
          .number()
          .int()
          .min(1, "year must be greater than 1")
          .max(4, "year must be less than 4")
      });
      try {
        userSchema.parse(req.body);
        next();
      } catch (error) {
        console.log(error.errors)
        return res.status(500).json({
            success:false,
            error:error.errors
        })
      }
}


