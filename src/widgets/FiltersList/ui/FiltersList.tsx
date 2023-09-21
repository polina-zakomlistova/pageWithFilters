import React, { useState, useEffect } from 'react';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import cls from './FiltersList.module.scss';

interface FilterOption {
    label: string;
    name: string;
    values: string[];
}

interface FiltersProps {
    filters: FilterOption[];
    selectedValues: Record<string, string[]>; // Значения фильтров, переданные сверху
    onFilterChange: (selectedFilters: Record<string, string[]>) => void;
}

export function FiltersList({
    filters,
    selectedValues,
    onFilterChange,
}: FiltersProps) {
    //инициализация списка фильтров
    const initialSelectedFilters = Object.fromEntries(
        filters.map((filter) => [filter.name, []])
    );

    //заполнение списка фильтров по исходным данным
    for (const key in initialSelectedFilters) {
        if (selectedValues.hasOwnProperty(key)) {
            initialSelectedFilters[key] = selectedValues[key];
        }
    }

    const [selectedFilters, setSelectedFilters] = useState<
        Record<string, string[]>
    >(initialSelectedFilters);

    const handleFilterChange = (name: string, selectedValues: string[]) => {
        setSelectedFilters({
            ...selectedFilters,
            [name]: selectedValues,
        });
    };

    useEffect(() => {
        onFilterChange(selectedFilters);
    }, [selectedFilters, onFilterChange]);

    return (
        <div className={cls.wrapper}>
            {filters.map((filter) => (
                <FormControl key={filter.name} className={cls.formControl}>
                    <InputLabel>{filter.label}</InputLabel>
                    <Select
                        multiple
                        value={selectedFilters[filter.name] || []}
                        onChange={(e) => {
                            const value = e.target.value;
                            const selectedOptions =
                                typeof value === 'string'
                                    ? value.split(',')
                                    : value;
                            handleFilterChange(filter.name, selectedOptions);
                        }}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {filter.values.map((value) => (
                            <MenuItem
                                key={value.toString()}
                                value={value.toString()}
                            >
                                <Checkbox
                                    checked={
                                        selectedFilters[filter.name].indexOf(
                                            value.toString()
                                        ) > -1
                                    }
                                />
                                <ListItemText primary={value} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ))}
        </div>
    );
}
