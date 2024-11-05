import { useEffect, useState } from 'react';
import styles from './AnalyticsBar.module.css';
import ListItem from '../ListItem/ListItem';

const fetchTotalRecommendedProducts = async () => {
    return fetch(`${process.env.REACT_APP_API_ANALYTICS_URL}/api/v1/analytics/total-products`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Não foi possível carregar")
        }
        return response.json()
    })
    .then(data => data.totalProducts)
    .catch(error => error.message)
}

const fetchMostCommomRecommendedCategory = async () => {
    return fetch(`${process.env.REACT_APP_API_ANALYTICS_URL}/api/v1/analytics/most-common-product-category`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Não foi possível carregar")
        }
        return response.json()
    })
    .catch(error => error.message)
}

const fetchAverageCategoriesRecommendationAmount = async () => {
    return fetch(`${process.env.REACT_APP_API_ANALYTICS_URL}/api/v1/analytics/average-amount`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Não foi possível carregar")
        }
        const data = response.json()
        if(typeof data === "object") {
            if(data.length > 5) {
                return data.slice(0, 5)
            }
        }
        return data
    })
    .catch(error => error.message)
}

const fetchTopFiveRecommendedBrands = async () => {
    return fetch(`${process.env.REACT_APP_API_ANALYTICS_URL}/api/v1/analytics/top5`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Não foi possível carregar")
        }
        return response.json()
    })
    .catch(error => error.message)
}

export default function AnalyticsBar() {
    const [state, setState] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    totalRecommendedProducts, 
                    mostCommonCategory, 
                    averageCategoriesAmount, 
                    topFiveRecommendedBrands,
                ] = await Promise.all([
                    fetchTotalRecommendedProducts()
                        .catch(() => null),
                    fetchMostCommomRecommendedCategory()
                        .catch(() => null),
                    fetchAverageCategoriesRecommendationAmount()
                        .catch(() => null),
                    fetchTopFiveRecommendedBrands()
                        .catch(() => null),
                ])

                if (!totalRecommendedProducts || !mostCommonCategory || !averageCategoriesAmount || !topFiveRecommendedBrands) {
                    setError(true);
                    setIsLoading(false);
                    return;
                }

                setState({
                    totalRecommendedProducts,
                    mostCommonCategory,
                    averageCategoriesAmount,
                    topFiveRecommendedBrands,
                })

                setIsLoading(false);

                
            } catch (error) {
                console.error("Erro ao carregar os dados de análise:", error);
            }
        };

        fetchData();
    }, [])

    if (isLoading) {
        return <p className={styles.loading}>Carregando dados...</p>;
    }
    if (error) {
        return 
    }

    return (
        <>
            <h3 className={styles.title}>Análise das Recomendações de Produtos</h3>
            <section className={styles.container}>
                <article className={styles.item}>
                    <h4 className={styles.subtitle}>Total de produtos recomendados</h4>
                    <p className={styles.bignumber}>{state.totalRecommendedProducts} produtos</p>
                </article>
                <article className={styles.item}>
                    <h4 className={styles.subtitle}>Categoria mais frequente</h4>
                    <p className={styles.bignumber}>
                        {state.mostCommonCategory.categoryName}
                        <span className={styles.bignumber_highlight}>{state.mostCommonCategory.count}x</span>
                    </p>
                </article>
                <article className={styles.item}>
                    <h4 className={styles.subtitle}>Conteúdo médio dos produtos por categoria - kg/g/l/ml</h4>
                    <ul className={styles.list}>
                        {state.averageCategoriesAmount.map(data => 
                            <ListItem label={data.categoryName} data={data.averageAmount}/>
                        )}
                    </ul>
                </article>
                <article className={styles.item}>
                    <h4 className={styles.subtitle}>5 marcas mais recomendadas</h4>
                    <ol className={styles.list}>
                        {state.topFiveRecommendedBrands.map(data => 
                            <ListItem label={data.brandName} data={data.count}/>
                        )}
                    </ol>
                </article>
            </section>
        </>
    )
};