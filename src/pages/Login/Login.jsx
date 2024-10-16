import { useState } from 'react'
import banner from '../../assets/images/banner.png'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom'

export default function Login({onLogin, navigateTo}) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const getApiUser = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
      })

      if (!response.ok) {
        if (
          response.status === 400 || 
          response.status === 401 ||
          response.status === 404 ||
          response.status === 410
        ) {
          throw new Error("Usuário ou senha incorretos")
        } else {
          throw new Error("Não foi possível autenticar")
        }
      }

      return await response.json()
    } catch (error) {
      setError(error.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const userData = await getApiUser()
    setIsLoading(false)
    if (userData) {
      if(userData.type === "ADMIN") {
        setError(null)
        onLogin({ name: userData.name })
        navigate(navigateTo)
      } else {
        setError("O usuário não tem permissão para acessar esse recurso")
      }
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
          <p className={error ? styles.error : styles.hidden}>{error}</p>
          <Button 
            type="submit"
            mode="primary"
            text="Entrar"
            enabled={!isLoading}
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
