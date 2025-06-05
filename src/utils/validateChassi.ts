export function validateChassi(input: string): boolean {
    const chassi = input.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

    if (chassi.length !== 17) return false;

    if (/[IOQ]/.test(chassi)) return false;

    return /^[A-HJ-NPR-Z0-9]{17}$/.test(chassi);
}
