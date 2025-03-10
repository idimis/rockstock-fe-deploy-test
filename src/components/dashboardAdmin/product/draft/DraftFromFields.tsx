import { FC, useEffect } from "react";
import Select from "react-select";
import { formatNumber, parseNumber } from "@/utils/FormatNumber";
import { DraftFieldsProps } from "@/types/draft";
import ProductPicturesForm from "@/components/dashboardAdmin/product/draft/ProductPicturesForm";

const DraftFormFields: FC<DraftFieldsProps> = ({
  formik,
  categoryData,
  isLoading,
  localProductPictures,
  setLocalProductPictures,
  productId,
  isSubmitting,
  setSubmitting,
}) => {
  useEffect(() => {
    formik.setTouched({
      productName: true,
      detail: true,
      price: true,
      weight: true,
      productCategory: true,
      productPictures: true,
    });
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
        <input
          type="text"
          className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          {...formik.getFieldProps("productName")}
        />
        {formik.touched.productName && formik.errors.productName && (
          <div className="text-red-500 text-sm mt-2">{formik.errors.productName}</div>
        )}
      </div>
      
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Detail</label>
        <textarea className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none" {...formik.getFieldProps("detail")} />
        {formik.touched.detail && formik.errors.detail && (
          <div className="text-red-500 text-sm mt-2">{formik.errors.detail}</div>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Price</label>
        <div className="flex items-center border rounded-lg w-full md:w-1/4 p-3 bg-gray-50">
          <span className="mr-2 text-gray-600">Rp.</span>
          <input
            type="text"
            className="w-full text-gray-700 bg-transparent outline-none"
            value={formatNumber(formik.values.price)}
            onChange={(e) => {
              const cleanedValue = parseNumber(e.target.value);
              formik.setFieldValue("price", Number(cleanedValue));
              formik.setTouched({ ...formik.touched, price: true });
            }}
          />
        </div>
        {formik.touched.price && formik.errors.price && (
          <div className="text-red-500 text-sm mt-2">{formik.errors.price}</div>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Weight</label>
        <div className="flex items-center border rounded-lg w-1/2 md:w-1/4 p-3 bg-gray-50">
          <input
            type="text"
            className="w-full text-gray-700 bg-transparent outline-none"
            value={formatNumber(formik.values.weight)}
            onChange={(e) => {
              const cleanedValue = parseNumber(e.target.value);
              formik.setFieldValue("weight", Number(cleanedValue));
              formik.setTouched({ ...formik.touched, weight: true });
            }}
          />
          <span className="ml-2 text-gray-600">grams</span>
        </div>
        {formik.touched.weight && formik.errors.weight && (
          <div className="text-red-500 text-sm mt-2">{formik.errors.weight}</div>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Category</label>
        {isLoading ? (
          <div className="p-2 border rounded bg-gray-200 animate-pulse h-10 w-full"></div>
        ) : (
          <Select
            options={categoryData?.content?.map((cat) => ({ value: cat.categoryId, label: cat.categoryName })) || []}
            value={categoryData?.content
              ?.map((cat) => ({ value: cat.categoryId, label: cat.categoryName }))
              ?.find((option) => option.value === Number(formik.values.productCategory)) || null}
            onChange={(selectedOption) => {
              formik.setFieldValue("productCategory", selectedOption?.value || "");
              formik.setTouched({ ...formik.touched, productCategory: true });
            }}
            isSearchable
            isDisabled={!categoryData?.content}
            className="text-gray-700 w-2/3 md:w-1/3"
          />
        )}
        {formik.touched.productCategory && formik.errors.productCategory && (
          <div className="text-red-500 text-sm mt-2">{formik.errors.productCategory}</div>
        )}
      </div>

      <ProductPicturesForm
        formik={formik}
        productId={productId}
        localProductPictures={localProductPictures}
        setLocalProductPictures={setLocalProductPictures}
        isSubmitting={isSubmitting}
        setSubmitting={setSubmitting}
        updateFormik={(pictures) => {
          formik.setFieldValue("productPictures", pictures);
          formik.setTouched({ ...formik.touched, productPictures: true });
        }}
      />
    </div>
  );
};

export default DraftFormFields;