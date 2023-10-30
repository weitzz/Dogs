import { useEffect, useState } from "react"
import FeedModal from "./FeedModal"
import FeedPhotos from "./FeedPhotos"
import { IPhoto } from "../../types/types"
type FeedProps = {
    user?: number | string;
};

const Feed = ({ user }: FeedProps) => {
    const [modalPhoto, setModalPhoto] = useState<IPhoto | undefined>()
    const [pages, setPages] = useState([1]);
    const [infinite, setInfinite] = useState(true);

    useEffect(() => {
        let wait = false
        const infiniteScroll = () => {
            if (infinite) {
                // pega a posição da barra de rolagem
                const scroll = window.scrollY;

                const height = document.body.offsetHeight - window.innerHeight;

                if (scroll > height * 0.75 && !wait) {
                    setPages(pages => [...pages, pages.length + 1]);
                    wait = true
                    setTimeout(() => {
                        wait = false;
                    }, 500)
                }
            }
        }

        // wheel é a rodinha do mouse
        window.addEventListener('wheel', infiniteScroll);
        window.addEventListener('scroll', infiniteScroll);
        return () => {
            window.removeEventListener('wheel', infiniteScroll);
            window.removeEventListener('scroll', infiniteScroll);
        }
    }, [infinite])
    return (
        <div>
            {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />}
            {pages.map(page => <FeedPhotos user={user} page={page} key={page} setModalPhoto={setModalPhoto} setInfinite={setInfinite} />)}
        </div>
    )
}

export default Feed