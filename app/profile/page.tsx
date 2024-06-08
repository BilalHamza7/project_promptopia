'use client';

import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from "@node_modules/next/navigation";
import Profile from "@components/Profile";

export default function MyProfile() {

    const [posts, setPosts] = useState<any[]>([]);

    const { data: session } = useSession();

    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setPosts(data);
        }
        if (session?.user.id) fetchPosts();
    }), [];


    const handleEdit = (post: any) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post: any) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter((p) => p._id !== post._id);

                setPosts(filteredPosts);
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
};
