import type { BookReview } from '@prisma/client';
import Image from 'next/image';
import { fetchImage } from '~/utils/image';
import { CustomReviews } from './Book';

type Props = {
    rev: CustomReviews
}

const BookReview = ({ rev }: Props) => {
    return (
        <>
            <figure className="max-w-screen-md mx-auto text-center bg-gray-200 dark:bg-gray-800 p-1 rounded-lg">
                <svg aria-hidden="true" className="w-12 h-12 mx-auto mb-3 mt-2 text-gray-400  dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" /></svg>
                <blockquote>
                    <p className="text-2xl italic font-medium text-gray-900 dark:text-white">{rev.text}</p>
                </blockquote>
                <div className="grid grid-cols-2 items-center justify-center md:grid-cols-2 gap-2 mt-2 mb-2 ">
                    {rev.imgs.map(i => <Image className='rounded-lg' width={300} height={300} src={fetchImage(i || '')} alt={i || 'none'} />)}
                </div>
                <figcaption className="flex items-center justify-center mt-6 space-x-3 mb-2">
                    {rev.authorImg && <Image className='rounded-full' width={64} height={32} src={fetchImage(rev.authorImg)} alt={rev.authorImg} />}
                    <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                        <cite className="pr-3 font-medium text-gray-900 dark:text-white">{rev.authorName}</cite>
                        <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">{rev.authorEmail}</cite>
                    </div>
                </figcaption>
            </figure>
        </>

    )
}

export default BookReview