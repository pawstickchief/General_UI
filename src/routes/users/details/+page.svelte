<script lang="ts">
    import Layout from "../../../layouts/Layout.svelte";
    import FormTable from "../../../components/Table/FormTable.svelte";
    import FormSearch from "../../../components/Table/FormSearch.svelte";
    import type { User } from "../../../types/index";

    // 表格列定义
    let columns = [
        { label: '用户名', key: 'username', sortable: true },
        { label: '邮箱', key: 'email', sortable: true },
        { label: '角色', key: 'role', sortable: false },
        { label: '创建时间', key: 'created_at', sortable: true },
    ];

    // 数据状态
    let rows: User[] = []; // 保存从后端获取的当前页数据
    let totalItems = 0; // 数据总条数
    let token: string | null = null;

    // 分页相关
    let currentPage = 1; // 当前页
    let itemsPerPage = 5; // 每页显示的条数

    // 搜索相关
    let searchParams = [
        { key: 'username', label: '用户名' },
        { key: 'email', label: '邮箱' },
    ];

    // 获取 Cookie 中的 Token
    const getCookie = (name: string): string | null => {
        const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
        return match ? decodeURIComponent(match[2]) : null;
    };

    token = getCookie('auth_token');

    // 初始化数据
    const fetchData = async () => {
        try {
            // 调用本地 API 接口 /api/users，传递分页参数
            const response = await fetch(`/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({
                    page: currentPage,
                    limit: itemsPerPage,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch data from /api/users: ${response.status}`);
            }

            // 获取本地 API 返回的用户数据
            const data = await response.json();
            // 更新 rows 和 totalItems
            rows = data.users.map((item: User) => ({
                id: item.id,
                username: item.username,
                email: item.email,
                role: item.role,
                created_at: new Date(item.created_at).toLocaleString(), // 格式化日期
            }));
            totalItems = data.total; // 更新总条数
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // 处理分页
    const handlePageChange = (newPage: number) => {
        currentPage = newPage;
        fetchData(); // 重新获取数据
    };

    // 搜索逻辑
    const handleSearch = (event) => {
        const filters = event.detail;

        rows = rows.filter((row) =>
            Object.entries(filters).every(([key, value]) => value === '' || row[key]?.includes(value))
        );

        totalItems = rows.length;
        currentPage = 1; // 搜索后返回第一页
        fetchData(); // 重新获取数据
    };

    // 初始化数据
    fetchData();
</script>

<Layout>
    <div>
        <!-- 搜索组件 -->
        <FormSearch {searchParams} on:search={handleSearch} />

        <!-- 表格组件 -->
        <FormTable {columns} {rows} />

        <!-- 分页控件 -->
        <div class="pagination-container flex justify-between items-center mt-4">
            <!-- 左侧每页显示条数选择 -->
            <div class="flex items-center">
                <label for="itemsPerPage" class="mr-2 text-lightText dark:text-darkText">每页显示</label>
                <select id="itemsPerPage" bind:value={itemsPerPage} on:change={() => handlePageChange(1)} class="p-2 border border-borderLight dark:border-borderDark rounded">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
                <span class="ml-2 text-lightText dark:text-darkText">条</span>
            </div>

            <!-- 右侧翻页按钮 -->
            <div class="pagination-buttons flex items-center">
                <button
                        class="btn-pagination"
                        on:click={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                >
                    上一页
                </button>
                <span class="mx-4 text-lightText dark:text-darkText">第 {currentPage} 页</span>
                <button
                        class="btn-pagination"
                        on:click={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}
                >
                    下一页
                </button>
            </div>
        </div>
    </div>
</Layout>

<style>
    .pagination-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .btn-pagination {
        background-color: #3b82f6;
        color: #fff;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .btn-pagination:disabled {
        background-color: #d1d5db;
        cursor: not-allowed;
    }

    .btn-pagination:hover:not(:disabled) {
        background-color: #2563eb;
    }

    select {
        padding: 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        background: #fff;
        color: #000;
    }

    select:focus {
        outline: none;
        border-color: #3b82f6;
    }
</style>

