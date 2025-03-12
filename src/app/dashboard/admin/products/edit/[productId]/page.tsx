"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import axiosInstance from "@/utils/axiosInstance";
import { useCategories } from "@/hooks/useCategories";
import { Product, ProductStatus, ProductFormValues } from "@/types/product";
import { ToastContainer } from "react-toastify";
import ProductFormSkeleton from "@/components/dashboardAdmin/product/draft/DraftFormSkeleton";
import { validationSchema } from "@/components/dashboardAdmin/product/draft/validationSchemas"
import DraftFormFields from "@/components/dashboardAdmin/product/draft/DraftFormFields";
import { EditButton } from "@/components/dashboardAdmin/product/draft/EditButton";
import axios from "axios";

const ProductEditForm = () => {
  const params = useParams();
  const productId = params?.productId as string;
  const router = useRouter();
  const { data: categoryData, isLoading } = useCategories(1, 100, "");

  const [productData, setProductData] = useState<Product | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [localProductPictures, setLocalProductPictures] = useState<(string | null)[]>([null, null, null]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axiosInstance.get<Product>(`/products/${productId}`);
      const product = response.data;
  
      if (!product || Object.values(product).every((value) => value === null)) {
        router.push("/error/404");
        return;
      }
  
      setProductData(product);
  
      if (product.status !== ProductStatus.ACTIVE) {
        router.push("/error/403");
        return;
      }
  
    } catch {
      router.push("/error/404");
    }
  }, [productId, router]);

  useEffect(() => {
    if (productId && !productData) {
      fetchProducts();
    }
  }, [productId, productData, fetchProducts]);

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
        await axiosInstance.patch(`/products/${productId}/edit`, values);
        router.push("/dashboard/admin/products");
        localStorage.setItem("toastMessage", "Product edited successfully!");
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            formik.setFieldError("productName", "Product name already exists. Please choose a different name.");
          }
          console.error("Axios error:", error.response?.data || error.message);
        }
        if (!axios.isAxiosError(error)) {
          console.error("Unexpected error:", error);
        }
      } finally {
        setSubmitting(false);
      }      
    }
  });

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
    }
  }, [productData]);

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl max-w-3xl mx-auto">
      <ToastContainer />
      {isLoading || !productData ? (
        <ProductFormSkeleton />
      ) : (
        <>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">📝 Edit Product</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
      <DraftFormFields
        formik={formik}
        categoryData={categoryData ?? null}
        isLoading={isLoading}
        localProductPictures={localProductPictures}
        setLocalProductPictures={setLocalProductPictures}
        productId={productId}
        isSubmitting={isSubmitting}
        setSubmitting={setSubmitting}
      />
      <EditButton
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

export default ProductEditForm;