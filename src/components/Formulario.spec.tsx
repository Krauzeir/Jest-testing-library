import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { textSpanEnd } from 'typescript'
import Formulario from './Formulario'

// Jest
describe('Comportamento do Formulário.tsx', () => {
    test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
        render(
        <RecoilRoot>
            <Formulario />
        </RecoilRoot>)
        // encontrar no DOM o input (Encontrado pelo texto) - getByPlaceholderText()
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        // encontrar o botão (Encontrado pela responsabilidade) - getByRole
        const botao = screen.getByRole('button')
        // garantir que o input esteja no documento (Esperado que esteja no documento) - toBeInTheDocument()
        expect(input).toBeInTheDocument()
        // garantir que o botão esteja desabilitado
        expect(botao).toBeDisabled()
    })
    test('adicionar um participante caso exista um nome preenchido', () => {
        render(
        <RecoilRoot>
            <Formulario />
        </RecoilRoot>)
        // encontrar no DOM o input (Encontrado pelo texto) - getByPlaceholderText()
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        // encontrar o botão (Encontrado pela responsabilidade) - getByRole
        const botao = screen.getByRole('button')
    
        // inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: 'Ana Catarina'
            }
        })
    
        // clicar no botão de submeter
        fireEvent.click(botao)
    
        // garantir que o input esteja com o foco ativo 
        expect(input).toHaveFocus()
    
        // garantir que o input não tenha um valor
        expect(input).toHaveValue('')
    })
    
    test('nome duplicados não podem ser adicionados na lista', () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
            const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
            const botao = screen.getByRole('button')
            fireEvent.change(input, {
                target: {
                    value: 'Ana Catarina'
                }
            })
            fireEvent.click(botao)
            fireEvent.change(input, {
                target: {
                    value: 'Ana Catarina'
                }
            })
            fireEvent.click(botao)
            
            const mensagemdeErro = screen.getByRole('alert')
    
            expect(mensagemdeErro.textContent).toBe('Nomes duplicados não são permitidos!')
    })
    
    test('a mensagem de erro deve sumir após os timers', () => {
        //fingir que simule um tempo
        jest.useFakeTimers()
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
            const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
            const botao = screen.getByRole('button')
            fireEvent.change(input, {
                target: {
                    value: 'Ana Catarina'
                }
            })
            fireEvent.click(botao)
            fireEvent.change(input, {
                target: {
                    value: 'Ana Catarina'
                }
            })
            fireEvent.click(botao)
            
            let mensagemdeErro = screen.queryByRole('alert')
    
            expect(mensagemdeErro).toBeInTheDocument()
    
            //esperar N segundos
            act(() => {
                jest.runAllTimers()
    
            })
    
            mensagemdeErro = screen.queryByRole('alert')
            expect(mensagemdeErro).toBeNull()
    })
})