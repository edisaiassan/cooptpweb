export const Extend = ({ children, min = false }) => {
    return (
      <div className={`mx-auto ${min ? 'max-w-[720px]' : 'max-w-[1920px]'}`}>
        {children}
      </div>
    );
  };
  