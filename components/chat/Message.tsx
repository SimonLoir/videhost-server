export default function Message({
    author,
    message,
}: {
    author: string;
    message: string;
}) {
    return (
        <div>
            {author}: {message}
        </div>
    );
}
