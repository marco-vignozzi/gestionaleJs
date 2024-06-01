import { useQuery, useQueryClient } from '@tanstack/react-query';

const fetchInquilini = async () =>
    await fetch('http://localhost:3000/api/rows').then((res) => {
        if (!res.ok) {
            throw new Error('Network response NOT okk!');
        }
        return res.json();
    });

export default function useInquilini(options) {
    const queryClient = useQueryClient();
    return { ...useQuery({ querKey: ['inquilini'], queryFn: fetchInquilini }) };
}
