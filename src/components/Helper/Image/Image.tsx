import { useState } from 'react'
import styles from './Image.module.css'

interface ImageProps {
    alt: string
    src: string
}

const Image = ({ alt, src, ...props }: ImageProps) => {
    const [skeleton, setSkeleton] = useState(true)


    const handleLoad = (event: React.SyntheticEvent) => {
        setSkeleton(false)
        const target = event.target as HTMLImageElement;
        target.style.opacity = '1';

    }
    return (
        <div className={styles.wrapper}>
            {skeleton && <div className={styles.skeleton}></div>}
            <img onLoad={handleLoad} className={styles.img} src={src} alt={alt} {...props} />
        </div>
    )
}

export default Image