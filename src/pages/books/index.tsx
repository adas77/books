import debounce from 'lodash.debounce'
import { SetStateAction, useMemo, useState } from 'react'
import Book from '~/components/Book'
import Search from '~/components/Search'
import { api } from '~/utils/api'

type Props = {}

const Books = (props: Props) => {
    const MILLIS_DEBOUNCE = 600
    const [search, setSearch] = useState('')
    const { data: books, refetch } = api.books.search.useQuery(

        {
            search: search
        })

    const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
        setSearch(event.target.value)
        refetch()
    };

    const debouncedChangeHandler = useMemo(
        () => debounce(handleChange, MILLIS_DEBOUNCE)
        , []);
    return (
        <>
            <Search onChange={debouncedChangeHandler} label={'Search Books'} />
            <div className='grid grid-cols-2 md:grid-cols-5 gap-1 mt-1' >
                {books?.map(b => <Book key={b.id} book={b} />)}
            </div>
        </>
    )
}

export default Books