import { motion } from "framer-motion";
import { useEffect, useState, DragEvent } from "react";
import axios from "axios";

import myPhoto from './my photo.jpg';

import styles from './styles.module.scss';
import { IconEdit, IconConfirm, IconSearch, IconMap, IconEditImg } from "../icons/icons";

type User = {
  id: string
  email: string;
  name: string;
  profession: string,
  phone: string,
}

type Address = {
  logradouro: string
  bairro: string;
  localidade: string;
  uf: string,
  phone: string,
}

export function TemplateAccount() {
  const [userData, setUserData] = useState<User | null>(null)

  const [email, setEmail] = useState('')
  const [emailState, setEmailState] = useState(true)

  const [phone, setPhone] = useState('')
  const [phoneState, setPhoneState] = useState(true)

  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address | null>(null)

  const [editImg, setEditImg] = useState(false)

  const config = {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  };

  useEffect(() => {
    axios.get('http://localhost:4000/account', config)
      .then(response => {
        setUserData(response.data)
        setEmail(response.data.email);
        setPhone(response.data.phone)
      })
      .catch(error => {
        console.error(error);
        console.log('fodeu')
      });
  }, [localStorage.getItem('token')]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleEmailState = () => {
    setEmailState(false);
  };

  const handleEmailConfirm = async () => {
    try {
      const response = await axios.post('http://localhost:4000/updateAccount', {
        email: email
      }, config)

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
      } else {
        console.log('Ops! Ocorreu um erro ao atualizar os dados.')
      }

      setPhoneState(true);

    } catch {
      console.error('Erro ao enviar dados para o backend')
    }

    setEmailState(true);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handlePhoneState = () => {
    setPhoneState(false);
  };

  const handlePhoneConfirm = async () => {
    try {
      const config = {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      };

      const response = await axios.post('http://localhost:4000/updateAccount', {
        phone: phone
      }, config)

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
      } else {
        console.log('Ops! Ocorreu um erro ao atualizar os dados.')
      }

      setPhoneState(true);
    } catch {
      console.error('Erro ao enviar dados para o backend')
    }
  };

  const handleEditImg = () => {
    !editImg ? setEditImg(true) : setEditImg(false)
  }

  const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCep(event.target.value);
  };

  const fetchCep = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setAddress(response.data);
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const renderProfile = () => {
    return (
      <>
        <div className={styles.presentation}>
          <h3 className={styles.userName}>{userData ? userData.name : 'Loading...'}</h3>
          <h3 className={styles.userProfession}>{userData ? userData.profession : 'Loading...'}</h3>
        </div>

        <div className={styles.contact}>
          <div className={styles.inputGroupContact}>
            <label className={styles.userEmail}>Email: </label>
            <input className={styles.textInput} type="text" value={email} disabled={emailState} onChange={handleEmailChange} />
            <div className={styles.editInfo}>
              {emailState ? <IconEdit onClick={handleEmailState} /> : <IconConfirm onClick={handleEmailConfirm} />}
            </div>
          </div>

          <div className={styles.inputGroupContact}>
            <label className={styles.userEmail}>Telefone: </label>
            <input className={styles.textInput} type="text" value={phone ? phone : 'Não cadastrado...'} disabled={phoneState} onChange={handlePhoneChange} />
            <div className={styles.editInfo}>
              {phoneState ? <IconEdit onClick={handlePhoneState} /> : <IconConfirm onClick={handlePhoneConfirm} />}
            </div>
          </div>

          <div className={styles.inputGroupContact}>
            <label className={styles.userEmail}>CEP: </label>
            <input className={styles.textInput} type="text" placeholder="Digite seu cep..." maxLength={8} onChange={handleCepChange} />
            <div className={styles.editInfo}>
              <IconSearch onClick={fetchCep} />
            </div>
          </div>

          <div className={styles.address}>
            {address && <IconMap />}
            <span className={styles.textAddress}>
              {address ? address.logradouro + ', ' + address.localidade + '/' + address.uf + '.' : ''}
            </span>
          </div>

        </div>
      </>
    )
  }

  const renderEditImg = () => {
    return (
      <>
        <div className={styles.imgUpdate}>
          <h3 className={styles.titleImgUpdate}>Alterar foto de perfil</h3>
          <div className={styles.selectImg}>Arraste e solte ou selecione uma imagem</div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className={styles.template}>
        <motion.div
          className={styles.templateAccount}
          whileHover={{ scale: 1.04 }}
          initial={{ y: -500, rotateY: 100 }}
          animate={{ y: 0, rotateY: 0, transition: { duration: 0.7 } }}
        >

          <div className={styles.leftProfile}>
            <div className={styles.photoProfile} onClick={handleEditImg}>
              <img src={myPhoto} alt="myphoto" />
              <IconEditImg />
            </div>
          </div>

          <div className={styles.rightProfile}>
            {!editImg ? renderProfile() : renderEditImg()}
          </div>

        </motion.div>
      </div>
    </>
  );
}