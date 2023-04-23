import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Book, { CustomReviews } from "~/components/Book";
import { api } from "~/utils/api";


const BookPage: NextPage<{ uuid: string }> = ({ uuid }) => {
    const { data: book, isLoading, refetch } = api.books.getById.useQuery({ id: uuid })
    if (isLoading || !book) {
        return <>Loading...</>
    }

    const reviews: CustomReviews[] = book.reviews.map(r => ({ ...r, authorImg: r.User?.image || undefined, authorName: r.User?.name, authorEmail: r.User?.email }))
    return (
        <Book edit book={book} reviews={reviews} refetchReviews={refetch} />
    )
}

export default BookPage

export const getStaticProps: GetStaticProps = (context) => {
    const uuid = context.params?.id;
    if (typeof uuid !== "string") throw new Error("no id");
    return {
        props: {
            uuid,
        },
    };
};


export const getStaticPaths: GetStaticPaths = () => {
    return { paths: [], fallback: "blocking" };
};