import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LatestPosts from '../components/LatestPosts'

const quotes = [
  "Parenting is a journey, not a destination.",
  "Every small step you take matters.",
  "Your story can inspire someone today.",
  "Strength grows in moments when you think you can’t go on but you keep going.",
  "It’s okay to not be okay; you are doing your best."
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];



export default function Home() {

useEffect(() => {
  fetch("https://blog-post-api-alvarez.onrender.com/wakeup");
}, []);

return (
    <>

        <div className="homepage">
            <div className="border-home p-2">
                <h1>A space where every parent’s story matters.</h1>
                <p>Discover real stories from parents, tips for everyday challenges, and moments that remind you — you’re not alone.</p>
                <Link className="btn cta text-white" to={"/posts"}>Share Your Story</Link>
                <p className="text-center fst-italic mt-5">{randomQuote}</p>

            </div>
        </div>

       <LatestPosts />
    </>
    )
}