import { Book } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    book: Book;
}

const Book = ({ book }: Props) => {
    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link href={`/books/${book.id}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.id}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{book.type}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{book.createdAt.toUTCString()}</p>
                {/* <input className="mb-3 font-normal text-gray-700 dark:text-gray-400">{book.updatedAt.toUTCString()}</input> */}
                <input disabled={false} placeholder={book.createdAt.toUTCString()} className='mb-3 font-normal text-gray-700 dark:text-gray-400 bg-inherit'></input>
                {book.img && <Image width={640} height={320} src={book.img} alt={book.id} />}
            </Link>
        </div>
    )
}

export default Book