import { motion } from "framer-motion"
import { useState, ChangeEvent } from 'react'
import { api } from '../../services/api'

import styles from './styles.module.scss'

export function TemplateLogin() {
    const [valueEmail, setValorEmail] = useState<string>('')
    const [valuePw, setValorPw] = useState<string>('')

    const [errorEmail, setErrorEmail] = useState<boolean>(false)
    const [errorPw, setErrorPw] = useState<boolean>(false)

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValorEmail(event.target.value)

        if (isSubmitted) {
            setErrorEmail(!event.target.value)
        }
    }

    const handlePwChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValorPw(event.target.value)

        if (isSubmitted) {
            setErrorPw(!event.target.value)
        }
    }

    const handleSubmit = async () => {
        setIsSubmitted(true)
        try {
            const response = await api.post('/login', {
                email: valueEmail,
                pw: valuePw,
            })

            if (response.status === 401) {
                console.error('Invalid credentials!')
            }

            if (response.status === 200) {
                localStorage.setItem('token', response.data)
                window.location.href = '/account'
            }

        } catch (error) {
            setErrorEmail(true)
            setErrorPw(true)
            console.error('Erro ao enviar dados para o backend', error)
        }
    }

    const redirectToCreateAccount = () => { window.location.href = '/createAccount' }

    return (
        <div className={styles.exampleContainer}>
            <motion.div
                className={styles.templateLogin}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 1 }}
                initial={{ y: -500, rotateY: 100 }}
                animate={{ y: 0, rotateY: 0, transition: { duration: 0.7 } }}
            >
                <h3 id={styles.titleTemplate}>Seja bem-vindo!</h3>
                <form id={styles.formGroup}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="inputForm" className={styles.labelForm}>
                            {isSubmitted && errorEmail ?
                                (<>
                                    email <span className={styles.spanError}>- Preencha um email valido!</span>
                                </>) : ('email')
                            }
                        </label>
                        <input type="text" value={valueEmail} onChange={handleEmailChange} className={styles.inputForm} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="inputForm" className={styles.labelForm}>
                            {isSubmitted && errorPw ?
                                (<>
                                    senha <span className={styles.spanError}>- Preencha uma senha valida!</span>
                                </>) : ('senha')
                            }
                        </label>
                        <input type="text" value={valuePw} onChange={handlePwChange} className={styles.inputForm} />
                    </div>
                    <button onClick={handleSubmit} className={styles.handleForm} type="button">Entrar</button>
                </form>
                <p className={styles.textRegister}>Não tem uma conta? <div className={styles.btnRegister} onClick={redirectToCreateAccount}>Registrar-se</div></p>
            </motion.div>
        </div>
    )
}