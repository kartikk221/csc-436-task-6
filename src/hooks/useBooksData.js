import { useMemo, useState, useEffect } from 'react';

let cache = null;

export function useBooksData(url = 'https://api.matgargano.com/api/books') {
    const [id, setId] = useState(0); // This will be used to re-fetch data when needed
    const [data, setData] = useState(cache);
    const refresh = useMemo(
        () => () => {
            cache = null;
            setId((id) => id + 1);
        },
        []
    );

    // Begin fetching data if url changes
    useEffect(() => {
        // If there is no data, we must fetch it
        if (!data)
            fetch(url) // Fetch data from url
                .then((response) => response.json()) // Parse response as JSON
                .then((data) => {
                    cache = data;
                    setData(data);
                }) // Set books to data
                .catch((error) => setData(error)); // Set error to error
    }, [id]);

    // Return data and refresh function
    return [data, refresh];
}
