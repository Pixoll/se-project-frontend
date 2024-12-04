import { useState, useEffect } from "react";

const apiUrl = "http://localhost:3000/api/v1";

/**
 * @template T
 * @param {string} endpoint
 * @returns {FetchResult<T>}
 */
export default function useFetch(endpoint) {
    const [status, setStatus] = /** @type {State<FetchStatus>} */ (useState("loading"));
    const [data, setData] = /** @type {State<object | null>} */ (useState(null));
    const [error, setError] = /** @type {State<string | null>} */ (useState(null));
    const [controller, setController] = /** @type {State<AbortController | null>} */ (useState(null));

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);

        fetch(apiUrl + endpoint, { signal: abortController.signal })
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

/**
 * @typedef {"loading" | "success" | "failed"} FetchStatus
 */

/**
 * @template T
 * @typedef {FetchInProgress | FetchSuccess<T> | FetchFailed} FetchResult
 */

/**
 * @typedef {{
 *     status: "loading";
 *     handleCancelRequest: () => void;
 * }} FetchInProgress
 */

/**
 * @template T
 * @typedef {{
 *     status: "success";
 *     data: T;
 * }} FetchSuccess
 */

/**
 * @typedef {{
 *     status: "failed";
 *     error: string;
 * }} FetchFailed
 */

/**
 * @template T
 * @typedef {[T, import("react").Dispatch<import("react").SetStateAction<T>>]} State
 */
