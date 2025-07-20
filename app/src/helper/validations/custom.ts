import { getRegex, validateInputs } from './validation';

export type InputError = {
  field: string;
  errorMsg: string;
};

interface ValidateFieldParams {
  name: string;
  label: string;
  value: string | boolean;
  type: string;
  minLength?: number | null;
  maxLength?: number | null;
  fieldType?: string | null;
  minDate?: string | null;
  maxDate?: string | null;
  required?: boolean;
  dataType?: string;
  multipleFields?: boolean;
}

// Function to check validation for a single input field
export const checkValidation = (props: ValidateFieldParams): InputError | null => {
  const error = fieldValidator(props);
  if (error) {
    return { field: error.field, errorMsg: error.errorMsg };
  }
  return null;
};

// Function to validate input field and return error if any
export const validateFieldError = ({
  name,
  label,
  value,
  type,
  dataType,
  minLength = null,
  maxLength = null,
  required = false,
  minDate = null,
  maxDate = null,
  multipleFields = false,
}: ValidateFieldParams): InputError | null => {
  if (multipleFields) {
    return null;
  }
  if (
    (typeof value == 'string' && value.trim() === '') ||
    (!value && typeof value !== 'number') ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return { field: name, errorMsg: required ? `${label} is required` : '' };
  }

  const fieldType = dataType ?? type;
  const error = fieldValidator({
    name,
    label,
    value,
    type: fieldType,
    minLength,
    maxLength,
    minDate,
    maxDate,
    required,
  });
  if (error) {
    return { field: error.field, errorMsg: error.errorMsg };
  }
  return null;
};

// Function to check strict value based on regex pattern
export const checkStrictValue = (
  value: string | boolean,
  type: string,
  strict: boolean,
): boolean => {
  if (value === '') {
    return true;
  }
  if (strict) {
    const regEx = getRegex(type);
    if (regEx && typeof value === 'string') {
      return regEx.test(value);
    }
  }
  return true;
};

type FieldValidatorResult = {
  getError: boolean;
  fieldNameErr: string;
  errorMsg: string;
  field: string;
  setClassName: string;
};

// Internal function to validate field based on its type and constraints
const fieldValidator = ({
  name,
  label,
  value,
  type,
  minLength = null,
  maxLength = null,
  fieldType = null,
  minDate = null,
  maxDate = null,
  required = false,
}: ValidateFieldParams): FieldValidatorResult => {
  let getError = false;
  let fieldNameErr = name + 'Err';
  let errorMsg = '';

  if (typeof value == 'boolean') {
    return {
      getError,
      fieldNameErr,
      errorMsg,
      field: name,
      setClassName: getError ? 'error' : '',
    };
  }

  if (
    required &&
    ((typeof value == 'string' && value.trim() === '') ||
      (!value && typeof value !== 'number') ||
      (Array.isArray(value) && value.length === 0))
  ) {
    errorMsg = `${label} is required.`;
    getError = true;
  } else if (validateInputs(type, value) === 'empty') {
    errorMsg = fieldType === 'select' ? `Select ${label}.` : `Enter ${label}.`;
    getError = true;
  } else if (['date', 'datetime'].includes(type)) {
    if (value) {
      const format = type == 'date' ? '%Y-%m-%d' : '%B %d, %Y %I:%M %p';
      let date = new Date(value);
      if (isNaN(date.getTime())) {
        errorMsg = 'Invalid date format';
        getError = true;
      } else {
        if (minDate) {
          let min = new Date(minDate);
          if (date < min) {
            const minDateObj = new Date(minDate);
            const minDateStr = minDateObj.toLocaleDateString(undefined, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });
            errorMsg = `${label} must be on or after ${minDateStr}`;
            getError = true;
          }
        }

        if (maxDate && !getError) {
          let max = new Date(maxDate);
          if (date > max) {
            const maxDateObj = new Date(maxDate);
            const maxDateStr = maxDateObj.toLocaleDateString(undefined, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });
            errorMsg = `${label} must be on or before ${maxDateStr}`;
            getError = true;
          }
        }
      }
    }
  } else if (validateInputs(type, value) === false) {
    if (name === 'password' || name === 'confirm_password') {
      if (maxLength !== null && value.trim().length > maxLength) {
        errorMsg = `Maximum ${maxLength} ${
          type === 'string' || type === 'required' || type === 'Alphanumeric' || type === 'password'
            ? 'characters'
            : 'digits'
        } are allowed.`;
        getError = true;
      }
      if (minLength !== null && value.trim().length < minLength) {
        errorMsg = `Minimum ${minLength} ${
          type === 'string' || type === 'required' || type === 'Alphanumeric' || type === 'password'
            ? 'characters'
            : 'digits'
        } are required.`;
        getError = true;
      }
      if (
        minLength != null &&
        maxLength != null &&
        value.trim().length >= minLength &&
        value.trim().length <= maxLength
      ) {
        if (/[a-z]/.test(value.trim()) === false) {
          errorMsg = `A lowercase ${
            type === 'string' ||
            type === 'required' ||
            type === 'Alphanumeric' ||
            type === 'password'
              ? 'letter'
              : 'digit'
          } is required.`;
          getError = true;
        } else if (/[A-Z]/.test(value.trim()) === false) {
          errorMsg = `A uppercase ${
            type === 'string' ||
            type === 'required' ||
            type === 'Alphanumeric' ||
            type === 'password'
              ? 'letter'
              : 'digit'
          } is required.`;
          getError = true;
        } else if (/[0-9]/.test(value.trim()) === false) {
          errorMsg = `A  ${
            type === 'string' || type === 'required' || type === 'Alphanumeric'
              ? 'characters'
              : 'digit'
          } is required.`;
          getError = true;
        } else if (
          /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/.test(value.trim()) === false
        ) {
          errorMsg = 'A special character is required.';
          getError = true;
        } else if (/^\S*$/.test(value) === false) {
          errorMsg = 'Password must not contain whitespaces.';
          getError = true;
        }
      }
    } else {
      if (type === 'email') {
        errorMsg = `Enter valid ${type}.`;
      }
      if (type === 'symbolWithOneAlphabatics') {
        errorMsg = 'Enter symbol with alphabets only.';
      }
      if (type === 'dotWithOneAlphanumeric') {
        errorMsg =
          'Input cannot start with a dot (.) and only a single dot (.) is allowed. Additionally, only alphanumeric characters are permitted.';
      }
      if (type === 'symbolWithOneAlphanumeric') {
        errorMsg =
          'Input can start with a special character (excluding %) followed by an alphanumeric character';
      } else {
        errorMsg = `Enter valid ${label}.`;
      }
    }
    getError = true;
  } else if (validateInputs('consecsutivespace', value) === true) {
    if (name === 'alertName') {
      errorMsg = 'Not more than two spaces allowed between characters.';
      getError = true;
    }
  } else if (maxLength !== null && typeof value == 'string' && value.trim().length > maxLength) {
    errorMsg = `Enter less than ${maxLength} ${
      type === 'string' ||
      type === 'required' ||
      type === 'Alphanumeric' ||
      type === 'dotWithOneAlphanumeric' ||
      type === 'symbolWithOneAlphanumeric' ||
      type === 'symbolWithOneAlphabatics'
        ? 'characters'
        : 'digits'
    }.`;
    getError = true;
  } else if (minLength !== null && typeof value == 'string' && value.trim().length < minLength) {
    errorMsg = `Enter at least ${minLength} ${
      type === 'string' ||
      type === 'required' ||
      type === 'Alphanumeric' ||
      type === 'dotWithOneAlphanumeric' ||
      type === 'symbolWithOneAlphanumeric' ||
      type === 'symbolWithOneAlphabatics'
        ? 'characters'
        : 'digits'
    }.`;
    getError = true;
  }

  return {
    getError,
    fieldNameErr,
    errorMsg,
    field: name,
    setClassName: getError ? 'error' : '',
  };
};
