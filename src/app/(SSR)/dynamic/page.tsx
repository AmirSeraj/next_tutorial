import { UnsplashImages } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";


export const metadata = {
    title: 'Dynamic Fetching - NextJs 13.4 Image Gallery',
}

// export const revalidate = 0;

export default async function Page() {
    const response = await fetch('https://api.unsplash.com/photos/random?client_id=' + process.env.UNSPLASH_ACCESS_KEY, {
        // cache: 'no-cache',
        next: {
            revalidate: 0
        }
    });
    const image: UnsplashImages = await response.json();

    const width = Math.min(500, image.width);
    const height = (width / image.width) * image.height;

    return (
        <div className="flex flex-col items-center">
            <Image src={image.urls.raw} width={width} height={height} alt={image.description} className="rounded-lg shadow-lg min-w-[100px] h-full mt-5 p-2" />
            by <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
        </div>
    )
}