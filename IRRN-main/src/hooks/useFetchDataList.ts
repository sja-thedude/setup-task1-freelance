/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-empty */
import { ResponseList } from '@src/network/dataModels';
import { useCallback, useEffect, useState } from 'react';

const useFetchDataList = <T>(
    functionHook: (page: number) => Promise<ResponseList<T>>,
) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [hasNext, setHasNext] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);

    const func = useCallback(async () => {
        try {
            setPage(1);
            const response = await functionHook(1);
            setHasNext(response?.current_page < response?.last_page);
            setTotal(response?.total || 0);
            setData(response?.data || []);
        } catch (error) {
            return Promise.reject(error);
        }
    }, [functionHook]);

    const fetchDefault = useCallback(
        async (refresh?: boolean) => {
            refresh ? setRefreshing(true) : setLoading(true);
            try {
                await func();
            } catch (error) {
            } finally {
                refresh ? setRefreshing(false) : setLoading(false);
            }
        },
        [func],
    );

    useEffect(() => {
        fetchDefault();
    }, [fetchDefault]);

    const onRefresh = useCallback(() => {
        fetchDefault(true);
    }, [fetchDefault]);

    const onEndReached = useCallback(async () => {
        try {
            if (hasNext) {
                setPage(page + 1);
                const response = await functionHook(page + 1);
                setHasNext(response?.current_page < response?.last_page);
                setData(state => [...state, ...(response?.data || [])]);
            }
        } catch (error) {}
    }, [functionHook, hasNext, page]);

    return {
        data,
        loading,
        setLoading,
        refreshing,
        total,
        onRefresh,
        onEndReached,
        onFetchNoLoading: func,
        hasNext,
        page,
        fetchDefault,
        setData,
    };
};

export default useFetchDataList;
