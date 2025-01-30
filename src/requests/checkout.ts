export const getCheckoutInfo = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch checkout details");
      }
  
      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : "An error occurred" };
    }
  };
  