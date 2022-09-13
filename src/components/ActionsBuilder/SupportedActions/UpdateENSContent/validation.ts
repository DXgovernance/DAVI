export const isEnsName = (
  name: string
): { isValid: boolean; validationError: string } => {
  let isValid = true;
  let validationError = null;

  if (!name) {
    validationError = 'Name cannot be empty';
    isValid = false;
    return { isValid, validationError };
  }

  let labelArray = name.split('.');

  let numberOfInvalidLabels = labelArray.filter(
    element => element.length === 0
  );
  if (numberOfInvalidLabels.length > 0) {
    validationError = 'Domain names have invalid length';
    isValid = false;
  }

  if (name.includes(' ')) {
    validationError = 'Domain name cannot include spaces';
    isValid = false;
  }

  if (labelArray.length > 3) {
    validationError =
      'Domain cannot be more than three levels deep (subdomain.domain.eth)';
    isValid = false;
  }

  return { isValid, validationError };
};
