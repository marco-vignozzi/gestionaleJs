import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = 'http://localhost:3000/api';

const fetchReq = async () =>
    await fetch(`${API_URL}/pagamenti`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response NOT okk!');
            }
            return res.json();
        })
        .catch((err) => console.log('FETCH PAGAMENTI ERROR: ', err));

const deleteReq = async (id) =>
    await fetch(`${API_URL}/pagamenti/${id}`, {
        method: 'DELETE'
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response NOT okk!');
            }
            return res.json();
        })
        .catch((err) => console.log('DELETE PAGAMENTI ERROR: ', err));

const updateReq = async (data) =>
    await fetch(`${API_URL}/pagamenti`, {
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
        .catch((err) => console.log('UPDATE PAGAMENTI ERROR: ', err));

export default function usePagamenti(options) {
    const queryClient = useQueryClient();
    // The result object contains a few very important states you'll need to be aware of to be productive. A query can only be in one of the following states at any given moment:
    //  isLoading or status === 'loading' - The query has no data yet
    //  isError or status === 'error' - The query encountered an error
    //  isSuccess or status === 'success' - The query was successful and data is available
    const { data, ...query } = useQuery({
        queryKey: ['pagamenti'],
        queryFn: fetchReq,
        onError: (model) => {
            console.log(model);
            model.data = {};
        }
    });
    const updatePagamenti = useMutation({
        mutationFn: (data) => updateReq(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pagamenti'] });
            query.refetch();
        }
    });
    const deletePagamento = useMutation({
        mutationFn: (pagamentoId) => deleteReq(pagamentoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pagamenti'] });
            query.refetch();
        }
    });

    return { query, updatePagamenti, deletePagamento, data };
}
