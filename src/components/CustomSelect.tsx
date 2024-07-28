import {
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { TSelectedValue, TSelectOptions } from "../types/CategoryTypes";

interface CustomSelectProps {
  options: TSelectOptions[];
  multiple?: boolean;
  onChange: (data: TSelectedValue) => void;
  disabled?: boolean;
  placeholder?: string;
  selectedValue: string | string []
}

const displaySelected = (
  selected: string[],
  options: TSelectOptions[]
) => {
  let selectedLabels = [];

  for (let i = 0; i < options.length; i++) {
    if (selected.includes(options[i].id as string)) {
      selectedLabels.push(options[i].name);
    }
  }

  return selectedLabels.join(", ");
};

const handleRenderValue = (selected : string[] | string, placeholder : string , options: TSelectOptions[]) => {
  if (!selected || (Array.isArray(selected) && selected.length === 0)) {
    return <p className="text-13 text-gray-400 font-medium truncate">{placeholder}</p>;
  }
  return Array.isArray(selected)
    ? displaySelected(selected, options)
    : selected;
};


const CustomSelect = ({
  options,
  multiple = false,
  onChange,
  disabled = false,
  placeholder = "",
  selectedValue
}: CustomSelectProps) => {

  const handleChange = (e: SelectChangeEvent) => {
    const data = {
      isMultiple: multiple,
      value: e.target.value,
    };
    onChange(data);
  };
  return (
    <FormControl fullWidth variant="outlined" sx={{
      maxWidth: '200px',
    }}>
      <Select
        value={selectedValue}
        multiple={multiple}
        onChange={handleChange}
        displayEmpty
        renderValue={(selected) => handleRenderValue(selected, placeholder, options)}
        disabled={disabled}
        sx={{
          width: '100%'
        }}
        
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id} sx={{
            maxWidth:'200px',
          }}>
            {multiple ? (
              <>
                <Checkbox
                  checked={
                    (selectedValue as string[]).indexOf(option.id as string) > -1
                  }
                />
                <ListItemText primary={option.name} />
              </>
            ) : (
              option.name
            )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
