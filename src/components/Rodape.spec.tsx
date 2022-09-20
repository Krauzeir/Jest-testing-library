import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { useListaDeParticipantes } from '../state/hook/useListaDeParticipantes'
import Rodape from './Rodape'


jest.mock('../state/hook/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
})

const mockNavegacao = jest.fn()
const mockSorteio = jest.fn()


jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => mockNavegacao
    }
})

jest.mock('../state/hook/useSorteador', () => {
    return {
        useSorteador: () => mockSorteio
    }
})

describe('onde não existem participantes suficientes', () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    })
    test('a brincadeira não pode ser iniciada', () => {
        render(<RecoilRoot>
            <Rodape></Rodape>
        </RecoilRoot>)

        const botao = screen.getByRole('button')
        expect(botao).toBeDisabled()
    })
})


describe('quando existem participantes suficientes', () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(['Ana', 'Catarina', 'Bruno'])
    })
    test('a brincadeira pode ser iniciada', () => {
        render(<RecoilRoot>
            <Rodape></Rodape>
        </RecoilRoot>)
        const botao = screen.getByRole('button')
        expect(botao).not.toBeDisabled()
    })
    test('a brincadeira foi iniciada',() => {
        render(<RecoilRoot>
            <Rodape></Rodape>
        </RecoilRoot>)
        const botao = screen.getByRole('button')
        fireEvent.click(botao)
        /* Quantas vezes foi chamado */
        expect(mockNavegacao).toHaveBeenCalledTimes(1)
        /* Como foi chamado */
        expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
        expect(mockSorteio).toHaveBeenCalledTimes(1)
    })
})