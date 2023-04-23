import { Book, type BookType, type BookReview as PrismaBookReviewType } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, type ButtonHTMLAttributes } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { toast } from 'react-toast';
import { BookTypesArray } from '~/types/book';
import { api } from '~/utils/api';
import { formatDate } from '~/utils/date';
import { fetchImage } from '~/utils/image';
import BookReview from './BookReview';
import BookReviewCreate from './BookReviewCreate';
import ImgUploader from './ImgUploader';

export type CustomReviews = PrismaBookReviewType & { authorImg: string | undefined, authorName: string | undefined | null, authorEmail: string | undefined };

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    book: Book;
    reviews?: CustomReviews[];
    edit?: boolean;
    refetchReviews?: () => void;
}

type EditBookType = {
    id: string;
    isbn?: string;
    bookType?: BookType;
    img?: string;
}

const Book = ({ book, reviews, edit, refetchReviews }: Props) => {
    const router = useRouter()
    const { register, handleSubmit } = useForm<EditBookType>()
    const { mutate: updateBookMutate } = api.books.update.useMutation({
        onError(error) {
            toast(`Error: ${error.message}`)
        },
        onSuccess() {
            router.reload()
        },
    })
    const [b64, setB64] = useState<string[]>([])
    const bookImg = fetchImage(book.img || '')

    const onSubmit: SubmitHandler<EditBookType> = (data): void => {
        if (edit) updateBookMutate({ ...data, id: book.id, img: b64 ? b64[0] : undefined })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link href={`/books/${book.id}`}>
                    <input disabled={!edit} {...register('isbn')} placeholder={book.isbn} defaultValue={book.isbn} className="mb-2 text-2xl bg-inherit font-bold  text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                    <select disabled={!edit} {...register('bookType')} defaultValue={book.type} className="mb-2 text-xl bg-inherit font-bold  text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {BookTypesArray.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <p className="mb-2 text-m bg-inherit text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{formatDate(book.updatedAt)}</p>
                    <p className="mb-2 text-m bg-inherit text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{formatDate(book.createdAt)}</p>
                </Link>

                {bookImg &&
                    <>
                        <Image width={640} height={320} src={bookImg} alt={book.id} />
                        {edit && <ImgUploader setB64={setB64} />}
                    </>
                }
                {edit && <button className="font-medium text-primary-600 hover:underline dark:text-primary-500">Update</button>}
            </form>

            {edit &&
                <>
                    <p className='mt-14 mb-12 text-bold text-7xl text-center text-slate-700'>Recenzje</p>
                    <div className='grid grid-cols-1 gap-4'>
                        {reviews?.map(r => <BookReview rev={r} />)}
                    </div>
                    <br />
                    <BookReviewCreate bookId={book.id} refetchReviews={refetchReviews}
                    />
                </>}
        </>
    )
}

export default Book