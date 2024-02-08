import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function ContactCreateForm() {
    const { data: dataContact, setData: setDataContact, post: postContact, processing: processingContact , errors, reset} = useForm({
        contactName: '',
        contactEmail: '',
    });

    const addContact = (event) => {
        event.preventDefault();
        postContact(route('contacts.store'));
        reset()
    }

    const handleContactOnChange = (event) => {
        setDataContact(event.target.name, event.target.value);
    };

    return (
        <form onSubmit={addContact} className='m-8'>
            <div className='my-4'>
                <h2 className='text-2xl'>Új kapcsolattartó:</h2>
                <InputLabel htmlFor="contactName" value={"Kapcsolattartó neve*"} />
                <TextInput
                    id="contactName"
                    name="contactName"
                    value={dataContact.contactName}
                    placeholder={"Kapcsolattartó neve..."}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={handleContactOnChange}
                />
                <InputError message={errors.contactName} className="mt-2" />
            </div>

            <div className='my-4'>
                <InputLabel htmlFor="contactEmail" value={"Kapcsolattartó email címe*"} />
                <TextInput
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={dataContact.contactEmail}
                    placeholder={"Kapcsolattartó email címe..."}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={handleContactOnChange}
                />
                <InputError message={errors.contactEmail} className="mt-2" />
            </div>

            <div className="flex items-center justify-end mt-8">
                <PrimaryButton className="ml-4" disabled={processingContact}>
                    Kapcsolattartó mentése
                </PrimaryButton>
            </div>
        </form>
    )

}