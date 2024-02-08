import { Link, Head } from '@inertiajs/react';
import ProjectsDatatable from './Partials/ProjectsDatatable';
import ProjectCreateForm from './Partials/ProjectCreateForm';

export default function Index({ projects, contacts }) {
    return (
        <>
            <Head title="Projects" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen">
                <ProjectsDatatable projects={projects}/>
                <ProjectCreateForm contacts={contacts}/>
            </div>
        </>
    );
}
