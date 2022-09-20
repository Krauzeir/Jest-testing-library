import { realizarSorteio } from "./realizarSorteio"

describe('dado um sorteio de amigo secreto', () => {
    test('cada pariticpante não sorteio o próprio nome', () => {
        const participantes = [
            'Ana',
            'Catarina',
            'Bruno',
            'João',
            'Vinicios',
            'Hugo'
        ]

        const sorteio = realizarSorteio(participantes)
        participantes.forEach(participante => {
            const amigoSecreto = sorteio.get(participante)
            expect(amigoSecreto).not.toEqual(participante)
        })
    })
})