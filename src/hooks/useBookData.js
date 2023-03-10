import { useState, useEffect } from 'react';

const cache = new Map();

export function useBookData(source, base = 'https://api.matgargano.com/api/books') {
    const [id, setId] = useState(source);
    const [data, setData] = useState(cache.get(source) || null);

    // Begin fetching data if url changes
    useEffect(() => {
        // If there is no data, we must fetch it
        if (!data)
            fetch(base + '/' + id) // Fetch data from url
                .then((response) => response.json()) // Parse response as JSON
                .then((data) => {
                    cache.set(id, data);
                    setData(data);
                }) // Set books to data
                .catch((error) => setData(error)); // Set error to error
    }, [id]);

    // Return data and refresh function
    return [data, setId];
}
