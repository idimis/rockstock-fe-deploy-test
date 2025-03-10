export const getAccessToken = (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accesToken");
    }
    return null;
  };
    