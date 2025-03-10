export const formatCurrency = (value: number) => {
    return `Rp. ${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };
  
  export const formatStatus = (status: string) => {
    return status
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };