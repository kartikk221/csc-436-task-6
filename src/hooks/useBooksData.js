import { useMemo, useState, useEffect } from 'react';

export function useBooksData(url) {
    const [id, setId] = useState(0); // This will be used to re-fetch data when needed
    const [data, setData] = useState(null);
    const refresh = useMemo(() => () => setId((id) => id + 1), []);

    // Begin fetching data if url changes
    useEffect(() => {
        fetch(url) // Fetch data from url
            .then((response) => response.json()) // Parse response as JSON
            .then((data) => setData(data)) // Set books to data
            .catch((error) => setData(error)); // Set error to error
    }, [id]);

    // Return data and refresh function
    return [data, refresh];
}
