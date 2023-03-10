import Container from './Container';
import { NavLink as RouterLink } from 'react-router-dom';

const Header = () => {
    const getClassName = (props) => {
        return `${
            props.isActive ? 'font-bold text-2xl' : ''
        } text-base hover:font-bold text-white transition-all mt-auto `;
    };

    return (
        <Container className="rounded-b-lg bg-black px-8 fixed top-0 left-0 right-0 w-screen">
            <nav className="flex gap-6 min-h-[2em]">
                <RouterLink className={getClassName} to="/">
                    Home
                </RouterLink>
                <RouterLink className={getClassName} to="/about">
                    About
                </RouterLink>
                <RouterLink className={getClassName} to="/books">
                    Books
                </RouterLink>
            </nav>
        </Container>
    );
};

export default Header;
