import { motion } from "framer-motion";
import { useState } from 'react'

import styles from './styles.module.scss'

export function TemplateCreateAccount() {

    const [valueName, setValueName] = useState('');
    const [errorName, setErrorName] = useState(false);

    const [valueEmail, setValueEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);

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
            setErrorEmail(!event.target.value)
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

    const handleCreateAccount = () => {
        setIsSubmitted(true)
        setErrorName(!valueName);
        setErrorEmail(!valueName);
        setErrorProfession(!valueName);
        setErrorPw(!valueName);
    }

    return (
        <div className={styles.exampleContainer}>
            <motion.div
                className={styles.templateLogin}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
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
                <p className={styles.textRegister}>Já tem um conta?</p>
            </motion.div>
        </div>
    )
}