import { Book as PrismaBookType } from '@prisma/client'
import debounce from 'lodash.debounce'
import { SetStateAction, useEffect, useMemo, useState } from 'react'
import Book from '~/components/Book'
import Search from '~/components/Search'
import { api } from '~/utils/api'

type Props = {}

const Books = (props: Props) => {
    const MILLIS_DEBOUNCE = 600
    const [search, setSearch] = useState('')
    const { data: books, refetch } = api.books.search.useQuery({ search: search })

    const [sortState, setSortState] = useState({ sorted: 'isbn', reversed: false })
    const [sorted, setSorted] = useState<PrismaBookType[]>([])

    const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
        setSearch(event.target.value)
        refetch()
    };

    const sortByIsbn = () => {
        setSortState({ sorted: 'isbn', reversed: !sortState.reversed })
        const sortedCopy = [...sorted];
        sortedCopy?.sort((a, b) => {
            let a_ = a.isbn.toLowerCase();
            let b_ = b.isbn.toLowerCase();
            return sortState.reversed ? b_.localeCompare(a_) : a_.localeCompare(b_);
        });
        setSorted(sortedCopy);
    }

    const debouncedChangeHandler = useMemo(
        () => debounce(handleChange, MILLIS_DEBOUNCE)
        , []);


    useEffect(() => {
        if (books) {
            setSorted(books)
        }

    }, [books])

    return (
        <>

            <Search onChange={debouncedChangeHandler} label={'Search Books'} />
            {books && <button onClick={sortByIsbn}>Sort</button>}
            <div className='grid grid-cols-2 md:grid-cols-5 gap-1 mt-1' >
                {sorted?.map(b => <Book key={b.id} book={b} />)}
            </div>
        </>
    )
}

export default Books