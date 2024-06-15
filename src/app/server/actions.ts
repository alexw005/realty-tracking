'use server'

export async function addSalesPersons(formData: FormData) {

    const name = formData.get('name') as string;
    console.log(name, formData);
}