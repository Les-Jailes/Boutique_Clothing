import '@/css/Loader/Loader.css'

const Loader = ({isLoaderVisible}) => {

  return (
    <div id="loader-wrapper" className={isLoaderVisible ? 'visible' : 'hidden'}>
      <span className="loader"></span>
    </div>
  );
};

export default Loader;