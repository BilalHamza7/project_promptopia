'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "@node_modules/next/navigation";
import Form from "@components/Form";

export default function EditPrompt() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

    const [post, setPost] = useState({ prompt: "", tag: "", });
    const [submitting, setsubmitting] = useState(false);

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        };

        if (promptId) getPromptDetails();
    }, [promptId]);


    const updatePrompt = async (e: any) => {
        e.preventDefault();
        setsubmitting(true);


        if (!promptId) return alert('Prompt ID not found!');

        try {
            const response = await fetch(`/api/prompt/${promptId}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        tag: post.tag
                    })
                })

            if (response.ok) {
                router.push('/profile');
            }
        } catch (error) {
            console.log(error)
        } finally {
            setsubmitting(false);
        }
    }

    return (
        post.prompt ? (
            <Form
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={updatePrompt}
            />
        ) : (
            <div className="text-2xl">Loading...</div>
        )
    )
};
