import { motion } from "framer-motion"
import { useState, ChangeEvent } from 'react'
import { api } from '../../services/api'

import styles from './styles.module.scss'

export function TemplateCreateAccount() {

    const [valueName, setValueName] = useState<string>('')
    const [errorName, setErrorName] = useState<boolean>(false)

    const [valueEmail, setValueEmail] = useState<string>('')
    const [errorEmail, setErrorEmail] = useState<boolean>(false)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const [valueProfession, setValueProfession] = useState<string>('')
    const [errorProfession, setErrorProfession] = useState<boolean>(false)

    const [valuePw, setValuePw] = useState<string>('')
    const [errorPw, setErrorPw] = useState<boolean>(false)

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValueName(event.target.value)

        if (isSubmitted) {
            setErrorName(!event.target.value)
        }
    }

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValueEmail(event.target.value)

        if (isSubmitted) {
            setErrorEmail(!event.target.value || !emailRegex.test(valueEmail))
        }
    }

    const handleProfessionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValueProfession(event.target.value)

        if (isSubmitted) {
            setErrorProfession(!event.target.value)
        }
    }

    const handlePwChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValuePw(event.target.value)

        if (isSubmitted) {
            setErrorPw(!event.target.value)
        }
    }

    const validateForm = () => {
        setErrorName(!valueName)
        setErrorEmail(!valueEmail || !emailRegex.test(valueEmail))
        setErrorProfession(!valueProfession)
        setErrorPw(!valuePw)

        return !errorName || !errorEmail || !errorProfession || !errorPw
    }

    const handleCreateAccount = async () => {
        setIsSubmitted(true)

        if (!validateForm()) {
            console.log(validateForm())
            return false
        }

        try {
            const response = await api.post('createAccount', {
                name: valueName,
                profession: valueProfession,
                email: valueEmail,
                pw: valuePw,
            })

            if (response.status === 200) {
                setValueName('')
                setValueEmail('')
                setValueProfession('')
                setValuePw('')
                window.location.href = '/'
            }
        } catch (error) {
            console.error('Erro ao enviar dados para o backend:', error)
        }
    }

    const redirectToLogin = () => { window.location.href = '/' }

    return (
        <div className={styles.exampleContainer}>
            <motion.div
                className={styles.templateLogin}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 1 }}
                initial={{ y: -500, rotateY: 100 }}
                animate={{ y: 0, rotateY: 0, transition: { duration: 0.7 } }}
            >
                <h3 id={styles.titleCreateAccount}>Criar uma conta</h3>
                <form id={styles.formGroup}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="inputForm" className={styles.labelForm}>
                            {isSubmitted && errorName ?
                                (<>
                                    nome <span className={styles.spanError}>- Preencha um nome válido!</span>
                                </>) : ('Nome')
                            }
                        </label>
                        <input type="text" className={styles.inputForm} value={valueName} onChange={handleNameChange} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="inputForm" className={styles.labelForm}>
                            {isSubmitted && errorEmail ?
                                (<>
                                    email <span className={styles.spanError}>- Preencha um email válido!</span>
                                </>) : ('email')
                            }
                        </label>
                        <input type="text" className={styles.inputForm} value={valueEmail} onChange={handleEmailChange} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="inputForm" className={styles.labelForm}>
                            {isSubmitted && errorProfession ?
                                (<>
                                    profissão <span className={styles.spanError}>- Preencha uma profissão válida!</span>
                                </>) : ('profissão')
                            }
                        </label>
                        <input type="text" className={styles.inputForm} value={valueProfession} onChange={handleProfessionChange} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="inputForm" className={styles.labelForm}>
                            {isSubmitted && errorPw ?
                                (<>
                                    senha <span className={styles.spanError}>- Preencha uma senha válida!</span>
                                </>) : ('senha')
                            }
                        </label>
                        <input type="text" className={styles.inputForm} value={valuePw} onChange={handlePwChange} />
                    </div>
                    <button className={styles.handleForm} type="button" onClick={handleCreateAccount}>Entrar</button>
                </form>
                <div className={styles.textAlreadyRegistred} onClick={redirectToLogin}>Já tem um conta?</div>
            </motion.div>
        </div>
    )
}