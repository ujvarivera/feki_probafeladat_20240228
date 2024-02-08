import { Link, Head } from '@inertiajs/react';
import ProjectsDatatable from './Partials/ProjectsDatatable';

export default function Index({ projects }) {
    return (
        <>
            <Head title="Projects" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen">
                <ProjectsDatatable projects={projects}/>
            </div>
        </>
    );
}
