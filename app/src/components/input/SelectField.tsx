import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Select, Spin } from 'antd';
import { Info } from '@mui/icons-material';
import { Tooltip } from 'antd';

interface CustomChangeSelectEvent<T> {
  value: T;
  name: string;
  type: string;
  dataset?: {
    [key: string]: any | undefined; // Index signature for optional key-value pairs
  };
}

export type CustomSelectChangeEvent = CustomChangeSelectEvent<string>;

interface SelectFieldProps {
  label: string;
  name: string;
  options?: Array<{ value: string | number | boolean; label: string }>; // Define the type for options array
  value: string; // Define the type for data object
  onChangeInput: (e: React.ChangeEvent<CustomSelectChangeEvent>) => void; // Define the type for onChangeInput function
  style?: React.CSSProperties;
  error?: string;
  disabled?: boolean;
  selectEmpty?: boolean;
  required?: boolean;
  tooltipTitle?: string;
  placeholder?: string;
  showSearch?: boolean;
  onSearch?: (search: string) => void;
  onClear?: () => void;
  onBlur?: (e: React.ChangeEvent<CustomSelectChangeEvent>) => void;
  loading?: boolean;
  className?: string;
  mode?: 'multiple' | 'tags';
  selectCustomButton?: React.ReactNode;
}

const SelectField = ({
  label,
  name,
  options = [],
  value,
  onChangeInput,
  style,
  error,
  selectEmpty,
  tooltipTitle,
  showSearch,
  onSearch,
  required = false,
  onBlur,
  loading,
  className = '',
  mode = undefined,
  selectCustomButton,
  ...props
}: SelectFieldProps) => {
  const [search, setSearch] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    onSearch && onSearch(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const onDropdownVisibleChange = (open: boolean) => {
    setOpen(open);
  };

  const handleInputChange = (value: any) => {
    const target = {
      value: value,
      name: name,
      type: 'select',
      dataset: { label: label, strict: true, required: required },
    } as CustomSelectChangeEvent;
    const event = {
      target: target,
    } as React.ChangeEvent<CustomSelectChangeEvent>;
    onChangeInput(event);
  };

  const renderDropDown = (menu: React.ReactElement) => {
    if (selectCustomButton) {
      // Cloning and adding a new prop
      return (
        <>
          {menu}
          <div onClick={() => setOpen(false)}>{selectCustomButton}</div>
        </>
      );
    }
    return menu;
  };

  const validValue = options.some((option) => option.value === value) ? value : undefined;

  return (
    <Form.Group className={`mb-3 group-relative ${className}`}>
      <Form.Label style={style}>
        {label}
        {required && <span className="required">* </span>}
        {tooltipTitle && (
          <Tooltip placement="top" title={tooltipTitle} trigger={'hover'}>
            <Info fontSize="small" className="cursor-pointer" />
          </Tooltip>
        )}
      </Form.Label>
      <Select
        mode={mode}
        open={open}
        onDropdownVisibleChange={onDropdownVisibleChange}
        value={mode ? value : validValue}
        showSearch={showSearch}
        searchValue={search}
        onSearch={showSearch ? setSearch : undefined}
        onChange={handleInputChange}
        options={options}
        dropdownRender={renderDropDown}
        className="antd-select"
        onClear={() => {
          setSearch('');
          handleInputChange(null);
        }}
        filterOption={false}
        autoClearSearchValue
        allowClear={selectEmpty}
        notFoundContent={loading ? <Spin size="small" /> : undefined}
        {...props}
      />
      {error && <p className="error">{error}</p>}
    </Form.Group>
  );
};

export default SelectField;
