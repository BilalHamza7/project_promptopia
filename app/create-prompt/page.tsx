'use client';

import { useState } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from "@node_modules/next/navigation";
import Form from "@components/Form";

export default function CreatePrompt() {

    const router = useRouter();
    const { data: session } = useSession();
    
    const [submitting, setsubmitting] = useState(false);
    const [post, setpost] = useState({
        prompt: '',
        tag: '',
    })

    const createPrompt = async (e: any) => {
        e.preventDefault();
        setsubmitting(true);

        try {
            const response = await fetch('/api/prompt/new',
            {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })

            if(response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error)
        } finally {
            setsubmitting(false);
        }
    }

    return (
        <Form 
            type="Create"
            post={post}
            setPost={setpost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
};