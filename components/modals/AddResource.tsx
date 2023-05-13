import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import Modal from '../Modal'
import { PrimaryButton } from '../globals/Buttons'
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query'
import { useConfigService } from '@/lib/clientApiServices/config'
import { ROOT_CONFIGS_IDS } from '@/lib/shared/enums'
import { useResourceService } from '@/lib/clientApiServices/resources'
import { getFormData } from '@/lib/shared/helpers'
import { useSession } from 'next-auth/react'
import { useTagServices } from '@/lib/clientApiServices/tags'
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { AxiosError, AxiosResponse } from 'axios'
import { IResourceSchema } from '@/lib/interfaces/mongo'

interface Props {
    open: boolean
    setOpen: React.Dispatch<SetStateAction<boolean>>
}

interface INewResource {
    title: string
    description: string
    tags: Array<string>
    url: string
    typeId: string
}
const AddResourceModal = (props: Props) => {
    const { open, setOpen } = props
    const [studyResourceTypes, setStudyResourceTypes] = useState<any[]>([])
    const [tagsForNewResource, setTagsForNewResource] = useState<any[]>([])
    const [studyResourceForNewResource, setStudyResourceForNewResource] = useState<any>()
    const [allTags, setAllTags] = useState<any[]>([])
    const descriptionRef = useRef<any>()
    const urlRef = useRef<any>()
    const titleRef = useRef<any>()
    const configService = useConfigService()
    const resourceServices = useResourceService()
    const tagServices = useTagServices()
    const queryClient = useQueryClient()
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
        onSuccess: (data) => {
            setTagsForNewResource([])
            descriptionRef.current.value = null
            urlRef.current.value = null
            titleRef.current.value = null
            setStudyResourceForNewResource(null)
            queryClient.invalidateQueries("getYoutubeResource")
            queryClient.invalidateQueries("getArticleResources")
            setOpen(false)

        }
    })

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const resourceObj: INewResource = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            tags: tagsForNewResource.map((resource: any) => resource.name),
            url: urlRef.current.value,
            typeId: studyResourceForNewResource.id

        }
        addResource({ data: resourceObj })
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
                        placeholder="Select resource type"
                        name="typeId"
                        onChange={(newValue) => setStudyResourceForNewResource(newValue)}
                    />
                    <input
                        className="flex h-10 w-full mt-3 rounded-md border border-gray-300 bg-transparent py-2 px-3  placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="text"
                        ref={titleRef}
                        placeholder="Enter heading..." name='title' />
                    <Select
                        isMulti={true}
                        name="tags"
                        closeMenuOnSelect={false}
                        className="basic-multi-select mt-3 placeholder:text-gray-400"
                        components={animatedComponents}
                        placeholder="Select tags"
                        onChange={(selectedOptions: any) => {
                            setTagsForNewResource(selectedOptions)
                        }}
                        options={allTags}
                        getOptionLabel={(option: any) => option.name}
                        value={tagsForNewResource}
                        getOptionValue={(option) => option.name}

                    />
                    <textarea
                        className="flex min-h-20 w-full mt-3  rounded-md border border-gray-300 bg-transparent py-2 px-3  placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        placeholder="Enter description..." name='description' ref={descriptionRef} />
                    <input
                        className="flex h-10 w-full mt-3 rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="url"
                        ref={urlRef}
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