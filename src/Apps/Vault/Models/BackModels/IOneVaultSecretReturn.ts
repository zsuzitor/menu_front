
export interface IOneVaultSecretReturn {
    id: number;
    key: string;
    value: string;
    is_coded: boolean;
    is_public: boolean;
    die_date: Date;
    vault_id: number;
}
