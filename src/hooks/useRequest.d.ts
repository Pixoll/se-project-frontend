export type FetchStatus = "loading" | "success" | "failed";

export type FetchInProgress = {
    status: "loading";
    handleCancelRequest: () => void;
};

export type FetchSuccess<T> = {
    status: "success";
    data: T;
};

export type FetchFailed = {
    status: "failed";
    error: string;
};

export type FetchResult<T> = FetchInProgress | FetchSuccess<T> | FetchFailed;

export type Method = "get" | "post" | "put" | "patch" | "delete";

export default function useRequest<M extends Method, R>(
    method: M,
    endpoint: string,
    ...[payload]: M extends "get" | "delete" ? [] : [payload: object]
): FetchResult<R>;
