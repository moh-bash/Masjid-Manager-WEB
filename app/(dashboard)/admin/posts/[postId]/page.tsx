

interface EditPagePostParams {
    params: Promise<{
        postId: string;
    }>;
}

export default async function editPagePost({
    params
}: EditPagePostParams) {
    const { postId } = await params;

    return (
        <div>page {postId}</div>
    )
}
