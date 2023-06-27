import {useCallback, useState} from 'react';
import _ from '@lodash';

function useForm(initialState, onSubmit)
{
    const [form, setForm] = useState(initialState);

    const change = event => {
        if (event.persist) {
            event.persist();
        }
        
        setForm(
            form => ({
                ...form,
                [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
            })
        )
    }

    const handleChange = useCallback(change, []);

    const handleCustomChange = useCallback(customCallback => event => {
        event.target.value = customCallback(event);
        change(event);
    }, [])

    const resetForm = useCallback(() => {
        setForm(initialState);
    }, [initialState]);

    const setInForm = useCallback((name, value) => {
        setForm(form => _.setIn(form, name, value));
    }, []);

    const handleSubmit = useCallback((event) => {
        if ( event )
        {
            event.preventDefault();
        }
        if ( onSubmit )
        {
            onSubmit();
        }
    }, [onSubmit]);

    return {
        form,
        handleChange,
        handleCustomChange,
        handleSubmit,
        resetForm,
        setForm,
        setInForm
    }
}

export default useForm;
