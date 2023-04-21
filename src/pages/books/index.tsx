import debounce from 'lodash.debounce'
import React, { SetStateAction, useMemo, useState } from 'react'
import Search from '~/components/Search'
import { api } from '~/utils/api'

type Props = {}

const Books = (props: Props) => {
    const MILLIS_DEBOUNCE = 600
    const [search, setSearch] = useState('')
    const { data: books, refetch } = api.books.search.useQuery({
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
            {books?.map(b => <p>{b.id}</p>)}
            <div>Books</div>
        </>
    )
}

export default Books