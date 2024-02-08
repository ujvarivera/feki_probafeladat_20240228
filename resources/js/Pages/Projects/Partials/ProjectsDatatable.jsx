import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
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

    const { delete:destroy } = useForm({});

    const deleteProject = (e, project) => {
        e.preventDefault();
        destroy(route('projects.destroy', project));
    };

    const editTemplate = (rowData) => {
        return <Link href={route('projects.edit', rowData)}>Szerkesztés</Link>
    };

    const deleteTemplate = (rowData) => {
        return <form onSubmit={(event) => deleteProject(event, rowData)}><button>Törlés</button></form>
    };

    return (
        <div className="m-8">
            <h2 className='text-2xl'>Projektek:</h2>
            <DataTable value={projects} sortField="created_at" sortOrder={-1}
                removableSort showGridlines paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
                dataKey="id" filters={filters} filterDisplay="row">
                <Column field="name" sortable header="Név"></Column>
                <Column field="status" sortable header="Státusz" filter filterField="status"></Column>
                <Column field="contacts_count" sortable header="Kapcsolattartók száma"></Column>
                <Column header="" body={editTemplate}></Column>
                <Column header="" body={deleteTemplate}></Column>
            </DataTable>
        </div>
    )
}