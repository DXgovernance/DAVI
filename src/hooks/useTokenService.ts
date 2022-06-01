import { useState, useEffect } from 'react';
import { useContext } from '../contexts';

interface UseABIServiceReturns {
  tokenData: any;
  tokenAth: number;
  athDate: string;
}

export const useTokenService = (token: String): UseABIServiceReturns => {
  const [tokenData, setTokenData] = useState();
  const [tokenAth, setAth] = useState();
  const [athDate, setAthDate] = useState();
  const {
    context: { coingeckoService },
  } = useContext();

  const getData = async () => {
    const data = await coingeckoService.getCoinData(token);
    setTokenData(data);
    setAth(data['market_data'].ath.usd);
    setAthDate(data['market_data']['ath_date'].usd);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    tokenData,
    tokenAth,
    athDate,
  };
};
