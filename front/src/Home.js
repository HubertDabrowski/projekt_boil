import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="max-w-lg text-3xl font-semibold leading-normal text-gray-900 dark:text-white">Wybierz metodę</p>
      <div className="h-40 grid grid-cols-2 gap-4 content-evenly ...">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          <Link to="/cpm/forms">CPM</Link>
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          <Link to="/pos/forms">Pośrednik</Link>
        </button>
      </div>
      
    </div>
  );
};

export default Home;
