import { Link, Head } from '@inertiajs/react';
import ProjectsDatatable from './Partials/ProjectsDatatable';
import ProjectCreateForm from './Partials/ProjectCreateForm';
import ContactCreateForm from './Partials/ContactCreateForm';

export default function Index({ projects, contacts }) {
    return (
        <>
            <Head title="Projects" />
            <ProjectsDatatable projects={projects}/>
            <ProjectCreateForm contacts={contacts}/>
            <ContactCreateForm />
        </>
    );
}
