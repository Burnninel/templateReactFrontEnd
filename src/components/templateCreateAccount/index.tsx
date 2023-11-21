import { motion  } from "framer-motion";
import { useState } from 'react'

import styles from './styles.module.scss'

export function TemplateCreateAccount() {

    return (
        <div className={styles.exampleContainer}>
            <motion.div 
                className={styles.templateLogin} 
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }} 
                initial={{ y: -500, rotateY: 100 }}
                animate={{ y: 0, rotateY: 0, transition: { duration: 0.7 } }}
            >
                <h3 id={styles.titleTemplate}>Criar uma conta</h3>
                <form id={styles.formGroup}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="inputForm" className={styles.labelForm}>
                            email
                        </label>
                        <input type="text" className={styles.inputForm} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="inputForm" className={styles.labelForm}>
                            senha
                        </label>
                        <input type="text" className={styles.inputForm} />
                    </div>
                    <button className={styles.handleForm} type="button">Entrar</button>
                </form>
                <p className={styles.textRegister}>Não tem uma conta? <div className={styles.btnRegister} >Registrar-se</div></p>
            </motion.div>
        </div>
    )
}