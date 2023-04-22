import { Book, BookType } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ButtonHTMLAttributes, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ImageUploader from 'react-image-upload';
import 'react-image-upload/dist/index.css';
import { toast } from 'react-toast';
import { BookTypesArray } from '~/types/book';
import { api } from '~/utils/api';
import { formatDate } from '~/utils/date';
import { fetchImage, toBase64ImageUrl } from '~/utils/image';


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    book: Book;
    edit?: boolean;
}

type EditBookType = {
    id: string;
    isbn?: string;
    bookType?: BookType;
    img?: string;
}

const Book = ({ book, edit }: Props) => {
    const router = useRouter()
    const { register, handleSubmit } = useForm<EditBookType>()
    const { mutate: updateBookMutate, isError, isSuccess } = api.books.update.useMutation()
    const [b64, setB64] = useState<string>()
    const bookImg = fetchImage(book.img!)
    console.log(bookImg)

    const onSubmit: SubmitHandler<EditBookType> = (data) => {
        if (edit) updateBookMutate({ ...data, id: book.id, img: b64 })
    }

    return (
        <>
            {isError && toast('Error...')}
            {isSuccess && router.reload()}
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link href={`/books/${book.id}`}>
                    <input disabled={!edit} {...register('isbn')} placeholder={book.isbn} defaultValue={book.isbn} className="mb-2 text-2xl bg-inherit font-bold  text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                    <select {...register('bookType')} defaultValue={book.type} className="mb-2 text-xl bg-inherit font-bold  text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {BookTypesArray.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <p className="mb-2 text-m bg-inherit text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{formatDate(book.updatedAt)}</p>
                    <p className="mb-2 text-m bg-inherit text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{formatDate(book.createdAt)}</p>
                </Link>

                {bookImg &&
                    <>
                        <Image width={640} height={320} src={bookImg} alt={book.id} />
                        <ImageUploader
                            style={{ backgroundColor: 'transparent', }}
                            deleteIcon={<></>}
                            uploadIcon={<svg
                                className='svg-circleplus'
                                viewBox='0 0 100 100'
                                style={{ height: '40px', stroke: '#000' }}
                            >
                                <circle cx='50' cy='50' r='45' fill='none' strokeWidth='7.5'></circle>
                                <line x1='32.5' y1='50' x2='67.5' y2='50' strokeWidth='5'></line>
                                <line x1='50' y1='32.5' x2='50' y2='67.5' strokeWidth='5'></line>
                            </svg>}
                            onFileAdded={async (file) => {
                                const b64 = await toBase64ImageUrl(file.dataUrl);
                                setB64(b64)
                            }
                            }
                        />
                    </>
                }
                {edit && <button className="font-medium text-primary-600 hover:underline dark:text-primary-500">Update</button>}
            </form>

        </>

    )
}

export default Book