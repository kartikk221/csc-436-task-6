import { useMemo } from 'react';

const breadcrumbs = new Map();
try {
    let hash = location.hash.replace('#', '');
    if (hash) {
        hash = atob(hash);
        hash.split(',').forEach((chunk) => {
            const [path, title] = chunk.split('=');
            breadcrumbs.set(path, title);
        });
    }
} catch (error) {
    console.error(error);
    location.hash = '';
}

function write_crumbs() {
    const crumbs = [];
    for (const [path, title] of breadcrumbs) {
        crumbs.push(`${path}=${title}`);
    }
    setTimeout(() => (location.hash = '#' + btoa(crumbs.join(','))), 0);
}

export function useBreadcrumbs() {
    // Push a new breadcrumb
    const push = useMemo(
        () => (path, title) => {
            breadcrumbs.set(path, title);
            write_crumbs();
        },
        []
    );

    // Pops all bredcrumbs after the given path
    const pop = useMemo(
        () => (path) => {
            // Iterate through breadcrumbs
            for (const [trail] of breadcrumbs) {
                // If the trail is after the path, delete it
                if (path === '/' || (trail !== path && !trail.startsWith(path))) breadcrumbs.delete(trail);
            }
            write_crumbs();
        },
        []
    );

    // Return breadcrumbs and push/pop functions
    return [breadcrumbs, push, pop];
}
