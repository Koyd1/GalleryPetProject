import React, {useEffect, useState} from 'react';
import './index.scss';
import {Collection} from './Collection'

const cats =[
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
]

function App() {
    const [collections, setCollections] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [categoryID, setCategoryID] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setIsLoading(true)
        const category = categoryID ? `category=${categoryID}` : '';

        fetch(`https://64900f3e1e6aa71680ca7489.mockapi.io/photo_collections?page=${page}&limit=3&${category}`)
            .then((res) => res.json())
            .then((json)=> {
                setCollections(json);
            })
            .catch(err=> {
                console.warn(err);
                alert('Ошибка при получении данных')
            }).finally(()=> {
                setIsLoading(false)
        })
    }, [categoryID, page]);


  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
            {
                cats.map((obj, index)=> <li onClick={()=> setCategoryID(index)} className={categoryID === index ? 'active' : ''} key={obj.name}>{obj.name}</li>)
            }
        </ul>
        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
          {isLoading ? <h2>Идёт загрузка... </h2> : collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
              .map((obj)=> (
                  <Collection
                      key={obj.index}
                      name={obj.name}
                      images={obj.photos}
                  />))}
      </div>
      <ul className="pagination">
          {

              [...Array(5)].map(( _ , i) => <li onClick={()=> setPage(i+1)} className={page === (i+1) ? 'active' : ''}>{i+1}</li>)
          }
      </ul>
    </div>
  );
}

export default App;
