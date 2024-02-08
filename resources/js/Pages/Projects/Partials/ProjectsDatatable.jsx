import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { FilterMatchMode } from 'primereact/api';

export default function ProjectsDatatable({ projects }) {

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    const statuses = useState(['fejlesztésre vár', 'folyamatban', 'kész']);

    return (
        <DataTable value={projects} sortField="created_at" sortOrder={-1}
            removableSort showGridlines paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: '50rem' }}
            dataKey="id" filters={filters} filterDisplay="row">
            <Column field="name" sortable header="Név"></Column>
            <Column field="status" sortable header="Státusz" filter filterField="status"></Column>
            <Column field="contacts_count" sortable header="Kapcsolattartók száma"></Column>
        </DataTable>
    )
}