const Container = ({ children, className, onClick }) => {
    return (
        <section onClick={onClick} className={`mx-auto max-w-7xl px-4 py-5 ${className}`}>
            {children}
        </section>
    );
};

Container.defaultProps = {
    className: '',
};

export default Container;
