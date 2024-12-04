import { useState, useEffect } from "react";

const apiUrl = "http://localhost:3000/api/v1";

export default function useRequest(method, endpoint, payload) {
    const [status, setStatus] = useState("loading");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [controller, setController] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);

        fetch(apiUrl + endpoint, {
            ...payload && { body: JSON.stringify(payload) },
            method,
            signal: abortController.signal,
        })
            .then(async (response) => {
                const json = await response.json();
                if (response.status >= 400) {
                    setError(json.message);
                    setStatus("failed");
                    return;
                }

                setData(json);
                setStatus("success");
            })
            .catch((error) => {
                if (error instanceof Error && error.name === "AbortError") {
                    console.log("Request cancelled");
                    return;
                }

                setError(error instanceof Error ? error.message : `${error}`);
                setStatus("failed");
            });

        return () => abortController.abort();
    }, [endpoint]);

    const handleCancelRequest = () => {
        if (controller) {
            controller.abort();
            setError("Request cancelled");
        }
    };

    switch (status) {
        case "loading":
            return { status, handleCancelRequest };
        case "success":
            return { status, data };
        case "failed":
            return { status, error };
    }
}
