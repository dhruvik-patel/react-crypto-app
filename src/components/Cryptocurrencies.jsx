import React,{ useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('')
  console.log(cryptos);
  
  useEffect(() => {
    const filteredCrypto = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredCrypto);
  }, [cryptosList, searchTerm])

  if(isFetching ) return 'Loading...';
  
  return (
    <>
      { !simplified && (
        <div className="search-crypto">
          <Input placeholder='Search' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
      <Row gutter={[32,32]} className='crypto-card-container'>
        { cryptos?.map((coin) => (
            <Col xs={24} sm={12} lg={6} className='crypto-card' key={coin.uuid}>
              <Link to={`/crypto/${coin.uuid}`}>
                <Card
                  title={`${coin.rank}. ${coin.name}`}
                  extra={<img src={coin.iconUrl} className='crypto-image' />}
                  hoverable
                >
                  <p>Price: {millify(coin.price)}</p>
                  <p>Market Cap: {millify(coin.marketCap)}</p>
                  <p>Daily Change: {millify(coin.change)}</p>
                </Card>
              </Link>
            </Col>
        ))

        }
      </Row>
    </>
  )
}

export default Cryptocurrencies