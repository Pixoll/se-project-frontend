import { ChangeEvent, useState } from "react";

export default function useForm<T>(initialForm: T): UseForm<T> {
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    return {
        formState,
        onInputChange,
        onResetForm,
    };
}

type UseForm<T> = {
    formState: T;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onResetForm: () => void;
};
