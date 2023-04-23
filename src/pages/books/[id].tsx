import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Book from "~/components/Book";
import { api } from "~/utils/api";


const BookPage: NextPage<{ uuid: string }> = ({ uuid }) => {
    const { data: book, isLoading, refetch } = api.books.getById.useQuery({
        id: uuid
    })

    if (isLoading || !book) {
        return <>Loading...</>
    }

    return (
        <Book edit book={book} reviews={book.reviews} refetchReviews={refetch} />
    )
}

export default BookPage

export const getStaticProps: GetStaticProps = async (context) => {
    const uuid = context.params?.id;
    if (typeof uuid !== "string") throw new Error("no id");
    return {
        props: {
            uuid,
        },
    };
};


export const getStaticPaths: GetStaticPaths = async () => {
    return { paths: [], fallback: "blocking" };
};