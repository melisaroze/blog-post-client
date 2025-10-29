import { Link } from 'react-router-dom';
import LatestPosts from '../components/LatestPosts'


export default function Home() {


return (
    <>

        <div className="homepage">
            <div >
                <h1>A space where every parent’s story matters.</h1>
                <p>Discover real stories from parents, tips for everyday challenges, and moments that remind you — you’re not alone.</p>
                <Link className="btn cta" to={"/posts"}>Share Your Story</Link>
            </div>
        </div>

       <LatestPosts />

    <footer className="bg-dark text-white text-center py-3 mt-5">
      <p className="mb-0">
        © {new Date().getFullYear()} Special Journey. All rights reserved.
      </p>
    </footer>
    </>
    )
}