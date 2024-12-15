<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import type { MenuItem } from '../types';  // 确保你有定义 MenuItem 类型

    const dispatch = createEventDispatcher();

    let menuItems: MenuItem[] = [];
    let token: string | null = localStorage.getItem('auth_token');
    let activeMenu: string | null = 'dashboard';  // 默认选中 Dashboard 路由

    // 初始化面包屑和标签页
    let breadcrumbs: string[] = ['主页', '仪表盘'];  // 默认面包屑
    let tabs = [{ title: '仪表盘' }];  // 默认标签页

    // 发送事件给父组件更新标签页和面包屑
    const updateTabsAndBreadcrumbs = (item: MenuItem) => {
        breadcrumbs = ['主页', item.title];  // 更新面包屑
        tabs = [{ title: item.title }];  // 更新标签页
        activeMenu = item.pathname;  // 更新当前激活的菜单项

        // 触发父组件的事件，传递更新后的面包屑和标签数据
        dispatch('updateBreadcrumbsAndTabs', { breadcrumbs, tabs });

        console.log('Updated breadcrumbs:', breadcrumbs);
        console.log('Updated tabs:', tabs);
    };

    onMount(async () => {
        if (token) {
            try {
                const response = await fetch('/api/menu', {
                    method: 'POST',
                    headers: {
                        Authorization: token,
                    },
                });

                if (!response.ok) {
                    console.error('Error fetching menu items:', response.status);
                    return;
                }

                menuItems = await response.json();  // 假设返回的数据结构是 MenuItem[]
                console.log('Menu items received:', menuItems);  // 打印菜单项数据
            } catch (error) {
                console.error('Error in fetch request:', error);
            }
        } else {
            console.warn('No token found in localStorage');
        }
    });

    // 处理菜单点击事件
    const handleMenuClick = (item: MenuItem) => {
        updateTabsAndBreadcrumbs(item);
    };

</script>

<aside class="w-52 h-full bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText border-r border-borderLight dark:border-borderDark transition duration-300">
    <div class="p-4 text-2xl font-bold text-primary dark:text-accent">Admin Panel</div>
    <ul class="p-4 space-y-2">
        {#each menuItems as item}
            {#if item.type === 'item'}
                <li>
                    <a href="{item.pathname}"
                       class="block px-4 py-2 rounded-md hover:bg-primary hover:text-lightBackground dark:hover:bg-accent dark:hover:text-darkBackground transition duration-300"
                       class:font-bold={activeMenu === item.pathname}
                       on:click={() => handleMenuClick(item)}
                    >
                        {#if item.icon}
                            <span class="mr-2">{item.icon}</span>
                        {/if}
                        {item.title}
                    </a>
                </li>
            {/if}
        {/each}
    </ul>
</aside>
