import { atom } from "recoil";

export const listaParticipantesState = atom<string[]>({
    key: 'listaParticipantesState',
    default: []
})

export const errorState = atom<string>({
    key: 'erroState',
    default: ''
})