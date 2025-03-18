import * as Yup from 'yup' ;  

  export const validationSchema = Yup.object({
    productName: Yup.string()
      .required("Required")
      .min(3, "Must be at least 3 characters")
      .max(30, "Maximum 30 characters")
      .notOneOf(["Draft Product"], "Cannot be 'Draft Product'"),
    detail: Yup.string()
      .required("Required")
      .min(3, "Must be at least 3 characters")
      .max(100, "Maximum 100 characters")
      .notOneOf(["This is a draft product."], "Cannot be 'This is a draft product.'"),
    price: Yup.number()
      .required("Required")
      .typeError("Price must be a number")
      .moreThan(99, "Price must be at least 100")
      .max(100000000, "Price must not exceed Rp. 100,000,000"),
    weight: Yup.number()
      .required("Required")
      .typeError("Weight must be a number")
      .moreThan(99, "Weight must be at least 100")
      .max(500000, "Weight must not exceed 500,000 grams (500kg)"),
    productCategory: Yup.string()
      .required("Category is required"),
    productPictures: Yup.array()
      .of(Yup.string().nullable())
      .required("At least one image in Position 1 is required")
      .test(
        "at-least-one-image", 
        "At least one image in Position 1 is required",
        (value) => Array.isArray(value) && !!value[0]
      ),
  });