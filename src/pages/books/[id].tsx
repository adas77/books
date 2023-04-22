import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Book from "~/components/Book";
import { api } from "~/utils/api";


const BookPage: NextPage<{ uuid: string }> = ({ uuid }) => {

    const { data: book, isLoading } = api.books.getById.useQuery({
        id: uuid
    })

    if (isLoading || !book) {
        return <>Loading...</>
    }

    return (
        <Book book={book} />
    )
}

export default BookPage

export const getStaticProps: GetStaticProps = async (context) => {
    console.log('context:', context)
    // const ssg = generateSSGHelper();
    const uuid = context.params?.id;
    if (typeof uuid !== "string") throw new Error("no id");

    // await ssg.reviews.getOwn.prefetch();

    return {
        props: {
            // trpcState: ssg.dehydrate(),
            uuid,
        },
    };
};


export const getStaticPaths: GetStaticPaths = async () => {
    return { paths: [], fallback: "blocking" };
};