export function formatPlate(plate: string) {
    plate = plate.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    return plate;
}