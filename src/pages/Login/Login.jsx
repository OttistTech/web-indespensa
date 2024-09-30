import { useState } from 'react'
import banner from '../../assets/images/banner.png'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom'

export default function Login({onLogin, navigateTo}) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(email === "Davi" && password === "1234") {
      onLogin({ name: email })
      navigate(navigateTo)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>Análises e Insights sobre o app em um só lugar.</h2>
        <p className={styles.description}>Acesse a área restrita para obter informações privilegiadas cuidadosamente selecionadas pela equipe de dados.</p>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <Input 
            type="mail"
            placeholder="E-mail"
            onChange={setEmail}
          />
          <Input 
            type="password"
            placeholder="Senha"
            onChange={setPassword}
          />
          <Button 
            type="submit"
            mode="primary"
            text="Entrar"
            onClick={(e) => handleSubmit(e)}
          />
        </form>
      </div>
      <img 
        className={styles.banner}
        src={banner}
        alt="Banner" 
      />
    </div>
  )
}
