import { Link } from "react-router-dom"
import Image_Page_Not_Found from "../assets/images/404.png"
const PageNotFound = () => {
  return (
    <div>
       <div className="flex flex-col items-center justify-center p-10 ">
      <img
        src={Image_Page_Not_Found} // Update this path to your actual image location
        alt="404 Not Found"
        className="mb-8 w-1/2 md:w-1/3"
      />
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Oops! Page Not Found
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="btn mt-6 px-4 py-2 bg-blue-600 text-white  hover:bg-blue-500 transition">
        Back to Home
      </Link>
    </div>
    </div>
  )
}

export default PageNotFound
