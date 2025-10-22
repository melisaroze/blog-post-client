import { Link } from 'react-router-dom';

export default function Home() {


return (

    <div className="homepage">
        <div >
                <h1>Blog Post Management App</h1>
                <p>Create, Read, Update and Delete Blog Post</p>
                <Link className="btn cta" to={"/posts"}>Begin Your Blogging Journey</Link>
       </div>
    </div>
    )
}