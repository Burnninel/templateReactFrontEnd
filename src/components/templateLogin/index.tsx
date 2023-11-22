import { motion } from "framer-motion";
import { useState } from 'react'

import styles from './styles.module.scss'

export function TemplateLogin() {
    const [valueEmail, setValorEmail] = useState('');
    const [valuePw, setValorPw] = useState('');

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPw, setErrorPw] = useState(false);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleEmailChange = (event: any) => {
        setValorEmail(event.target.value)
        
        if (isSubmitted) {
            setErrorEmail(!event.target.value);
        }
    };

    const handlePwChange = (event: any) => {
        setValorPw(event.target.value)

        if (isSubmitted) {
            setErrorPw(!event.target.value);
        }
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        setErrorEmail(!valueEmail);
        setErrorPw(!valuePw);
    }

    const handleCreateAccount = () => { window.location.href =  'http://localhost:5173/createAccount'}

    return (
        <div className={styles.exampleContainer}>
            <motion.div 
                className={styles.templateLogin} 
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }} 
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
                <p className={styles.textRegister}>Não tem uma conta? <div className={styles.btnRegister} onClick={handleCreateAccount}>Registrar-se</div></p>
            </motion.div>
        </div>
    )
}