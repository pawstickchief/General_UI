import { writable, derived } from 'svelte/store';

// 定义分页数据接口
export interface Pagination {
    currentPage: number; // 当前页
    pageSize: number;    // 每页显示的条数
    total: number;       // 总条数
}

// 定义排序接口
export interface Sort {
    column: string; // 排序的列
    direction: 'asc' | 'desc' | ''; // 排序方向
}

// 定义筛选接口
export interface Filter {
    column: string; // 筛选的列
    value: string;  // 筛选值
}

// 定义表格状态接口
export interface TableState<T> {
    data: T[];                    // 数据源
    filteredData: T[];            // 筛选后的数据
    selectedRows: T[];            // 选中的行
    pagination: Pagination;       // 分页信息
    sort: Sort;                   // 排序信息
    filters: Filter[];            // 筛选条件
}

// 默认表格状态
const defaultState = {
    data: [],
    filteredData: [],
    selectedRows: [],
    pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
    },
    sort: {
        column: '',
        direction: '',
    },
    filters: [],
};

// 创建表格 store
export function createTableStore<T>() {
    const { subscribe, set, update } = writable<TableState<T>>({ ...defaultState });

    return {
        subscribe,
        setData: (data: T[]) =>
            update((state) => {
                state.data = data;
                state.filteredData = data;
                state.pagination.total = data.length;
                return state;
            }),
        setPagination: (pagination: Partial<Pagination>) =>
            update((state) => {
                state.pagination = { ...state.pagination, ...pagination };
                return state;
            }),
        setSort: (sort: Partial<Sort>) =>
            update((state) => {
                state.sort = { ...state.sort, ...sort };
                return state;
            }),
        setFilters: (filters: Filter[]) =>
            update((state) => {
                state.filters = filters;
                state.filteredData = state.data.filter((item) => {
                    return filters.every((filter) =>
                        String(item[filter.column]).includes(filter.value)
                    );
                });
                state.pagination.total = state.filteredData.length;
                return state;
            }),
        selectRows: (rows: T[]) =>
            update((state) => {
                state.selectedRows = rows;
                return state;
            }),
        clearSelection: () =>
            update((state) => {
                state.selectedRows = [];
                return state;
            }),
        reset: () => set({ ...defaultState }),
    };
}


