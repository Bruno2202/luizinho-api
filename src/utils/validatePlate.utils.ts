export function validatePlate(plate: string): boolean {
    plate = plate.replace(/[^A-Z0-9]/gi, '').toUpperCase();

    const oldPattern = /^[A-Z]{3}[0-9]{4}$/;

    const mercosulPattern = /^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/;

    return oldPattern.test(plate) || mercosulPattern.test(plate);
}
