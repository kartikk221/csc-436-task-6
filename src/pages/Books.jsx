import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBooksData } from '../hooks/useBooksData';
import ErrorAlert from '../components/ErrorAlert';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Container from '../components/Container';

const Books = () => {
    // Use the books data from the API
    const [data, refreshData] = useBooksData('https://api.matgargano.com/api/books');

    // Return a skeleton if the data is loading
    if (!data) return <Skeleton count="10" height="8em" />;

    // Return an error if the data is an instance of Error
    if (data instanceof Error) return <ErrorAlert>{data.message}</ErrorAlert>;

    // Render the books data
    return (
        <>
            {/* Book Elements */}
            {data.map(({ id, author, title, imageURL }) => {
                return (
                    <Container
                        key={id}
                        className="rounded-lg bg-black/100 flex flex-row mb-4 hover:bg-black/90 transition-all cursor-pointer"
                    >
                        <div className="flex">
                            <img src={imageURL} className="h-[8em] w-[6em] rounded-md"></img>
                        </div>
                        <div className="flex flex-col ml-8">
                            <p className="text-4xl font-extrabold text-white">{title}</p>
                            <p className="text-2xl font-semibold text-white">By {author}</p>
                        </div>
                    </Container>
                );
            })}

            {/* Bottom Spacer */}
            <div className="h-[3em]"></div>
        </>
    );
};

export default Books;
