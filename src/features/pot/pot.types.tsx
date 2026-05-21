export type PotCategory = 
    | 'Travel'
    | 'Gift'
    | 'Sport'
    | 'Friends'
    | 'Other'
    | 'Charity'; 

    export interface Pot {
        id: string; /* look to replace with UUID */
        name: string;
        category: PotCategory;
        createdAt: string;
    }

    export interface PotCreationInput {
        name: string;
        category: PotCategory | '';
    }

    export interface PotValidationErrors {
        name?: string;
        category?: string;
    }