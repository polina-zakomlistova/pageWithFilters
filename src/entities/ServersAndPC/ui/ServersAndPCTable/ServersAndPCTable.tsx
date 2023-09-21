import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    IServerAndPC,
    PCEnum,
    ServersAndPCSchema,
    TagEnum,
} from 'entities/ServersAndPC/model/types/serversAndPCShema';
import { getServersAndPCValue } from 'entities/ServersAndPC/model/selectors/getServersAndPCValue';

import cls from './ServersAndPCTable.module.scss';
//для таблицы
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//для паггинатора
import TablePagination from '@mui/material/TablePagination';
import { getVisibleServersAndPCs } from 'entities/ServersAndPC/model/selectors/getVisibleServersAndPC';
import { Pagination, PaginationItem } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { getFilteredServersAndPCs } from 'entities/ServersAndPC/model/selectors/getFilteredServersAndPCs';
import { getFilteredServersAndPCsByName } from 'entities/ServersAndPC/model/selectors/getFilteredServersAndPCsByName';
import { SearchAndFilterField } from 'widgets/SearchAndFilterField/ui/SearchAndFilterField';

interface ServersAndPCTableProps {}

const ServersAndPCTable: React.FC<ServersAndPCTableProps> = () => {
    enum queryParams {
        PAGE_NUMBER = 'pageNumber',
        FILTER_NAME = 'filterName',
        FILTERS = 'filters',
    }

    // Получение значений из URL
    let [searchParams, setSearchParams] = useSearchParams();
    const pageNumberParam = searchParams.get(queryParams.PAGE_NUMBER);
    const filterNameParam = searchParams.get(queryParams.FILTER_NAME);
    const filtersParam = searchParams.get(queryParams.FILTERS);

    //Начальные данные
    const serversAndPCs: ServersAndPCSchema = useSelector(getServersAndPCValue);

    const [search, setSearch] = useState(filterNameParam || '');

    const [filters, setFilters] = useState(
        filtersParam ? JSON.parse(decodeURIComponent(filtersParam)) : {}
    );

    const [page, setPage] = useState(parseInt(pageNumberParam, 10) || 0); //текущая страница
    const [rowsPerPage, setRowsPerPage] = useState(5); // Количество строк на странице

    //вспомогательные данные
    const columnHeaders: Record<keyof IServerAndPC, string> = {
        name: 'Имя',
        type: 'Тип',
        location: 'Местоположение',
        organizationUnit: 'Подразделение',
        inventoryNumber: 'Инвентарный номер',
        tags: 'Теги',
        dateCreation: 'Дата создания',
        dateUpdate: 'Дата обновления',
        dateAudit: 'Дата аудита',
    };

    const filtersInit = [
        {
            label: 'Тип ПК',
            name: 'type',
            values: Object.values(PCEnum) as string[],
        },
        {
            label: 'Тэги',
            name: 'tags',
            values: Object.values(TagEnum) as string[],
        },
    ];

    // Функция для обработки изменения страницы
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    // Функция для обработки изменения количества строк на странице
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Сбросить страницу при изменении количества строк на странице
    };

    // Функция для обработки изменения строки поиска
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    // Функция для обработки изменения фильтра
    const handleFilterChange = (selectedFilters: Record<string, string[]>) => {
        setFilters(selectedFilters);
    };
    useEffect(() => {
        searchParams.set(queryParams.PAGE_NUMBER, page.toString());

        searchParams.set(queryParams.FILTER_NAME, search);

        const str = JSON.stringify(filters);
        const encodedJsonString = encodeURIComponent(str);
        searchParams.set(queryParams.FILTERS, encodedJsonString);

        setSearchParams(searchParams);
    }, [page, filters, search]);

    //Получаем отфильтрованные данные по имени
    const foundServersAndPCs = useSelector(() =>
        getFilteredServersAndPCsByName(serversAndPCs, search)
    );
    const memoizedFoundServersAndPCs = useMemo(() => {
        return foundServersAndPCs;
    }, [foundServersAndPCs, search]);

    // Получаем отфильтрованные данные по всем фильтрам
    const filteredServersAndPCs = useSelector(() =>
        getFilteredServersAndPCs(memoizedFoundServersAndPCs, filters)
    );

    const memoizedFilteredServersAndPCs = useMemo(() => {
        return filteredServersAndPCs;
    }, [filteredServersAndPCs, filters]);

    // Получаем видимые данные на странице
    const visibleServersAndPCs = useSelector(() =>
        getVisibleServersAndPCs(
            memoizedFilteredServersAndPCs,
            page,
            rowsPerPage
        )
    );

    const memoizedVisibleServersAndPCs = useMemo(() => {
        return visibleServersAndPCs;
    }, [visibleServersAndPCs, page, rowsPerPage]);

    return (
        <div className={cls.wrapper}>
            <SearchAndFilterField
                value={search}
                handleSearchChange={handleSearchChange}
                handleFilterChange={handleFilterChange}
                filters={filtersInit}
                selectedFilters={filters}
                className={cls.search}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {Object.values(columnHeaders).map((field) => (
                                <TableCell key={field}>{field}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {memoizedVisibleServersAndPCs.map(
                            (serverOrPC, index) => (
                                <TableRow key={index}>
                                    {Object.keys(columnHeaders).map((field) => (
                                        <TableCell key={field}>
                                            {serverOrPC[field].toString()}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={memoizedFilteredServersAndPCs.length - 1} // Общее количество элементов
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    nextIconButtonProps={{ style: { display: 'none' } }}
                    backIconButtonProps={{ style: { display: 'none' } }}
                />

                <Pagination
                    count={Math.ceil(
                        (memoizedFilteredServersAndPCs.length - 1) / rowsPerPage
                    )}
                    page={page + 1}
                    onChange={(_, newPage) =>
                        handleChangePage(null, newPage - 1)
                    }
                    showFirstButton
                    showLastButton
                    renderItem={(item) => (
                        <PaginationItem component="button" {...item} />
                    )}
                />
            </TableContainer>
        </div>
    );
};

export default ServersAndPCTable;
