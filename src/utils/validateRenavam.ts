export function validateRenavam(input: string): boolean {
    const renavam = input.replace(/\D/g, "");

    if (!/^\d{9,11}$/.test(renavam)) return false;

    if (renavam.length === 11) {
        const renavamWithoutDV = renavam.slice(0, 10);
        const dv = parseInt(renavam[10]);

        let sum = 0;
        let multiplier = 2;

        for (let i = 9; i >= 0; i--) {
            sum += parseInt(renavamWithoutDV[i]) * multiplier++;
            if (multiplier > 9) multiplier = 2;
        }

        const remainder = sum % 11;
        const calculatedDigit = remainder === 0 || remainder === 1 ? 0 : 11 - remainder;

        return calculatedDigit === dv;
    }

    return true;
}