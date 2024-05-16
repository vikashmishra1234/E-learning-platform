import * as Yup from 'yup';
export const signUpValidate = ()=>{

   return  Yup.object({
        name: Yup.string().min(3).required('Name is required'),
        studentYear: Yup.number()
    .required('Student Year is required')
    .integer('Student Year must be an integer')
    .positive('Student Year must be a positive number')
    .lessThan(5,"year should be less than 5")
    .moreThan(0,"year should be greater than 0")
    .test(
      'len',
      'Student Year must be a single digit',
      val => val && val.toString().length === 1
    ),
    phone: Yup.string()
      .required('Phone Number is required')
      .matches(/^\d{10}$/, 'Invalid phone number'),
    });
}  

 export const NotesValidation = ()=>{
    return Yup.object().shape({
        code: Yup.string().required("Subject Code is required").min(4),
        year: Yup.number()
          .required("Year is required")
          .positive("Year must be a positive number")
          .lessThan(5,"year must be less than 5")
          .moreThan(0,"year must be greater than 0")
          .integer("Year must be an integer"),
          
        subjectName: Yup.string().required("Subject Name is required"),
        category: Yup.string().required("Category is required"),
        file: Yup.mixed().required("File is required"),
      });
}