import { Info, Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Tooltip } from 'antd';
import React, { JSX, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneInput from 'react-phone-number-input';

interface CustomDateEvent<T> {
  value: T;
  name: string;
  type: string;
  dataset?: {
    [key: string]: any | undefined; // Index signature for optional key-value pairs
  };
}

export type CustomSelectDateEvent = CustomDateEvent<string>;

type InputFieldProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: any;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement | CustomSelectDateEvent>) => void; // Define the type for onChangeInput function
  style?: React.CSSProperties;
  onBlur?: (e: any) => void; // Define the type for onKeyDown function
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Define the type for onKeyDown function
  maxLength?: number;
  minLength?: number;
  error?: string;
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
};

const InputField = ({
  label,
  type,
  value,
  style,
  error,
  tooltipTitle,
  required = false,
  className = '',
  onBlur,
  multipleFields = false,
  newFieldlabel,
  onRemoveItem,
  onAddItem,
  ...props
}: InputFieldProps): JSX.Element => {
  const [valuesOption, setValuesOption] = useState<any[]>([]);

  useEffect(() => {
    if (multipleFields) {
      if (value && Array.isArray(value) && value.length > 0) {
        setValuesOption(value);
      } else {
        setValuesOption([null]);
      }
    }
  }, [value, multipleFields]);

  return (
    <Form.Group className={`mb-3 group-relative ${className}`}>
      <div className="d-flex justify-content-between mb-2">
        <Form.Label className="m-0">
          {label}
          {required && <span className="required">* </span>}
          {tooltipTitle && (
            <Tooltip placement="top" title={tooltipTitle} trigger={'hover'}>
              <Info fontSize="small" className="cursor-pointer" />
            </Tooltip>
          )}
        </Form.Label>
        {multipleFields && (
          <Button
            className="add-more btn-theme"
            // variant="custom-link"
            onClick={() => onAddItem && onAddItem(props.name, valuesOption.length)}
          >
            {newFieldlabel ?? `+ Add`}
          </Button>
        )}
      </div>
      {multipleFields ? (
        <>
          {valuesOption.map((_, index) => (
            <div className="d-flex mb-3 gap-2" key={index}>
              <div className="w-100">
                <SinglInputField
                  label={label}
                  type={type}
                  value={value && value[index]}
                  error={error && error[index]}
                  style={style}
                  required={required}
                  dataIndex={index}
                  className={className}
                  multipleFields={multipleFields}
                  onBlur={onBlur}
                  {...props}
                />
              </div>
              {valuesOption.length > 1 && (
                <>
                  <DeleteIcon
                    className="delete-icon cursor-pointer ml-1"
                    fontSize="large"
                    onClick={() => onRemoveItem && onRemoveItem(props.name, index)}
                  />
                </>
              )}
            </div>
          ))}
        </>
      ) : (
        <SinglInputField
          label={label}
          type={type}
          value={value}
          style={style}
          required={required}
          className={className}
          multipleFields={multipleFields}
          onBlur={onBlur}
          error={error}
          {...props}
        />
      )}
    </Form.Group>
  );
};

const SinglInputField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChangeInput,
  style,
  onKeyDown,
  error,
  dataType,
  strict,
  tooltipTitle,
  minDate,
  maxDate,
  required = false,
  disabled = false,
  onEmptyNull = false,
  trim = false,
  className = '',
  onBlur,
  dataIndex,
  ...props
}: InputFieldProps): JSX.Element => {
  const isPasswordField = type == 'password';

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const dateString = (epochDate: Date): string => {
    const date = new Date(epochDate);
    if (!date) {
      return '';
    }
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, '0');

    // Format the date in yyyy-mm-dd
    return `${year}-${month}-${day}`;
  };

  const handleDateInput = (date: Date | null) => {
    if (disabled) return;
    const target = {
      name: name,
      value: date ? (type == 'date' ? dateString(date) : date.toISOString()) : '',
      type: type,
      dataset: {
        type: dataType || type,
        strict: strict,
        label: label ?? '',
        minDate: minDate ?? '',
        maxDate: maxDate ?? '',
        required: required,
        empty: onEmptyNull,
        index: dataIndex,
      },
    } as CustomSelectDateEvent;
    const event = {
      target: target,
    } as React.ChangeEvent<CustomSelectDateEvent>;
    onChangeInput(event);
  };

  const getDateValue = (value: any): any => {
    try {
      if (type == 'date') {
        return value ? dateString(value as any) : '';
      } else {
        return value ? new Date(value as any) : '';
      }
    } catch (e) {
      return '';
    }
  };

  const handlePhoneInput = (value?: string) => {
    if (disabled) return;
    const target = {
      name: name,
      value: value,
      type: type,
      dataset: {
        type: dataType || type,
        strict: strict,
        label: label ?? '',
        required: required,
        empty: onEmptyNull,
        index: dataIndex,
      },
    } as CustomSelectDateEvent;
    const event = {
      target: target,
    } as React.ChangeEvent<CustomSelectDateEvent>;
    onChangeInput(event);
  };

  const passwordType = isPasswordField ? (showPassword ? 'text' : type) : type;

  return (
    <>
      {['mobilenumber'].includes(type) ? (
        <PhoneInput
          name={name}
          onChange={handlePhoneInput}
          onKeyDown={onKeyDown}
          international
          withCountryCallingCode
          className="form-control"
          disabled={disabled}
          {...props}
        />
      ) : ['date', 'datetime'].includes(type) ? (
        <DatePicker
          onChange={handleDateInput}
          selected={getDateValue(value)}
          placeholderText={placeholder}
          name={name}
          onKeyDown={(e: React.KeyboardEvent) =>
            disabled ? () => {} : onKeyDown && onKeyDown(e as any)
          }
          showTimeSelect={['datetime'].includes(type)}
          className="form-control"
          maxDate={maxDate ? new Date(maxDate) : undefined}
          minDate={minDate ? new Date(minDate) : undefined}
          disabled={disabled}
          {...props}
        />
      ) : (
        <Form.Control
          type={passwordType}
          placeholder={placeholder}
          name={name}
          data-type={dataType || type}
          data-strict={strict}
          data-empty={onEmptyNull}
          data-label={label}
          data-required={required}
          data-trim={trim}
          data-index={dataIndex}
          value={value ?? ''}
          onChange={(e: React.ChangeEvent) => (disabled ? () => {} : onChangeInput(e as any))}
          onKeyDown={(e: React.KeyboardEvent) =>
            disabled ? () => {} : onKeyDown && onKeyDown(e as any)
          }
          disabled={disabled}
          autoComplete={'off'}
          as={type == 'textarea' ? 'textarea' : undefined}
          onBlur={(e: React.ChangeEvent) => onBlur && onBlur(e as any)}
          {...props}
        />
      )}
      {isPasswordField && (
        <span className="password-eye-icon" onClick={handleTogglePassword}>
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </span>
      )}
      {error && <p className="error">{error}</p>}
    </>
  );
};
export default InputField;
