import React from 'react';
import { InfoOutlined } from '@mui/icons-material';
import { Tooltip } from 'antd';

export interface CustomChangeSelectEvent<T> {
  value: T;
  name: string;
  type: string;
  dataset?: { [key: string]: any };
}

export type CustomSelectChangeEvent = CustomChangeSelectEvent<string>;

interface SelectFieldProps {
  label: string;
  name: string;
  options?: Array<{ value: string | number | boolean; label: string }>;
  value: string;
  onChangeInput: (e: React.ChangeEvent<CustomSelectChangeEvent>) => void;
  style?: React.CSSProperties;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  tooltipTitle?: string;
  placeholder?: string;
  onBlur?: (e: React.ChangeEvent<CustomSelectChangeEvent>) => void;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options = [],
  value,
  onChangeInput,
  style,
  error,
  disabled = false,
  required = false,
  tooltipTitle,
  onBlur,
  className = '',
  placeholder = 'Select an option',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = {
      value: e.target.value,
      name,
      type: 'select',
      dataset: { label, strict: true, required },
    } as CustomSelectChangeEvent;

    const event = {
      target,
    } as React.ChangeEvent<CustomSelectChangeEvent>;

    onChangeInput(event);
  };

  return (
    <div className={`mb-4 w-full ${className}`}>
      <label className="block mb-1 text-sm font-medium text-gray-700" style={style}>
        {label}
        {required && <span className="text-red-500"> *</span>}
        {tooltipTitle && (
          <Tooltip title={tooltipTitle}>
            <InfoOutlined className="ml-1 inline-block text-gray-400 cursor-pointer" />
          </Tooltip>
        )}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-full px-3 py-2 border text-sm rounded-md focus:outline-none 
          ${error ? 'border-red-500' : 'border-gray-300'} 
          focus:ring-2 focus:ring-blue-500 bg-white`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value.toString()} value={opt.value.toString()}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SelectField;
