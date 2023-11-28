import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from './styles.module.scss';

type User = {
  id: string
  email: string;
  name: string;
  profession: string,
}

export function TemplateAccount() {

  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {

    const token = localStorage.getItem('token')

    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    axios.get('http://localhost:4000/account', config)
      .then(response => {
        setUserData(response.data)
      })
      .catch(error => {
        console.error(error);
      });

  }, []);

  return (
    <div className={styles.exampleContainer}>
      <motion.div
        className={styles.templateAccount}
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 1 }}
        initial={{ y: -500, rotateY: 100 }}
        animate={{ y: 0, rotateY: 0, transition: { duration: 0.7 } }}
      >
        <h3 id={styles.titleCreateAccount}>{userData ? userData.id : 'Loading...'}</h3>
        <h3 id={styles.titleCreateAccount}>{userData ? userData.name : 'Loading...'}</h3>
        <h3 id={styles.titleCreateAccount}>{userData ? userData.profession : 'Loading...'}</h3>
        <h3 id={styles.titleCreateAccount}>{userData ? userData.email : 'Loading...'}</h3>
      </motion.div>
    </div>
  );
}