'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "@node_modules/next/navigation";
import Form from "@components/Form";

export default function EditPrompt() {

    
    const [submitting, setsubmitting] = useState(false);
    const [post, setpost] = useState({
        prompt: '',
        tag: '',
    });

    const [promptId, setPromptId] = useState('');

    useEffect(() => {
        const router = useRouter();
        const searchParams = useSearchParams();
        const id = searchParams.get('id');

        if (id) setPromptId(id);
        
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);

            const data = await response.json();

            setpost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }

        getPromptDetails()
    }, [promptId])
    

    const updatePrompt = async (e: any) => {
        e.preventDefault();
        setsubmitting(true);

        if(!promptId) return alert('Prompt ID not found!');
        
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
                const router = useRouter();
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
