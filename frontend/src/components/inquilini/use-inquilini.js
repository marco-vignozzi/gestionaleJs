import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchInquilini = async () =>
    await fetch('http://localhost:3000/api/inquilini').then((res) => {
        if (!res.ok) {
            throw new Error('Network response NOT okk!');
        }
        return res.json();
    });

const updateInquilini = async (data) =>
    await fetch('http://localhost:3000/api/inquilini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response NOT okk!');
            }
            return res.json();
        })
        .catch((err) => console.log('UPDATE INQUILINI ERROR: ', err));

export default function useInquilini(options) {
    const queryClient = useQueryClient();
    // The result object contains a few very important states you'll need to be aware of to be productive. A query can only be in one of the following states at any given moment:
    //  isLoading or status === 'loading' - The query has no data yet
    //  isError or status === 'error' - The query encountered an error
    //  isSuccess or status === 'success' - The query was successful and data is available
    const { data, ...query } = useQuery({
        querKey: ['inquilini'],
        queryFn: fetchInquilini
    });
    const update = useMutation({
        mutationFn: (data) => updateInquilini(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inquilini'] });
            query.refetch();
        }
    });

    return { query, update, data };
}
