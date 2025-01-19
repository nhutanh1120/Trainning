import { Link } from 'react-router-dom';
import Media from './Media';

function Home() {
    return (
        <article>
            <div className="content">
                <Media />
                <section className="Ac"></section>
            </div>
        </article>
    );
}

export default Home;
