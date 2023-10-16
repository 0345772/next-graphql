import { GetPostDocument } from "@/generates/gql/graphql"
import { client } from "@/lib/requestClient"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image'

async function getPost(id: string) {
  const { post } = await client.request(GetPostDocument, { id })
  return post
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const post = await getPost(id)
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post?.title}</CardTitle>
        <CardDescription>By {post?.author?.node.name}  от{' '} {post?.date && new Date(post.date).toLocaleDateString("ru-Ru") || 'Data no found'}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-96">
          {post?.featuredImage?.node.sourceUrl && <Image
            src={post.featuredImage?.node.sourceUrl}
            alt={post.featuredImage?.node.altText || 'Image description'}
            fill
            style={{ objectFit: 'cover' }}
          />}
        </div>

        <div dangerouslySetInnerHTML={{ __html: post?.content ? post?.content : '' }} className='mt-4'></div>
      </CardContent>
      <CardFooter className="mt-4">
        <p>====+++=====card footer========+++++++++=============</p>
      </CardFooter>
    </Card >
  )
}