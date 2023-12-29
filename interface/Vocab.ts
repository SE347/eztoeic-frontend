export interface Vocab {
    id: number;
    vocab: string;
    definition: string;
}

export interface FlashCards {
    id: number;
    title: string;
    description: string;
    vocabCount: number;
    vocabs: Vocab[];
}
