type positionAndGroupField = {
  groupName?: string; // Optional group property
  className?: string; // Optional className property
  groupPosition?: number; // Optional groupPosition property
  fieldPosition?: number; // Optional field position for sorting items
};

export type GlobalInputFieldType = {
  name: string;
  label: string;
  type: string;
  dataType: string;
  strict?: boolean;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  maxDate?: string | null;
  minDate?: string | null;
  selectEmpty?: boolean;
  options?: Array<{ value: string | number | boolean; label: string }>;
  disabled?: boolean;
  showSearch?: boolean;
  onSearch?: (search: string) => void;
  loading?: boolean;
  onEmptyNull?: boolean;
  tooltipTitle?: string;
  dateFormat?: string;
  multipleFields?: boolean;
  rows?: number;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  fieldClassName?: string;
  component?: React.ReactNode;
  mode?: 'multiple' | 'tags';
  value?: string;
  newFieldlabel?: string;
  selectCustomButton?: React.ReactNode;
} & positionAndGroupField;

export type GlobalReadOnlyFieldType = {
  name: string;
  label: string;
  type?: string;
  multiple?: boolean;
} & positionAndGroupField;

export type GlobalInputFieldTypesRecord = Record<string, GlobalInputFieldType[]>;
export type GlobalReadOnlyFieldTypeRecord = Record<string, GlobalReadOnlyFieldType[]>;

// Define types
export interface GlobalInputFieldsType {
  groupName: string;
  addRow?: boolean;
  removeRow?: boolean;
  multiple?: boolean;
  minRow?: number;
  maxRow?: number;
  rowCount?: number;
  stateKey?: string;
  fields: GlobalInputFieldType[];
}
