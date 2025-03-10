"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import axiosInstance from "@/utils/axiosInstance";
import { useCategories } from "@/hooks/useCategories";
import { Product, ProductStatus, ProductFormValues } from "@/types/product";
import { ToastContainer } from "react-toastify";
import ProductFormSkeleton from "@/components/dashboardAdmin/product/draft/DraftFromSkeleton";
import { validationSchema } from "@/components/dashboardAdmin/product/draft/validationSchemas"
import { ButtonDraft } from "@/components/dashboardAdmin/product/draft/ButtonDraft"
import DraftFormFields from "@/components/dashboardAdmin/product/draft/DraftFromFields";

const ProductDraftForm = () => {
  const params = useParams();
  const productId = params?.productId as string;
  const router = useRouter();
  const { data: categoryData, isLoading } = useCategories(1, 100, "");

  const [productData, setProductData] = useState<Product | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [localProductPictures, setLocalProductPictures] = useState<(string | null)[]>([null, null, null]);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get<Product>(`/products/${productId}`);
      const product = response.data;

      if (!product || Object.values(product).every((value) => value === null)) {
        router.push("/error/404");
        return;
      }

      setProductData(product);

      if (product.status !== ProductStatus.DRAFT) {
        router.push("/error/403");
        return;
      }

    } catch (error) {
      router.push("/error/404");
    }
  };

  useEffect(() => {
    if (productData) {
      const initialPictures: (string | null)[] = [null, null, null];

      if (productData.productPictures && Array.isArray(productData.productPictures)) {
        productData.productPictures.forEach((pic) => {
          if (pic.position >= 1 && pic.position <= 3) {
            initialPictures[pic.position - 1] = pic.productPictureUrl;
          }
        });
      }

      setLocalProductPictures(initialPictures);
      formik.setFieldValue("productPictures", initialPictures);
    }
  }, [productData]);

  useEffect(() => {
    if (productId && !productData) {
      fetchProducts();
    }
  }, [productId]);

  const formik = useFormik<ProductFormValues>({
    initialValues: {
      productName: productData?.productName || "",
      detail: productData?.detail || "",
      price: productData?.price || 0,
      weight: productData?.weight || 0,
      productCategory: productData?.categoryId ? String(productData.categoryId) : "",
      productPictures: productData?.productPictures?.map((pic) => pic.productPictureUrl ?? null) || [null, null, null],
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldTouched }) => {
      setSubmitting(true);
    
      const errors = await formik.validateForm();
      if (Object.keys(errors).length > 0) {
        Object.keys(errors).forEach((field) => {
          setFieldTouched(field, true);
        });
        setSubmitting(false);
        return;
      }
    
      try {
        await axiosInstance.patch(`/products/${productId}/create`, values);
        router.push("/dashboard/admin/products");
        localStorage.setItem("toastMessage", "Product created successfully!");
      } catch (error: any) {
        console.error("Product creation failed:", error.response?.data || error.message);
    
        if (error.response?.status === 409) {
          formik.setFieldError("productName", "Product name already exists. Please choose a different name.");
        }
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl max-w-3xl mx-auto">
      <ToastContainer />
      {isLoading || !productData ? (
        <ProductFormSkeleton />
      ) : (
        <>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">📝 Create Product Form</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
      <DraftFormFields
        formik={formik}
        categoryData={categoryData}
        isLoading={isLoading}
        localProductPictures={localProductPictures}
        setLocalProductPictures={setLocalProductPictures}
        productId={productId}
        isSubmitting={isSubmitting}
        setSubmitting={setSubmitting}
      />
      <ButtonDraft
        formik={formik}
        isSubmitting={isSubmitting}
        productId={productId}
      />
      </form>
      </>
      )}
    </div>
  );
};

export default ProductDraftForm;