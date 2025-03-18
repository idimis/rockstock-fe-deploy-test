import { format } from "date-fns";

export const formatNumber = (value: string | number): string => {
    if (!value) return "";
    return new Intl.NumberFormat("id-ID").format(Number(value));
};
  
export const parseNumber = (value: string): string => {
    return value.replace(/\D/g, "");
};

export const formatUpdatedAt = (updatedAt?: string): string => {
    return updatedAt ? format(new Date(updatedAt), "EEEE, dd MMM yy") : "N/A";
}

export const formatText = (text: string): string => 
    text
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  