import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import pick1 from '../../picktures/pick1.jpg'
import pick2 from '../../picktures/pick2.jpg'
import pick3 from '../../picktures/pick3.jpg'
import pick4 from '../../picktures/pick4.jpg'
import pick5 from '../../picktures/pick5.jpg'
import pick6 from '../../picktures/pick6.jpg'
import pick7 from '../../picktures/pick7.jpg'
import pick8 from '../../picktures/pick8.jpeg'
import pick9 from '../../picktures/pick9.jpg'
import pick10 from '../../picktures/pick10.jpg'
import pick11 from '../../picktures/pick11.jpg'
import pick12 from '../../picktures/pick12.jpeg'
import pick13 from '../../picktures/pick13.jpg'
import pick14 from '../../picktures/pick14.jpeg'
import pick15 from '../../picktures/pick15.jpeg'

const posters = [pick1, pick2, pick3, pick4, pick5, pick6, pick7, pick8, pick9, pick10, pick11, pick12, pick13, pick14, pick15]


export default function Screensaver() {

    const [visiblePosters, setVisiblePosters] = useState([])

    useEffect(() => {
        const updatePosters = () => {

            const randomCount = Math.floor(Math.random() * 3) + 1

            const shuffled = [...posters].sort(() => 0.5 - Math.random()).slice(0, randomCount)
            setVisiblePosters(shuffled)
        }

        updatePosters()
        const interval = setInterval(updatePosters, 3500)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className={styles.postersContainer}>
            {posters.map((poster, index) => (
                <img
                    key={index}
                    src={poster}
                    alt={`poster-${index}`}
                    className={`${styles.poster} ${visiblePosters.includes(poster) ? styles.visible : styles.hidden}`}
                />
            ))}
        </div>
    )
}