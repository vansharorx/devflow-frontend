export const handleApiError =
  (error) => {

    console.error(error);

    return (
      error.response?.data?.message
      ||
      "Something went wrong"
    );
};