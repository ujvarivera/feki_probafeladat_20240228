import { Head, Link } from '@inertiajs/react';
import ProjectEditForm from './Partials/ProjectEditForm';

export default function Edit({ project, contacts, contactIdsOfProject }) {
    return (
        <>
            <Head title="Edit Project" />
            <div className="m-8">
                <Link href={route('projects.index')}>Vissza</Link>
                <h2 className='text-2xl'>{ project.name }</h2>
                <ProjectEditForm project={project} contactIdsOfProject={contactIdsOfProject} contacts={contacts}/>
            </div>
        </>
    );
}
