<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { goto } from '$app/navigation';
    import type { MenuItem, TabItem } from '../types';

    const dispatch = createEventDispatcher();

    let menuItems: MenuItem[] = [];
    let menuMap: Map<number, MenuItem> = new Map();
    let activeMenu: string | null = null;
    let token: string | null = null;

    const getCookie = (name: string): string | null => {
        const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
        return match ? decodeURIComponent(match[2]) : null;
    };

    token = getCookie('auth_token');
    let expandedMenus: Set<number> = new Set();

    // 初始化面包屑和标签页
    let breadcrumbs: string[] = [];
    let tabs: TabItem[] = [];

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

                menuItems = await response.json();
                menuMap = buildMenuMap(menuItems);
                console.log('Menu items received:', menuItems);

                // 根据当前路径初始化
                const currentPath = window.location.pathname;
                const currentMenu = findMenuByPath(menuItems, currentPath);

                if (currentMenu) {
                    breadcrumbs = buildBreadcrumbs(currentMenu);
                    tabs = [{ title: currentMenu.title, pathname: currentMenu.pathname }];
                    activeMenu = currentMenu.pathname;

                    dispatch('updateBreadcrumbsAndTabs', { breadcrumbs, tabs });
                }
            } catch (error) {
                console.error('Error in fetch request:', error);
            }
        } else {
            console.warn('No token found in cookies');
        }
    });

    // 查找路径对应的菜单项
    const findMenuByPath = (items: MenuItem[], path: string): MenuItem | undefined => {
        for (const item of items) {
            if (item.pathname === path) return item;
            if (item.children) {
                const found = findMenuByPath(item.children, path);
                if (found) return found;
            }
        }
        return undefined;
    };

    const buildMenuMap = (items: MenuItem[]): Map<number, MenuItem> => {
        const map = new Map<number, MenuItem>();

        const traverse = (nodes: MenuItem[]) => {
            nodes.forEach((node) => {
                map.set(node.id, node);
                if (node.children?.length) {
                    traverse(node.children);
                }
            });
        };

        traverse(items);
        return map;
    };

    // 构建面包屑数据
    const buildBreadcrumbs = (menu: MenuItem): string[] => {
        const crumbs: string[] = [];
        let current: MenuItem | undefined = menu;

        while (current) {
            crumbs.unshift(current.title);
            current = current.parent_id ? menuMap.get(current.parent_id) : undefined;
        }

        return ['主页', ...crumbs];
    };

    const handleMenuClick = (item: MenuItem) => {
        if (item.children && item.children.length > 0) {
            // 切换展开状态
            expandedMenus = new Set(expandedMenus);
            expandedMenus.has(item.id) ? expandedMenus.delete(item.id) : expandedMenus.add(item.id);
        } else {
            // 构建面包屑数据
            const newBreadcrumbs = buildBreadcrumbs(item);

            // 检查标签页是否已经存在
            const tabExists = tabs.some(tab => tab.pathname === item.pathname);
            if (!tabExists) {
                tabs = [...tabs, { title: item.title, pathname: item.pathname }];
            }

            // 触发事件，将数据传递给父组件
            dispatch('updateBreadcrumbsAndTabs', {
                breadcrumbs: newBreadcrumbs,
                tabs,
            });

            // 更新激活菜单
            activeMenu = item.pathname;

            // 跳转到目标路径
            goto(item.pathname);
        }
    };
</script>

<aside class="w-52 h-full bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText border-r border-borderLight dark:border-borderDark transition duration-300">
    <div class="p-4 text-2xl font-bold text-primary dark:text-accent">Admin Panel</div>
    <ul class="p-4 space-y-2">
        {#each menuItems as item}
            <li>
                <a
                        href={item.pathname}
                        class="block px-4 py-2 rounded-md hover:bg-primary hover:text-lightBackground dark:hover:bg-accent dark:hover:text-darkBackground transition duration-300"
                        class:font-bold={activeMenu === item.pathname}
                        on:click|preventDefault={() => handleMenuClick(item)}
                >
                    {#if item.icon}
                        <span class="mr-2">{item.icon}</span>
                    {/if}
                    {item.title}
                    {#if item.children && item.children.length > 0}
                        <span class="ml-auto text-sm">{expandedMenus.has(item.id) ? '▲' : '▼'}</span>
                    {/if}
                </a>

                {#if expandedMenus.has(item.id) && item.children?.length > 0}
                    <ul class="pl-4 border-l border-borderLight dark:border-borderDark ml-4 space-y-1">
                        {#each item.children as child}
                            <li>
                                <a
                                        href={child.pathname}
                                        class="block px-4 py-2 rounded-md hover:bg-primary hover:text-lightBackground dark:hover:bg-accent dark:hover:text-darkBackground transition duration-300"
                                        class:font-bold={activeMenu === child.pathname}
                                        on:click|preventDefault={() => handleMenuClick(child)}
                                >
                                    {#if child.icon}
                                        <span class="mr-2">{child.icon}</span>
                                    {/if}
                                    {child.title}
                                </a>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </li>
        {/each}
    </ul>
</aside>
