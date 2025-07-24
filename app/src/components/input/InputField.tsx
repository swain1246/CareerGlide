import React, { JSX, useEffect, useState, KeyboardEvent } from 'react';
import DatePicker from 'react-datepicker';
import PhoneInput from 'react-phone-number-input';
import { Button, Tooltip } from 'antd';
import { Info, Visibility, VisibilityOff, Delete as DeleteIcon } from '@mui/icons-material';
import { CustomSelectChangeEvent } from './SelectField';

interface CustomDateEvent<T> {
  value: T;
  name: string;
  type: string;
  dataset?: {
    [key: string]: any | undefined;
  };
}

export type CustomSelectDateEvent = CustomDateEvent<string>;

type InputFieldProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: any;
  onChangeInput: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | CustomSelectChangeEvent | CustomSelectDateEvent
    >,
  ) => void;
  style?: React.CSSProperties;
  onBlur?: (e: React.FocusEvent<HTMLElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLElement | HTMLTextAreaElement>) => void;
  maxLength?: number;
  minLength?: number;
  error?: string | string[];
  disabled?: boolean;
  dataType?: string;
  strict?: boolean;
  tooltipTitle?: string;
  required?: boolean;
  minDate?: string | null;
  maxDate?: string | null;
  onEmptyNull?: boolean;
  trim?: boolean;
  className?: string;
  dateFormat?: string;
  multipleFields?: boolean;
  newFieldlabel?: string;
  dataIndex?: number;
  onAddItem?: (name: string, index: number) => void;
  onRemoveItem?: (name: string, index: number) => void;
  rows?: number;
};

const InputField = ({
  label,
  type,
  value,
  error,
  tooltipTitle,
  required = false,
  className = '',
  multipleFields = false,
  newFieldlabel,
  onRemoveItem,
  onAddItem,
  ...props
}: InputFieldProps): JSX.Element => {
  const [valuesOption, setValuesOption] = useState<any[]>([]);

  useEffect(() => {
    if (multipleFields) {
      setValuesOption(Array.isArray(value) && value.length > 0 ? value : [null]);
    }
  }, [value, multipleFields]);

  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500">*</span>}
          {tooltipTitle && (
            <Tooltip title={tooltipTitle}>
              <Info fontSize="small" className="cursor-pointer ml-1 text-gray-400" />
            </Tooltip>
          )}
        </label>
        {multipleFields && (
          <Button
            type="primary"
            size="small"
            onClick={() => onAddItem && onAddItem(props.name, valuesOption.length)}
            className="bg-blue-600 text-white"
          >
            {newFieldlabel ?? '+ Add'}
          </Button>
        )}
      </div>

      {multipleFields ? (
        <div className="space-y-3">
          {valuesOption.map((_, index) => (
            <div key={index} className="flex gap-2 items-start">
              <div className="flex-1">
                <SinglInputField
                  label={label}
                  type={type}
                  value={Array.isArray(value) ? value[index] : value}
                  error={Array.isArray(error) ? error[index] : error}
                  required={required}
                  dataIndex={index}
                  multipleFields={multipleFields}
                  {...props}
                />
              </div>
              {valuesOption.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveItem && onRemoveItem(props.name, index)}
                  className="text-red-500 hover:text-red-700 mt-1"
                >
                  <DeleteIcon fontSize="small" />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <SinglInputField
          label={label}
          type={type}
          value={value}
          error={error}
          required={required}
          multipleFields={false}
          {...props}
        />
      )}
    </div>
  );
};

const SinglInputField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChangeInput,
  onKeyDown,
  error,
  dataType,
  strict,
  minDate,
  maxDate,
  required = false,
  disabled = false,
  onEmptyNull = false,
  trim = false,
  onBlur,
  dataIndex,
  rows = 3,
  ...props
}: InputFieldProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';

  const dateString = (date: Date): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateInput = (date: Date | null) => {
    if (disabled) return;

    const eventValue = date ? (type === 'date' ? dateString(date) : date.toISOString()) : '';

    const target = {
      name,
      value: eventValue,
      type,
      dataset: {
        type: dataType || type,
        strict,
        label: label ?? '',
        minDate: minDate ?? '',
        maxDate: maxDate ?? '',
        required,
        empty: onEmptyNull,
        index: dataIndex,
      },
    } as CustomSelectDateEvent;

    onChangeInput({ target } as React.ChangeEvent<CustomSelectDateEvent>);
  };

  const getDateValue = (val: any): Date | null => {
    try {
      return val ? new Date(val) : null;
    } catch {
      return null;
    }
  };

  const handlePhoneInput = (phoneValue?: string) => {
    if (disabled) return;

    const target = {
      name,
      value: phoneValue || '',
      type,
      dataset: {
        type: dataType || type,
        strict,
        label: label ?? '',
        required,
        empty: onEmptyNull,
        index: dataIndex,
      },
    } as CustomSelectDateEvent;

    onChangeInput({ target } as React.ChangeEvent<CustomSelectDateEvent>);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (disabled) return;
    onChangeInput(e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
  };

  const commonInputProps = {
    name,
    placeholder,
    disabled,
    value: value ?? '',
    onChange: handleChange,
    onKeyDown,
    onBlur,
    className: `w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      error ? 'border-red-500' : 'border-gray-300'
    } ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'}`,

    ...props,
  };

  return (
    <div className="relative">
      {type === 'mobilenumber' ? (
        <PhoneInput
          {...commonInputProps}
          international
          withCountryCallingCode
          onChange={handlePhoneInput}
          className="!w-full"
        />
      ) : ['date', 'datetime'].includes(type) ? (
        <DatePicker
          selected={getDateValue(value)}
          onChange={handleDateInput}
          placeholderText={placeholder}
          showTimeSelect={type === 'datetime'}
          maxDate={maxDate ? new Date(maxDate) : undefined}
          minDate={minDate ? new Date(minDate) : undefined}
          className={`w-full ${commonInputProps.className} text-black`}
          disabled={disabled}
        />
      ) : type === 'textarea' ? (
        <textarea {...commonInputProps} rows={rows} />
      ) : (
        <div className="relative">
          <input
            {...commonInputProps}
            type={isPasswordField ? (showPassword ? 'text' : 'password') : type}
            data-type={dataType || type}
            data-strict={strict}
            data-empty={onEmptyNull}
            data-trim={trim}
            data-required={required}
            data-index={dataIndex}
            autoComplete={isPasswordField ? 'current-password' : 'off'}
            className={`w-full ${commonInputProps.className}`}
          />
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </button>
          )}
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
