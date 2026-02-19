export const formatMoneyWithDecimals = (
    value: number,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
) => {
    const valueFix = value === Infinity ? 0 : value || 0;
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits,
        maximumFractionDigits
    })
        .format(valueFix)
        .replace(/\s/g, '');
};
