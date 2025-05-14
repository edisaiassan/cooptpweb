export const Extend = ({ children, min = false, modifier, id, onClick }) => {
    return (
      <div className={`mx-auto ${min ? 'max-w-[768px]' : 'max-w-[1280px]'} ${modifier} w-full`} id={id} onClick={onClick}>
        {children}
      </div>
    );
  };
  