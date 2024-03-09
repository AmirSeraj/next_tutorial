import { UnsplashImages } from "@/models/unsplash-image"
import Image from "next/image"
import styles from './topic.module.css';
import { Metadata } from "next";

// export const revalidate = 0;

// export const dynamicParams = false;

interface PageProps {
    params: { topic: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
    return {
        title: topic
    }
}

export function generateStaticParams() {
    return ["health", "fitness", "coding"].map(topic => ({ topic }))
}

const Page = async ({ params: { topic } }: PageProps) => {

    const response = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`)
    const images: UnsplashImages[] = await response.json();
    return (
        <div>
            <h1>{topic}</h1>
            <div className="flex flex-wrap gap-2">
                {
                    images.map(image => (
                        <Image
                            src={image.urls.raw}
                            width={250}
                            height={250}
                            alt={image.description}
                            key={image.urls.raw}
                            className={styles.image}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Page