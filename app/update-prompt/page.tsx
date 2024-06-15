'use client';

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "@node_modules/next/navigation";
import Form from "@components/Form";

const EditPromptContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

    const [post, setPost] = useState({ prompt: "", tag: "" });
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPromptDetails = async () => {
            try {
                const response = await fetch(`/api/prompt/${promptId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch prompt details");
                }
                const data = await response.json();

                setPost({
                    prompt: data.prompt,
                    tag: data.tag,
                });
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        if (promptId) {
            getPromptDetails();
        } else {
            setLoading(false);
        }
    }, [promptId]);

    const updatePrompt = async (e: any) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) {
            alert('Prompt ID not found!');
            setSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });

            if (response.ok) {
                router.push('/profile');
            } else {
                throw new Error("Failed to update prompt");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return <div>Loading...</div>;

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

export default function EditPrompt() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditPromptContent />
        </Suspense>
    );
}