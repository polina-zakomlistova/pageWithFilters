import React, { useState, FC } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FiltersList } from 'widgets/FiltersList';

interface IfilterOption {
    label: string;
    name: string;
    values: string[];
}

interface SearchAndFilterFieldProps {
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFilterChange: (selectedFilters: Record<string, string[]>) => void;
    value: string;
    filters: IfilterOption[];
    selectedFilters?: Record<string, string[]>;
    className?: string;
}

export function SearchAndFilterField(props: SearchAndFilterFieldProps) {
    const {
        handleSearchChange,
        value,
        filters,
        selectedFilters,
        handleFilterChange,
        className,
    } = props;
    const [isFilterModalOpen, setFilterModalOpen] = useState(false);

    const handleOpenFilterModal = () => {
        setFilterModalOpen(true);
    };

    const handleCloseFilterModal = () => {
        setFilterModalOpen(false);
    };

    return (
        <div className={className}>
            <TextField
                value={value}
                fullWidth
                variant="outlined"
                placeholder="Поиск..."
                onChange={handleSearchChange}
                InputProps={{
                    startAdornment: (
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    ),
                    endAdornment: (
                        <IconButton onClick={handleOpenFilterModal}>
                            <FilterListIcon />
                        </IconButton>
                    ),
                }}
            />

            <Modal
                open={isFilterModalOpen}
                onClose={handleCloseFilterModal}
                aria-labelledby="filter-modal-title"
                aria-describedby="filter-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2 id="filter-modal-title">Фильтры</h2>
                    <FiltersList
                        filters={filters}
                        selectedValues={selectedFilters}
                        onFilterChange={handleFilterChange}
                    />

                    <Button onClick={handleCloseFilterModal}>Закрыть</Button>
                </Box>
            </Modal>
        </div>
    );
}
