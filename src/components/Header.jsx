import Container from './Container';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';

const schema = [
    {
        path: '/',
        name: 'Home',
    },
    {
        path: '/about',
        name: 'About',
    },
    {
        path: '/books',
        name: 'Books',
    },
];

const Header = () => {
    const { pathname } = useLocation();
    const [crumbs, push, pop] = useBreadcrumbs();

    // pop the current path from the breadcrumbs
    pop(pathname);

    return (
        <Container className="z-50 rounded-b-lg bg-black px-8 fixed top-0 left-0 right-0 w-screen">
            <nav className="flex gap-6 min-h-[2em]">
                {schema.map(({ path, name }, index) => {
                    const root = path === '/';
                    const active = pathname === path;
                    const matches = pathname.startsWith(path);

                    // Determine if this is a breadcrumb path
                    if (!root && !active && matches) {
                        // Find all breadcrumbs that match this path
                        const matches = [];
                        for (const [trail] of crumbs) {
                            if (pathname.startsWith(trail))
                                matches.push({
                                    path: trail,
                                    name: crumbs.get(trail),
                                });
                        }

                        // Sort the matches in terms of increasing path length
                        matches.sort((a, b) => a.path.length - b.path.length);

                        // Return a set of links
                        return (
                            <div key={index} className="mt-auto">
                                <RouterLink
                                    className={`${
                                        active ? 'font-bold text-2xl' : ''
                                    } text-2xl hover:font-bold text-white transition-all mt-auto `}
                                    to={path}
                                >
                                    {name} {matches.length > 0 ? '/ ' : ''}
                                </RouterLink>
                                {matches.map(({ path, name }, index) => (
                                    <RouterLink
                                        key={index}
                                        className={`${
                                            path === pathname ? 'font-bold' : ''
                                        } text-xl hover:font-bold text-white transition-all mt-auto `}
                                        to={path}
                                    >
                                        {(index ? '/' : '') + name}
                                    </RouterLink>
                                ))}
                            </div>
                        );
                    }

                    // Return a normal link
                    return (
                        <RouterLink
                            key={index}
                            className={`${
                                active ? 'font-bold text-2xl' : ''
                            } text-xl hover:font-bold text-white transition-all mt-auto `}
                            to={path}
                        >
                            {name}
                        </RouterLink>
                    );
                })}
            </nav>
        </Container>
    );
};

export default Header;
