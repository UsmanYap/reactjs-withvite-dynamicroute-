import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate();

  return (
    <div>
      <h1>Ini Home</h1>
      <div>
        <button className="p-2 px-4 border rounded-md mt-2 bg-blue-300 bg opacity-30 hover:opacity-70" onClick={() => navigate("/prodi")}>Prodi</button>
      </div>
    </div>
  )
}

export default Home