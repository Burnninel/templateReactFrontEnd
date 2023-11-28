import { motion } from "framer-motion";
import { useState } from 'react'
import axios from "axios";

import styles from './styles.module.scss'

export function TemplateCreateAccount() {

    const [valueName, setValueName] = useState('');
    const [errorName, setErrorName] = useState(false);

    const [valueEmail, setValueEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [valueProfession, setValueProfession] = useState('');
    const [errorProfession, setErrorProfession] = useState(false);

    const [valuePw, setValuePw] = useState('');
    const [errorPw, setErrorPw] = useState(false);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleNameChange = (event: any) => {
        setValueName(event.target.value)

        if (isSubmitted) {
            setErrorName(!event.target.value)
        }
    }

    const handleEmailChange = (event: any) => {
        setValueEmail(event.target.value)

        if (isSubmitted) {
            setErrorEmail(!event.target.value || !emailRegex.test(valueEmail))
        }
    }

    const handleProfessionChange = (event: any) => {
        setValueProfession(event.target.value)

        if (isSubmitted) {
            setErrorProfession(!event.target.value);
        }
    }

    const handlePwChange = (event: any) => {
        setValuePw(event.target.value)

        if (isSubmitted) {
            setErrorPw(!event.target.value)
        }
    }

    const handleCreateAccount = async () => {
        setIsSubmitted(true)
        setErrorName(!valueName)
        setErrorEmail(!valueEmail || !emailRegex.test(valueEmail));
        setErrorProfession(!valueProfession);
        setErrorPw(!valuePw);

        if (!valueName || !emailRegex.test(valueEmail) || !valueProfession || !valuePw ) {
            return false
        }

        try {
            const response = await axios.post('http://localhost:4000/createAccount', {
                name: valueName,
                profession: valueProfession,
                email: valueEmail,
                pw: valuePw,
            });
            
            if (response.status === 200) {
                console.log('Conexão ok!')
            } else {
                console.log('Erro de comunicação com o Banco!')
            }

        } catch (error) {
            console.error('Erro ao enviar dados para o backend:', error)
        }
        
        window.location.href = '/'
    }

    const redirectToLogin = () => { window.location.href = '/'}

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