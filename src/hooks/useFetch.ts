import { useState, useEffect } from "react";

const apiUrl = "http://localhost:3000/api/v1";

export default function useFetch<T>(endpoint: string): FetchResult<T> {
    const [status, setStatus] = useState<FetchStatus>("loading");
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [controller, setController] = useState<AbortController | null>(null);

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);

        fetch(apiUrl + endpoint)
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
            return { status, data: data! };
        case "failed":
            return { status, error: error! };
    }
}

type FetchStatus = "loading" | "success" | "failed";

type FetchInProgress = {
    status: "loading";
    handleCancelRequest: () => void;
};

type FetchSuccess<T> = {
    status: "success";
    data: T;
};

type FetchFailed = {
    status: "failed";
    error: string;
};

type FetchResult<T> = FetchInProgress | FetchSuccess<T> | FetchFailed;
