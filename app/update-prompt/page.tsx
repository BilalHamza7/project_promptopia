'use client';

import { useState, useEffect } from "react";
import Form from "@components/Form";
import { useRouter } from "@node_modules/next/router";

export default function EditPrompt() {

    const router = useRouter();

    const [submitting, setsubmitting] = useState(false);
    const [post, setpost] = useState({
        prompt: '',
        tag: '',
    });

    const { id } = router.query;

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${id}`);

            const data = await response.json();

            setpost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }

        if (id) getPromptDetails()
    }, [id])


    const updatePrompt = async (e: any) => {
        e.preventDefault();
        setsubmitting(true);

        if (!id) return alert('Prompt ID not found!');

        try {
            const response = await fetch(`/api/prompt/${id}`,
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
        <Form
            type="Edit"
            post={post}
            setPost={setpost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
};
