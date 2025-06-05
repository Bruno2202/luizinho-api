export function formatCpf(cpf: string): string {
    cpf = cpf.replace(/[^\d]+/g, '');
    return cpf;
}
