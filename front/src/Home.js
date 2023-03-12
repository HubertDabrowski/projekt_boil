import { Link } from "react-router-dom";

const Home = () => {
  return (<div>
    <button>
      <Link to='/cpm/forms'>CPM</Link>
    </button>
    <button>
      <Link to='/pos/forms'>Pośrednik</Link>
    </button>
  </div>);
};

export default Home;