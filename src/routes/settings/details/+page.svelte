<script lang="ts">
    import { onMount,tick } from 'svelte';
    import Layout from "../../../layouts/Layout.svelte";
    import FormTable from "../../../components/Table/FormTable.svelte";
    import FormSearch from "../../../components/Table/FormSearch.svelte";
    import type { User } from "../../../types";

    // 表格列定义
    let columns = [
        { label: '用户ID', key: 'id', sortable: true },
        { label: '用户名', key: 'username', sortable: true },
        { label: '邮箱', key: 'email', sortable: true },
        { label: '角色', key: 'role', sortable: false },
        { label: '创建时间', key: 'created_at', sortable: true },
    ];
    let showToast = false;
    let toastMessage = "";
    // 数据状态
    let rows: User[] = []; // 保存从后端获取的当前页数据
    let totalItems = 0; // 数据总条数

    // 分页相关
    let currentPage = 1; // 当前页
    let itemsPerPage = 5; // 每页显示的条数
    let totalPages = 1; // 总页数

    // 搜索参数
    let searchParams = [
        { key: 'username', label: '用户名' },
        { key: 'email', label: '邮箱' },
    ];
    let searchQuery = {}; // 存储搜索参数
    let showEditModal = false; // 是否显示编辑框
    let editUser = { id: null, username: '', email: '', role: 'user' }; // 当前编辑的用户
    let showAddModal = false; // 控制模态框显示
    let newUser = { username: '', email: '', password : '123456',role: 'user' };
    // 获取 Cookie 中的 Token
    const getCookie = (name: string): string | null => {
        const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
        return match ? decodeURIComponent(match[2]) : null;
    };
    const showSuccessToast = (message: string) => {
        toastMessage = message;
        showToast = true;
        setTimeout(() => showToast = false, 3000); // 3秒后自动消失
    };
    // 获取用户数据
    const fetchData = async () => {
        try {
            const token = getCookie('auth_token');

            if (!token) {
                console.error("Missing auth token");
                return;
            }

            const requestBody = {
                page: Number(currentPage),
                limit: Number(itemsPerPage),
                filters: searchQuery // ✅ 传递搜索参数
            };

            console.log("📡 发送请求参数:", requestBody);

            const response = await fetch(`/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch data from /api/users: ${response.status}`);
            }

            const data = await response.json();
            console.log("✅ 后端返回数据:", data);

            rows = data.users.map((item: User) => ({
                id: item.id,
                username: item.username,
                email: item.email,
                role: item.role,
                created_at: new Date(item.created_at).toLocaleString(),
            }));

            totalItems = data.total ?? 0;
            totalPages = Math.ceil(totalItems / itemsPerPage);
        } catch (error) {
            console.error("❌ Error fetching user data:", error);
        }
    };


    // 处理分页
    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return; // 防止超出范围
        currentPage = newPage;
        fetchData();
    };

    // 处理搜索
    const handleSearch = (event) => {
        searchQuery = event.detail.filters;
        currentPage = 1; // 重新搜索时回到第一页
        fetchData();
    };
    // 处理单行删除
    const handleDelete = async (event) => {
        const { id,username } = event.detail;
        try {
            const token = getCookie("auth_token"); // 获取 Token
            if (!token) {
                console.error("Unauthorized: Missing token");
                return;
            }

            const response = await fetch('/api/users/delete', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
                body: JSON.stringify({ id }) // 传递要删除的用户 ID
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to delete user:", errorData);
                return;
            }

            showSuccessToast(`用户已删除: ${username}`);
            // 成功删除后，前端移除该行
            rows = rows.filter(row => row.id !== id);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleAddUser = async () => {
        showAddModal = true; // 显示模态框
        await tick(); // 确保 Svelte 更新 DOM
        console.log("showAddModal:", showAddModal);
    };

    // 关闭模态框
    const closeAddUserModal = () => {
        showAddModal = false;
        newUser = { username: '', email: '',password:'123456', role: 'user' };
    };
    const closeEditModal = () => {
        showEditModal = false;
    };
    // 提交新用户
    const submitNewUser = async () => {
        try {
            const token = getCookie('auth_token');

            if (!token) {
                console.error("Missing auth token");
                return;
            }
            const response = await fetch('/api/users/add', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to add user:", errorData);
                return;
            }

            showSuccessToast(`新增用户: ${newUser.username}`);
            // 关闭模态框
            closeAddUserModal();

            // 重新获取用户数据
            fetchData();
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };
    // 处理批量删除
    const handleBulkDelete = async (event) => {
        const { ids } = event.detail;
        await fetch(`/api/users/bulk-delete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids }),
        });
        rows = rows.filter(row => !ids.includes(row.id));
    };
    const updateUser = async () => {
        try {
            const token = getCookie('auth_token');

            if (!token) {
                console.error("Missing auth token");
                return;
            }
            const response = await fetch("/api/users/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(editUser)
            });

            const data = await response.json();

            if (response.ok) {
                showSuccessToast(`更新用户成功: ${editUser.username}`);
                closeEditModal();
            } else {
                alert("更新失败：" + data.details);
            }
        } catch (error) {
            console.error("更新用户时出错：", error);
        }
    };
    // 处理编辑
    const handleEdit = async (event) => {
        const { id, username, email, role } = event.detail;

        console.log("收到编辑请求:", event.detail);

        editUser = { id, username, email, role };
        showEditModal = true;
        await tick(); // 确保 Svelte 重新渲染
    };
    // 监听 itemsPerPage 变化，重新加载数据
    $: fetchData();

    // 组件挂载后加载数据
    onMount(() => {
        fetchData;
        console.log("itemsPerPage 初始化:", itemsPerPage);
    });


</script>

<Layout>
    <div>
        <!-- 搜索组件 -->
        <FormSearch {searchParams} on:search={handleSearch} />

        <!-- 表格组件 -->
        <FormTable {columns} {rows}
                   on:delete={handleDelete}
                   on:bulkDelete={handleBulkDelete}
                   on:edit={handleEdit}
                   on:addUser={handleAddUser}
        />
        {#if showToast}
            <div class="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
                {toastMessage}
            </div>
        {/if}
        {#if showAddModal}
            <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">添加用户</h2>

                    <div class="mt-4">
                        <label class="block text-gray-700 dark:text-gray-300">用户名</label>
                        <input type="text" bind:value={newUser.username} class="w-full p-2 border border-gray-300 rounded mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="输入用户名" />
                    </div>
                    <div class="mt-4">
                        <label class="block text-gray-700 dark:text-gray-300">密码</label>
                        <input type="password" bind:value={newUser.password} class="w-full p-2 border border-gray-300 rounded mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="输入用户名" />
                    </div>

                    <div class="mt-4">
                        <label class="block text-gray-700 dark:text-gray-300">邮箱</label>
                        <input type="email" bind:value={newUser.email} class="w-full p-2 border border-gray-300 rounded mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="输入邮箱" />
                    </div>

                    <div class="mt-4">
                        <label class="block text-gray-700 dark:text-gray-300">角色</label>
                        <select bind:value={newUser.role} class="w-full p-2 border border-gray-300 rounded mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="user">用户</option>
                            <option value="admin">管理员</option>
                        </select>
                    </div>

                    <div class="mt-6 flex justify-end gap-2">
                        <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" on:click={closeAddUserModal}>取消</button>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" on:click={submitNewUser}>提交</button>
                    </div>
                </div>
            </div>
        {/if}
        {#if showEditModal}
            <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">编辑用户信息</h2>

                    <div class="mt-4">
                        <label class="block text-gray-700 dark:text-gray-300">用户名</label>
                        <input type="text" bind:value={editUser.username} class="w-full p-2 border border-gray-300 rounded mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>

                    <div class="mt-4">
                        <label class="block text-gray-700 dark:text-gray-300">邮箱</label>
                        <input type="email" bind:value={editUser.email} class="w-full p-2 border border-gray-300 rounded mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>

                    <div class="mt-4">
                        <label class="block text-gray-700 dark:text-gray-300">角色</label>
                        <select bind:value={editUser.role} class="w-full p-2 border border-gray-300 rounded mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <option value="user">用户</option>
                            <option value="admin">管理员</option>
                        </select>
                    </div>

                    <div class="mt-6 flex justify-end gap-2">
                        <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" on:click={closeEditModal}>取消</button>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" on:click={updateUser}>提交</button>
                    </div>
                </div>
            </div>
        {/if}
        <!-- 分页控件 -->
        <div class="pagination-container flex justify-between items-center mt-4">
            <!-- 左侧每页显示条数选择 -->
            <div class="flex items-center">
                <label for="itemsPerPage" class="mr-2 text-lightText dark:text-darkText">每页显示</label>
                <select id="itemsPerPage" bind:value={itemsPerPage} on:change={() => handlePageChange(1)} class="p-2 border border-borderLight dark:border-borderDark rounded">
                    <option value={5}>5</option>
                    <option value={10}>10</option> <!-- ✅ 确保这里的 value 不是字符串 -->
                    <option value={20}>20</option>
                    <option value={50}>50</option>
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
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fade-in 0.3s ease-in-out;
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

