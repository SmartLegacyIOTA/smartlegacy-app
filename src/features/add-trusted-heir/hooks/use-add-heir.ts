import { useCallback, useState } from 'react';
import { useI18nService } from '@/src/libs/i18n/i18n-service';
import { useSetHeir } from '@/src/iota/hooks/use-set-heir';

export function useAddHeir() {
    const { t } = useI18nService();

    const { setHeir } = useSetHeir();

    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateEmail = useCallback((emailValue: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailValue);
    }, []);

    const handleEmailChange = useCallback(
        (text: string) => {
            setEmail(text);
            if (error) {
                setError(false);
                setErrorMessage('');
            }
        },
        [error]
    );

    const handleSubmit = useCallback(async () => {
        if (!email.trim()) {
            setError(true);
            setErrorMessage(t('addHeir.errorEmailRequired'));
            return;
        }

        if (!validateEmail(email)) {
            setError(true);
            setErrorMessage(t('addHeir.errorEmailInvalid'));
            return;
        }

        try {
            setIsSubmitting(true);

            await setHeir('xxxx', 'xxxx');
        } catch {
            setError(true);
            setErrorMessage(t('addHeir.errorSubmitFailed'));
        } finally {
            setIsSubmitting(false);
        }
    }, [email, validateEmail, t, setHeir]);

    return {
        email,
        error,
        errorMessage,
        isSubmitting,
        handleEmailChange,
        handleSubmit
    };
}
