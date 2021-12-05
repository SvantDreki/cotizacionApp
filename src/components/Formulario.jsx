import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import { useEffect, useState } from 'react'
import Error from './Error'

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #7a7dfe;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [ SelectMonedas, moneda ] = useSelectMonedas('Elige tu Moneda', monedas)
    const [ SelectCriptoMonedas, criptoMoneda ] = useSelectMonedas('Elige tu Moneda', criptos)

    useEffect(() => {
        consultarAPI()
    }, [])

    const consultarAPI = async () => {
        const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

        const resp = await fetch(url)
        const resul = await resp.json();

        const arrayCripto = resul.Data.map( cripto => {
            const objeto = {
                id: cripto.CoinInfo.Name,
                nombre: cripto.CoinInfo.FullName
            }

            return objeto
        } )

        setCriptos(arrayCripto)

    }

    const handleSubmit = e => {
        e.preventDefault();

        if([moneda, criptoMoneda].includes('')) {
            setError(true)
            return
        }

        setError(false)

        setMonedas({
            moneda,
            criptoMoneda
        })
    }

    return (
        <>
            { error && <Error>Todos los campos son obligatorios</Error> }
            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas />

                <SelectCriptoMonedas />
        
                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    )
}

export default Formulario
