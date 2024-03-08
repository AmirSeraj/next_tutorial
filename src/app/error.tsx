"use client"

interface ErrorPageProps {
    error: Error,
    reset: () => void,
}

const Error = ({ error, reset }: ErrorPageProps) => {
    return (
        <div className="flex flex-col justify-center gap-2 pt-10 items-center">
            <h1>Error</h1>
            <p>Something went wrong!</p>
            <button onClick={reset} className="py-2 px-3 bg-blue-500 w-[100px] rounded-2xl">
                Try again
            </button>
        </div>
    )
}

export default Error