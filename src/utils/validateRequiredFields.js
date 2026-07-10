const validateRequiredFields = (form) => {
  return Object.keys(form).filter((key) => {
    const value = form[key];

    return (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "")
    );
  });
};

export default validateRequiredFields;
