import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import Modal from '../Modal'
import { PrimaryButton } from '../globals/Buttons'
import { useMutation, useQueries, useQuery } from 'react-query'
import { useConfigService } from '@/lib/clientApiServices/config'
import { ROOT_CONFIGS_IDS } from '@/lib/shared/enums'
import { useResourceService } from '@/lib/clientApiServices/resources'
import { getFormData } from '@/lib/shared/helpers'
import { useSession } from 'next-auth/react'
import { useTagServices } from '@/lib/clientApiServices/tags'
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { AxiosError, AxiosResponse } from 'axios'

interface Props {
    open: boolean
    setOpen: React.Dispatch<SetStateAction<boolean>>
}
const AddResourceModal = (props: Props) => {
    const { open, setOpen } = props
    const [studyResourceTypes, setStudyResourceTypes] = useState<any[]>([])
    const [tagsForNewResource, setTagsForNewResource] = useState<any[]>([])
    const [studyResourceForNewResource, setStudyResourceForNewResource] = useState<any>()
    const [allTags, setAllTags] = useState<any[]>([])
    const configService = useConfigService()
    const resourceServices = useResourceService()
    const tagServices = useTagServices()
    const { data } = useSession()
    const animatedComponents = makeAnimated();
    const [] = useQueries([{
        queryKey: ["study_resource_type"],
        queryFn: async () => {
            return await configService.getConfig({ rootId: ROOT_CONFIGS_IDS.STUDY_RESOURCE_TYPE })
        },
        onSuccess: (response: AxiosResponse) => {
            setStudyResourceTypes(response.data[0].children)
            console.log(response.data)
        },
        onError: (error: any) => console.log(error)
    },
    {
        queryKey: ["systemTags"],
        queryFn: tagServices.getTags,
        onSuccess: (response: AxiosResponse) => setAllTags(response.data)
    }])

    const { mutate: addResource, isLoading: addingResource } = useMutation({
        mutationKey: ["addResource"],
        mutationFn: resourceServices.addResource,
        onSuccess: (data) => console.log(data)
    })

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = getFormData(e)
        const resourceObj = JSON.parse(JSON.stringify(formData))
        resourceObj.userEmail = await data?.user?.email!
        resourceObj.tags = tagsForNewResource.map((tag:any) => tag.name)
        console.log(resourceObj)
        // addResource({ data: formData })
    }

    console.log("Tags for new resource", tagsForNewResource)
    return (
        <Modal open={open} setOpen={setOpen} heading='Add new resource'>
            <div className='w-80 mt-5'>
                <form onSubmit={handleSubmit}>
                    <Select 
                    options={studyResourceTypes}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    className='basic-single'
                    value={studyResourceForNewResource}
                    classNamePrefix="select"
                    name="typeId"
                    onChange={(newValue) => setStudyResourceForNewResource(newValue)}
                    />
                    <input
                        className="flex h-10 w-full mt-3 rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="text"
                        placeholder="Enter heading..." name='title' />
                    <Select
                        isMulti={true}
                        name="tags"
                        closeMenuOnSelect={false}
                        className="basic-multi-select mt-3"
                        components={animatedComponents}
                        onChange={(selectedOptions: any) => {
                            setTagsForNewResource(selectedOptions)}}
                        options={allTags}
                        getOptionLabel={(option:any) => option.name}
                        value={tagsForNewResource}
                        getOptionValue={(option) => option.name}

                    />
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