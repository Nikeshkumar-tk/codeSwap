import React, { SetStateAction, useState } from 'react'
import Modal from '../Modal'
import { PrimaryButton } from '../globals/Buttons'
import { useMutation, useQuery } from 'react-query'
import { useConfigService } from '@/lib/clientApiServices/config'
import { ROOT_CONFIGS_IDS } from '@/lib/shared/enums'
import { useResourceService } from '@/lib/clientApiServices/resources'
import { getFormData } from '@/lib/shared/helpers'
import { useSession } from 'next-auth/react'
interface Props {
    open: boolean
    setOpen: React.Dispatch<SetStateAction<boolean>>
}
const AddResourceModal = (props: Props) => {
    const { open, setOpen } = props
    const [studyResourceTypes, setStudyResourceTypes] = useState<any[]>([])
    const configService = useConfigService()
    const resourceServices = useResourceService()
    const {data} = useSession()
    useQuery({
        queryKey: ["study_resource_type"],
        queryFn: async () => {
            return await configService.getConfig({ rootId: ROOT_CONFIGS_IDS.STUDY_RESOURCE_TYPE })
        },
        onSuccess: (response) => {
            setStudyResourceTypes(response.data[0].children)
            console.log(response.data)
        },
        onError: (error) => console.log(error)
    })

    const { mutate: addResource, isLoading: addingResource } = useMutation({
        mutationKey: ["addResource"],
        mutationFn: resourceServices.addResource,
        onSuccess: (data) => console.log(data)
    })

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = getFormData(e)
        formData.userEmail = await data?.user?.email!
        console.log("Printing", formData)
    }
    return (
        <Modal open={open} setOpen={setOpen} heading='Add new resource'>
            <div className='w-80 mt-5'>
                <form onSubmit={handleSubmit}>

                    <select name="typeId" placeholder='Select type' className='h-10  w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900'>
                        {
                            studyResourceTypes?.map((type: any) => (
                                <option className='py-2 h-10' value={type.id} key={type.id}>{type.name}</option>
                            ))
                        }
                    </select>
                    <input
                        className="flex h-10 w-full mt-3 rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="text"
                        placeholder="Enter heading..." name='title' />
                    <textarea
                        className="flex min-h-20 w-full mt-3 rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        placeholder="Enter dscription..." name='description' />
                    <input
                        className="flex h-10 w-full mt-3 rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="url"
                        placeholder="Enter the url..." name="url" />
                    <div className='mt-3 flex justify-end'>
                        <PrimaryButton type='submit'>Submit</PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default AddResourceModal