import { useState } from "react"
import FeedModal from "./FeedModal"
import FeedPhotos from "./FeedPhotos"
import { IPhoto } from "../../types/types"


const Feed = () => {
    const [modalPhoto, setModalPhoto] = useState<IPhoto | undefined>()
    return (
        <div>
            {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />}
            <FeedPhotos setModalPhoto={setModalPhoto} />
        </div>
    )
}

export default Feed