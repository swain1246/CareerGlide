import React from 'react';
import { checkStrictValue, checkValidation } from './validations/custom';
import { CustomSelectChangeEvent } from '@src/components/input/SelectField';
import { CustomSelectDateEvent } from '@src/components/input/InputField';

// Function to format a date string into a specific format
export const formatDate = (time: string): string => {
  const date = new Date(time);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24-hour format
  };

  return new Intl.DateTimeFormat('en-GB', options).format(date);
};

type ValidateInputValue = {
  value: string | boolean;
  error: string;
  key: string;
  changable: boolean;
  trim: boolean;
  index: number | undefined;
};
export const ValidateInputValue = (
  event: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | CustomSelectChangeEvent | CustomSelectDateEvent
  >,
  eventType: string = 'change',
): ValidateInputValue => {
  let booleanType: boolean = false;
  var value: string | boolean | number = event.target.value,
    type = event.target.dataset?.type ?? event.target.type,
    index = event.target.dataset?.index ?? undefined;
  let maxLength = null,
    minLength = null,
    maxDate = null,
    minDate = null,
    trim = false;

  if (index && typeof index === 'string') {
    index = Number(index);
    index = isNaN(index) ? undefined : index;
  }

  if (event.target instanceof HTMLInputElement) {
    maxLength = event.target.maxLength > 0 ? event.target.maxLength : null;
    minLength = event.target.minLength > 0 ? event.target.minLength : null;
    trim = !!(event.target.dataset?.trim ?? false);
  }

  if (['date', 'datetime'].includes(type)) {
    minDate = event.target.dataset?.minDate ?? null;
    maxDate = event.target.dataset?.maxDate ?? null;
  }

  let response: ValidateInputValue = {
    value: value,
    error: '',
    key: event.target.name,
    changable: false,
    trim: trim,
    index: index,
  };
  let required = false;
  if (typeof event.target.dataset?.required === 'boolean') {
    required = event.target.dataset.required;
  } else if (typeof event.target.dataset?.required === 'string') {
    required = event.target.dataset.required.toLowerCase() === 'true';
  }

  if (!required && (!value || (typeof value == 'string' && value.trim() === ''))) {
    return { ...response, changable: true };
  }

  if (type === 'password' || type === 'email') {
    value = event.target.value.replace(/\s+/g, '');
  }

  if (event.target instanceof HTMLInputElement && type === 'checkbox') {
    value = event.target.checked;
    booleanType = typeof value == 'boolean';
  }

  if (['decimalsingledigit', 'decimaltwodigit'].includes(type) && eventType == 'blur') {
    if (value.toString().endsWith('.')) {
      value = value.toString().slice(0, -1);
    }
  }

  let error = checkValidation({
    name: event.target.name,
    label: event.target.dataset?.label ?? event.target.name,
    value,
    type,
    minLength,
    maxLength,
    minDate,
    maxDate,
    required,
  });

  var changable = checkStrictValue(value, type, !!event.target.dataset?.strict);

  if (changable || booleanType || (!booleanType && !value)) {
    response = { ...response, value: value, changable: changable };
  }

  if (error) {
    response = { ...response, error: error.errorMsg };
  }
  return response;
};

// get file name from presigned url
export function getFileNameFromPresignedUrl(url: string): string {
  // Create a new URL object
  if (!(url && url.length > 0)) {
    return '';
  }
  const urlObj = new URL(url);

  // Get the pathname from the URL object
  const pathname: string = urlObj.pathname;

  // Split the pathname by '/' and get the last part
  const fileName: string = pathname.split('/').pop() || '';

  return fileName;
}
