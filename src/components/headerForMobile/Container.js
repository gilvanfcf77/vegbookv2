import { useEffect, useState } from 'react';
import { setGlobal } from 'reactn';

export default () => {

    const [category, setCategory] = useState('Todas');
    
    const [categories] = useState([
        'Todas',
        'Vegetariana',
        'Inclui ovos',
        'Inclui leite',
        'Inclui ovos e leite'
    ])

    useEffect(() => {
        setGlobal({
            'category': 'Todas'
        });
    }, []);

    return {
        category,
        setCategory,
        categories
    };
} 