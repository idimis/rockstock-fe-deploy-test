import { FormikProps } from "formik";
import { ProductFormValues, Category } from "@/types/product";

export interface DraftFieldsProps {
  formik: FormikProps<ProductFormValues>;
  categoryData: { content: Category[] } | null;
  isLoading: boolean;
  localProductPictures: (string | null)[];
  setLocalProductPictures: (pictures: (string | null)[]) => void;
  productId: string;
  isSubmitting: boolean;
  setSubmitting: (submitting: boolean) => void;
}

export interface ProductPicturesProps {
  formik: FormikProps<ProductFormValues>;
  productId: string;
  localProductPictures: (string | null)[];
  setLocalProductPictures: (pictures: (string | null)[]) => void;
  isSubmitting: boolean;
  setSubmitting: (state: boolean) => void;
  updateFormik: (pictures: (string | null)[]) => void;
}

export interface ButtonProps {
  formik: FormikProps<ProductFormValues>;
  productId: string;
  isSubmitting: boolean;
}