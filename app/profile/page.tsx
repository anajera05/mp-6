"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react';
import Image from "next/image";

export default function Welcome() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const picture = searchParams.get('picture');

    return (
        <Suspense fallback={<div>Loading...</div>}>
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold mb-2 text-center text-black">Thank you {name} for trying the application!</h1>
                <h2 className="text-lg mb-4  text-gray-600">CS391 is my favorite class!</h2>
                <div className="flex justify-center mt-4">
                    {picture && <Image
                        src={picture}
                        alt="profile picture"
                        width={128}
                        height={128}
                        className="rounded-full"
                    />}
                </div>
            </div>

        </div>
        </Suspense>
    );
}
