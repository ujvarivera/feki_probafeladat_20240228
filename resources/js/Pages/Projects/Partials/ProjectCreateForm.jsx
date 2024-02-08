import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function ProjectCreateForm({ contacts }) {
    const { data, setData, post, processing, errors, reset, delete:destroy } = useForm({
        projectName: '',
        projectStatus: 1,
        description: '',
        projectContacts: [],
    });

    const addProject = (event) => {
        event.preventDefault();
        post(route('projects.store'));
        reset()
    }

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    return (
       <form onSubmit={addProject} className='mt-4'>
            <div className='my-4'>
                <InputLabel htmlFor="projectName" value={"Projekt neve*"} />

                <TextInput
                    id="projectName"
                    name="projectName"
                    value={data.projectName}
                    placeholder={"Projekt neve..."}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={handleOnChange}
                />
                <InputError message={errors.projectName} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="projectStatus" value="Státusz*" />
                <select 
                    name="projectStatus" 
                    id="projectStatus"
                    value={data.projectStatus}
                    onChange={(e) => setData('projectStatus', e.target.value)}
                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-purple-300 rounded-md focus:outline-none focus:border-purple-500"
                >
                    <option key={1} value="fejlesztésre vár" className='pl-6' selected>Fejlesztésre vár</option>
                    <option key={2} value="folyamatban" className='pl-6'>Folyamatban</option>
                    <option key={3} value="kész" className='pl-6'>Kész</option>
                </select>
                <InputError message={errors.projectStatus} className="mt-2" />
            </div>

            <div className='my-4'>
                <InputLabel htmlFor="description" value={"Projekt leírása*"} />

                <TextInput
                    id="description"
                    name="description"
                    value={data.description}
                    placeholder={"Projekt leírása..."}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={handleOnChange}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="projectContacts" value="Kapcsolattartó(k)*" />
            
                <select 
                    multiple
                    name="projectContacts" 
                    id="projectContacts"
                    value={data.projectContacts}
                    onChange={(e) => setData('projectContacts', [...e.target.selectedOptions].map(option => option.value))}
                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-purple-300 rounded-md focus:outline-none focus:border-purple-500"
                >
                { contacts && contacts.map((contact, index) => {
                    return (
                        <>
                            <option 
                                key={contact.id}
                                value={contact.id}
                                className='pl-6'
                            >
                                {contact.name}
                            </option>
                        </>
                    )
                    }) 
                }
                </select>
                <InputError message={errors.projectContacts} className="mt-2" />
            </div>

            <div className="flex items-center justify-end mt-8">
                <PrimaryButton className="ml-4" disabled={processing}>
                    Projekt mentése
                </PrimaryButton>
            </div>
        </form>
    )
}