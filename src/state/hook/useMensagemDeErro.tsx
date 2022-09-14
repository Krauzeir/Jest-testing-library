import { useRecoilValue } from "recoil"
import { errorState } from "../atom"

export const useMensagemDeErro = () => {
    const mensagem = useRecoilValue(errorState)
    return mensagem
}