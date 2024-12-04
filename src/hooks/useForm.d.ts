import { ChangeEvent } from "react";

export type UseForm<T> = {
    formState: T;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onResetForm: () => void;
};

export default function useForm<T>(initialForm: T): UseForm<T>;
