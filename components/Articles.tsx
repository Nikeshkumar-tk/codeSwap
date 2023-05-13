import { useResourceService } from '@/lib/clientApiServices/resources'
import { IResourceSchema } from '@/lib/interfaces/mongo'
import { STUDY_RESOURCE_TYPE } from '@/lib/shared/enums'
import { useState } from 'react'
import { useQuery } from 'react-query'
import ArticleCard from './ArticleCard'

const Articles = () => {
    const resourceServices = useResourceService()
    const [articles, setArticles] = useState<IResourceSchema[] | null>(null)
    useQuery({
        queryKey: ["getArticleResources"],
        queryFn: async () => {
            return await resourceServices.getResources({ typeId: STUDY_RESOURCE_TYPE.ARTICLE })
        },
        onSuccess: ({ data }) => setArticles(data)
    })
    return (
        <div>
            <div className='grid sm:grid-cols-4'>
                {
                    articles?.map((article: IResourceSchema) => (
                        <ArticleCard
                            key={article.title}
                            title={article.title}
                            description={article.description}
                            tags={article.tags}
                            url={article.url} />
                    ))
                }
            </div>
        </div>
    )
}

export default Articles