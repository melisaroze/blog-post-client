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
    </>
    )
}