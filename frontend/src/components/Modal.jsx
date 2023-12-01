// close handler is defined in parent. 
function Modal({ close, children, textColor, backgroundColor }) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className= {(textColor ? textColor : 'text-red-600') + ' ' + (backgroundColor ? backgroundColor : 'bg-black') + ' relative rounded py-12 px-6 text-center bg-opacity-80 tracking-wider w-full md:w-1/4 break-words'}>
          <svg onClick={close} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
            strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 absolute top-0 right-0 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;