import Container from '../components/Container';
import { useParams } from 'react-router-dom';
import { useBookData } from '../hooks/useBookData';
import Skeleton from 'react-loading-skeleton';

const Book = () => {
    const { id = '' } = useParams();
    const [data] = useBookData(id);

    if (!data) return <Skeleton count="1" height="40em" className="rounded-lg" />;

    // Desctructure the data
    const { title, author, publisher, imageURL, year, country, pages } = data;

    return (
        <Container
            key={id}
            className="group rounded-lg bg-black/100 flex flex-row mb-4 hover:bg-black/90 transition-all"
        >
            <div className="flex">
                <img src={imageURL} className="h-[28em] w-[30em] rounded-md"></img>
            </div>
            <div className="flex flex-col ml-8">
                <p className="text-5xl font-extrabold text-white">{title}</p>
                <p className="text-2xl font-semibold text-white mt-4">
                    Authored By <strong>{author}</strong>
                </p>
                <p className="text-2xl font-semibold text-white mt-4">
                    Published By <strong>{publisher}</strong>
                </p>
                <p className="text-2xl font-semibold text-white mt-4">
                    Written In <strong>{country}</strong>
                </p>
                <p className="text-2xl font-semibold text-white mt-4">
                    Released In <strong>{year}</strong>
                </p>
                <p className="text-2xl font-semibold text-white mt-4">
                    Readable Length Of <strong>{pages}</strong> Pages
                </p>
                <p className="text-xl font-light text-white mt-4">
                    {title} by {author} is a classic originating from {country} and published by {publisher} in {year}.
                    This is a {pages > 500 ? 'long' : 'short'} book that is a must read for any book lover.
                </p>
            </div>
        </Container>
    );
};

export default Book;
