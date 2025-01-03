<script>
    import Layout from "../../../layouts/Layout.svelte";
    import Table from "../../../components/Table/Table.svelte";

    const columns = [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email', sortable: false },
    ];

    const rows = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    ];

    const config = {
        isSelection: true,
        isSerialNo: true,
        isOperate: true,
        loading: false,
    };

    let currentPage = 1;
    let itemsPerPage = 5;
    let totalItems = rows.length;
</script>

<Layout>
    <Table {columns} {rows} {config} {currentPage} {itemsPerPage} {totalItems} />
</Layout>
