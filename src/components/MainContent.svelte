<!-- src/components/MainContent.svelte -->
<script>
    // 这里可以添加页面逻辑或动态数据
</script>

<main class="p-6 flex-1 bg-gray-100 dark:bg-gray-800 transition duration-300">
    <!-- 标题 -->
    <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100 transition duration-300">
        Welcome to the Admin Panel
    </h2>
    <p class="text-gray-700 dark:text-gray-300 transition duration-300">
        This is the main content area. You can add charts, tables, or other components here.
    </p>

    <!-- 示例表格 -->
    <div class="mt-6 overflow-x-auto">
        <table class="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <!-- 表头 -->
            <thead class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
            <tr>
                <th class="p-3 text-left">User</th>
                <th class="p-3 text-left">Email</th>
                <th class="p-3 text-left">Role</th>
                <th class="p-3 text-left">Status</th>
                <th class="p-3 text-left">Action</th>
            </tr>
            </thead>

            <!-- 表格内容 -->
            <tbody>
            <tr class="hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300">
                <td class="p-3 text-gray-800 dark:text-gray-300">John Doe</td>
                <td class="p-3 text-gray-800 dark:text-gray-300">john@example.com</td>
                <td class="p-3 text-gray-800 dark:text-gray-300">Admin</td>
                <td class="p-3 text-gray-800 dark:text-gray-300">Active</td>
                <td class="p-3">
                    <button
                            class="btn btn-warning btn-sm bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 transition duration-300">
                        Edit
                    </button>
                    <button
                            class="btn btn-error btn-sm bg-red-500 text-white hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500 transition duration-300">
                        Delete
                    </button>
                </td>
            </tr>
            <!-- 其他行 -->
            <tr class="hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300">
                <td class="p-3 text-gray-800 dark:text-gray-300">Jane Smith</td>
                <td class="p-3 text-gray-800 dark:text-gray-300">jane@example.com</td>
                <td class="p-3 text-gray-800 dark:text-gray-300">Editor</td>
                <td class="p-3 text-gray-800 dark:text-gray-300">Pending</td>
                <td class="p-3">
                    <button
                            class="btn btn-warning btn-sm bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 transition duration-300">
                        Edit
                    </button>
                    <button
                            class="btn btn-error btn-sm bg-red-500 text-white hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500 transition duration-300">
                        Delete
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</main>
