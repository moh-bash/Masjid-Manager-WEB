



export default async function page({ params }: { params: { mosqueId: string } }) {
    const { mosqueId } = await params;
    return (
        <div>
            page : {mosqueId}
        </div>
    )
}
