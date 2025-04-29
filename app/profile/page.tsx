import { Suspense } from 'react';
import Welcome from './Welcome'; // or adjust import path

export default function ProfilePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Welcome />
        </Suspense>
    );
}
