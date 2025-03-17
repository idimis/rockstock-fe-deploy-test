"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAccessToken } from "@/lib/utils/auth";
import { decodeToken } from "@/lib/utils/decodeToken";
import { getProvinces, getCitiesByProvinceId, getDistrictByCityId, getSubDistrictByDistrictId } from "@/services/addressService";
import { Province, City, District, SubDistrict, CreateAddressProps, CreateAddressFormValues } from "@/types/address";
import Select from "react-select";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";

const MapComponent = dynamic(() => import("@/components/common/MapComponent"), { ssr: false, loading: () => <p>Loading map...</p>, });

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const CreateAddress: React.FC<CreateAddressProps> = ({ onCloseCreateAddress }) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);
  const [loading, setLoading] = useState(false);
  const accessToken = getAccessToken();
  const decoded = accessToken ? decodeToken(accessToken) : null;
  const userId = decoded?.userId;
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        if (isMounted) setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
    return () => {
      isMounted = false;
    };
  }, []);  

  const validationSchema = Yup.object({
    label: Yup.string().required("Label is required"),
    addressDetail: Yup.string().required("Address detail is required"),
    subDistrictId: Yup.number().required("Sub-district is required"),
    latitude: Yup.number().required("Location is required"),
    longitude: Yup.number().required("Location is required"),
  });

  const handleCreateAddress = async (
    values: CreateAddressFormValues, 
    setSubmitting: FormikHelpers<CreateAddressFormValues>["setSubmitting"]
  ) => {
    setLoading(true);
    try {
      await axios.post(
        `${API_BASE_URL}/addresses`,
        { 
          ...values,
          userId,
          addressId: undefined,
          isMain: false,
          addressPostalCode: "",
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      toast.success("Address created successfully!");
      onCloseCreateAddress();
    } catch (error) {
      toast.error("Failed to create address");
      console.error("Error creating address:", error);
    } finally {
      setSubmitting(false);
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <ToastContainer position="top-center" autoClose={3000} />
      <Formik<CreateAddressFormValues>
        initialValues={{
          label: "",
          addressDetail: "",
          note: "",
          subDistrictId: "",
          latitude: "",
          longitude: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => handleCreateAddress(values, setSubmitting)}
      >
        {({ setFieldValue }) => (
          <Form className="w-full mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col gap-2 max-h-[90vh] md:w-[500px]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Create Address</h3>
              <button onClick={onCloseCreateAddress}>
                <IoMdClose size={28} color="red" />
              </button>
            </div>
            <div className="flex flex-col gap-2 px-2 overflow-y-auto">
              {typeof window !== "undefined" && <MapComponent setFieldValue={setFieldValue} />}
              <div>
                <Field
                  name="label"
                  placeholder="Label"
                  className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="label" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <Field
                  name="addressDetail"
                  placeholder="Address Detail"
                  className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="addressDetail" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <Field
                  name="note"
                  placeholder="Note (optional)"
                  className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <Select
                  options={provinces.map((p) => ({ value: p.id, label: p.name }))}
                  placeholder="Select Province"
                  onChange={async (selectedOption) => {
                    if (selectedOption) {
                      const provinceId = selectedOption.value;
                      const cities = await getCitiesByProvinceId(provinceId);
                      setCities(cities);
                    }
                  }}
                  className="react-select-container text-black"
                  classNamePrefix="react-select"
                />
              </div>
              <div>
                <Select
                  options={cities.map((c) => ({ value: c.id, label: c.name }))}
                  placeholder="Select City"
                  onChange={async (selectedOption) => {
                    if (selectedOption) {
                      const cityId = selectedOption.value;
                      const districts = await getDistrictByCityId(cityId);
                      setDistricts(districts);
                    }
                  }}
                  className="react-select-container text-black"
                  classNamePrefix="react-select"
                />
              </div>
              <div>
                <Select
                  options={districts.map((d) => ({ value: d.id, label: d.name }))}
                  placeholder="Select District"
                  onChange={async (selectedOption) => {
                    if (selectedOption) {
                      const districtId = selectedOption.value;
                      const subDistricts = await getSubDistrictByDistrictId(districtId);
                      setSubDistricts(subDistricts);
                    }
                  }}
                  className="react-select-container text-black"
                  classNamePrefix="react-select"
                />
              </div>
              <div>
                <Select
                  options={subDistricts.map((sd) => ({ value: sd.id, label: sd.name }))}
                  placeholder="Select Sub District"
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      setFieldValue("subDistrictId", selectedOption.value);
                    }
                  }}
                  className="react-select-container text-black"
                  classNamePrefix="react-select"
                />
                <ErrorMessage name="subDistrictId" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateAddress;