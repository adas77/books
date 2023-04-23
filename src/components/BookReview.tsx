import type { BookReview } from '@prisma/client';
import Image from 'next/image';
import { fetchImage } from '~/utils/image';

type Props = {
    rev: BookReview
}

const BookReview = ({ rev }: Props) => {
    return (
        <>
            <br />
            <p>{rev.text}</p>
            {rev.imgs.map(i => <Image key={i} width={640} height={320} src={fetchImage(i || '')} alt={i} />)}
            <br />
        </>

    )
}

export default BookReview