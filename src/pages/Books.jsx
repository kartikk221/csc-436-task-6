import { useNavigate } from 'react-router-dom';
import { useBooksData } from '../hooks/useBooksData';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import ErrorAlert from '../components/ErrorAlert';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Container from '../components/Container';

const Books = () => {
    // Use the books data from the API
    const navigate = useNavigate();
    const [data, refreshData] = useBooksData();
    const [crumbs, push] = useBreadcrumbs();

    // Return a skeleton if the data is loading
    if (!data) return <Skeleton count="10" height="8em" className="rounded-md" />;

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
                        className="group rounded-lg bg-black/100 flex flex-row mb-4 hover:bg-black/90 transition-all cursor-pointer"
                        onClick={() => {
                            push(`/books/${id}`, title);
                            navigate(`/books/${id}`);
                        }}
                    >
                        <div className="flex">
                            <img
                                src={imageURL}
                                className="h-[8em] w-[6em] group-hover:w-[7em] transition-all rounded-md"
                            ></img>
                        </div>
                        <div className="flex flex-col ml-8">
                            <p className="text-4xl font-extrabold text-white">{title}</p>
                            <p className="text-2xl font-semibold text-white">By {author}</p>
                            <p className="text-xl font-light text-white mt-2">
                                Click to view more information about{' '}
                                <strong className="transition-all group-hover:text-sky-400">{title}</strong> by{' '}
                                <strong className="transition-all group-hover:text-sky-400">{author}</strong>.
                            </p>
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
