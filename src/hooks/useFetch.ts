import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export const apiUrl = "http://localhost:3000/api/v1";

export default function useFetch<T>(endpoint: string, params?: Record<string, unknown>): FetchResult<T> {
    const [counter, setCounter] = useState(0);
    const [status, setStatus] = useState<FetchStatus>("loading");
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [controller, setController] = useState<AbortController | null>(null);
    const { state } = useAuth();

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);

        const url = apiUrl + endpoint;
        console.log(`fetching ${url}`);

        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                },
                params,
            })
            .then((response) => {
                if (response.status >= 400) {
                    const error = new Error();
                    Object.assign(error, { response });
                    setStatus("failed");
                    throw error;
                }

                console.log(url, ":", response.data);

                setData(response.data);
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
    }, [endpoint, params, state.token, counter]);

    const handleCancelRequest = () => {
        if (controller) {
            controller.abort();
            setError("Request cancelled");
        }
    };

    const reload = () => setCounter(x => x + 1);

    switch (status) {
        case "loading":
            return { status, handleCancelRequest };
        case "success":
            return { status, data: data!, reload };
        case "failed":
            return { status, error: error!, reload };
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
    reload: () => void;
};

type FetchFailed = {
    status: "failed";
    error: string;
    reload: () => void;
};

type FetchResult<T> = FetchInProgress | FetchSuccess<T> | FetchFailed;
