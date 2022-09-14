import { useRecoilValue, useSetRecoilState } from "recoil"
import { errorState, listaParticipantesState } from "../atom"

export const useAdicionarParticipante = () => {
    const setLista = useSetRecoilState(listaParticipantesState)
    const lista = useRecoilValue(listaParticipantesState)
    const setError = useSetRecoilState(errorState)
    return (nomeDoParticipante: string) => {
        if (lista.includes(nomeDoParticipante)){
            setError('Nomes duplicados não são permitidos!')
            setTimeout(() => {
                setError("")
            }, 3000)
            return
        }
        return setLista(listaAtual => [...listaAtual, nomeDoParticipante])
    }
}