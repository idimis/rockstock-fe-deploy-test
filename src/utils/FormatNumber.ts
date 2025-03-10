export const formatNumber = (value: string | number): string => {
    if (!value) return "";
    return new Intl.NumberFormat("id-ID").format(Number(value));
};
  
export const parseNumber = (value: string): string => {
    return value.replace(/\D/g, "");
};